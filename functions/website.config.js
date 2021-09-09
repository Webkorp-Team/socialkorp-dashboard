import fs from 'fs';

const config = JSON.parse(
  fs.readFileSync('website.config.json')
);

export default config;
