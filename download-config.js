const fetch = require('node-fetch');
const fs = require('fs');
const adminConfig = require('./admin.config.json');

const configFile = (
  process.env.NODE_ENV === 'development'
  ? adminConfig.development?.websiteConfig
  : null
) || adminConfig.websiteConfig;

console.log(`Downloading config file from ${configFile}`);

fetch(configFile)
.then(response => response.json())
.then(config => fs.writeFileSync(
  './src/api/website.config.json',
  JSON.stringify(config)
)).catch(e => {
  console.error(e);
  process.exit(1);
});
