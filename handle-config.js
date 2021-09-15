const fs = require('fs');
const cp = require('child_process');

if(fs.existsSync('../website.config.yaml'))
  cp.fork('handle-config.js',{cwd:'..'});

fs.copyFileSync('website.config.json','src/api/website.config.json');
fs.copyFileSync('website.config.json','functions/website.config.json');
