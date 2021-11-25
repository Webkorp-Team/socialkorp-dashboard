import { NotFoundError } from '../errors.js';
import config from '../website.config.js';
import Sendinblue from './providers/Sendinblue.js';
import fs from 'fs';
import path from 'path';
import Settings from '../settings/index.js';
import escape from 'escape-html';

const providerClasses = {
  sendinblue: Sendinblue
};
const emailProvider = config.emails?.provider ? new providerClasses[config.emails.provider]() : null;

const templateFiles = {};
function getTemplateFile(filename){
  return templateFiles[filename] || (
    templateFiles[filename] = fs.readFileSync(
      path.resolve(process.cwd(),filename)
    ).toString()
  );
}

function fillTemplate(template,params){
  return (
    template.match(/(?<=\$)([A-z]\w+)\b/g)
    ?.reduce((sum,cur) => (
      sum.replace(
        new RegExp(`\\\$${cur}\\b`),
        escape(params[cur]).replace(/\r?\n/g,'<br>')
      )
    ),template)
  ) || template;
}

function evaluateDirective(directive,params,settings){
  return (
    !directive
    ? null
    : directive.literal
    ? directive.literal
    : directive.param
    ? params[directive.param]
    : directive.setting
    ? settings[directive.setting]
    : directive.eval
    ? evaluateSingleParam(params,null,directive.eval)
    : null
  );
}

function evaluateSingleParam(inputParams,name,expression){
  const param = (
    function(){
      try{
        return eval(expression);
      }catch(e){
        logger.error(e);
        return name ? this[name] : null;
      }
    }
  ).bind(inputParams)();
  return param === undefined ? null : param;
}

function evaluateParams(inputParams,evalProps){
  const params = Object.assign({},inputParams);
  for(const evalProp of (evalProps||[])){
    params[evalProp.name] = evaluateSingleParam(
      inputParams,
      evalProp.name,
      evalProp.expression
    );
  }
  return params;
}

export default class Email{

  static async send(templateName,inputParams){
    const template = config.emails.templates.filter(
      ({name}) => name === templateName
    )[0];

    if(!template)
      throw new NotFoundError('No such template');

    const templateContent = getTemplateFile(template.templateFile);

    const settings = await Settings.getAll(true,true);

    const params = evaluateParams(inputParams,template.evals);

    await emailProvider.send({
      htmlContent:     fillTemplate(templateContent,params),
      subject:         evaluateDirective(template.subject,          params,settings),
      toAddress:       evaluateDirective(template.to.address,       params,settings),
      toDisplayName:   evaluateDirective(template.to.displayName,   params,settings),
      fromAddress:     evaluateDirective(template.from.address,     params,settings),
      fromDisplayName: evaluateDirective(template.from.displayName, params,settings),
    });
  }

  static async subscribe(email){
    await emailProvider.subscribe(email);
  }

}
