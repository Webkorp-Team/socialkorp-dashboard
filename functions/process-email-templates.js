import fs from 'fs';
import path from 'path';
import config from './website.config.js';

if(!config.emails || config.emails.templatesProcessed)
  process.exit(0);

fs.rmSync('email/templates', { recursive: true, force: true });
fs.mkdirSync('email/templates',{recursive:true});

for(const template of (config.emails?.templates||[])){
  const src = path.resolve('../../',template.templateFile);
  const dst = path.resolve('email/templates/',path.basename(template.templateFile));

  fs.copyFileSync(src,dst);

  template.templateFile = path.relative(process.cwd(),dst);
}

config.emails.templatesProcessed = true;

fs.writeFileSync('website.config.json',JSON.stringify(
  config
));
