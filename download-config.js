const fetch = require('node-fetch');
const fs = require('fs');
const adminConfig = require('./admin.config.json');

fetch(adminConfig.websiteConfig)
.then(response => response.json())
.then(config => fs.writeFileSync(
  './src/api/website.config.json',
  JSON.stringify(config)
)).catch(e => {
  console.error(e);
  process.exit(1);
});
