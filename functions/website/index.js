import Database from "../database/index.js";
import Storage from '../storage/index.js';
import clone from 'just-clone';
import crc32 from 'fast-crc32c';

const pages = new Database('website').collection('pages');

export default class Website{
  static async setPage(pageName,pageData){
    const page = clone(pageData);

    for(const sectionName in page){
      for(const elementName in page[sectionName]){
        const data = page[sectionName][elementName];

        console.log(data.slice(0,10),data.match(/^data:[^;]*;base64,/));

        if(!data.match(/^data:[^;]*;base64,/))
          continue;

        const filename = `${pageName}/${sectionName}/${elementName}-${crc32.calculate(data)}`;
        page[sectionName][elementName] = await Storage.writeDataUrl(filename,data);
      }
    }

    await pages.set(pageName,page);
  }
  static async getPage(pageName){ // returns pageData
    return await pages.get(pageName) || {};
  }
}
