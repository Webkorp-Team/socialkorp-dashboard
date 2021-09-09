import { NotFoundError } from '../errors.js';
import config from '../website.config.js';
import Sendinblue from './providers/Sendinblue.js';
import fs from 'fs';
import Settings from '../settings/index.js';
import escape from 'escape-html';

const providerClasses = {
  sendinblue: Sendinblue
};
const emailProvider = new providerClasses[config.emails.provider]();

const templateFiles = {};
function getTemplateFile(filename){
  return templateFiles[filename] || (
    templateFiles[filename] = fs.readFileSync(filename).toString()
  );
}

function fillTemplate(template,params){
  return (
    template.match(/(?<=\$)([A-z]\w+)\b/g)
    ?.reduce((sum,cur) => (
      sum.replace(
        new RegExp(`\\\$${cur}\\b`),
        escape(params[cur])
      )
    ),template)
  ) || template;
}

function evaluateDirective(directive,params,settings){
  return (
    !directive
    ? null
    : directive.param
    ? params[directive.param]
    : directive.setting
    ? settings[directive.setting]
    : directive.literal
    ? directive.literal
    : null
  );
}

export default class Email{

  static async send(templateName,params){
    const template = config.emails.templates.filter(
      ({name}) => name === templateName
    )[0];

    if(!template)
      throw new NotFoundError('No such template');
    
    const templateContent = getTemplateFile(template.templateFile);

    const settings = await Settings.getAll(true,true);
    
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
