import Database from "../database/index.js";

const pages = new Database('website').collection('pages');

export default class Website{
  static async setPage(pageName,pageData){
    await pages.set(pageName,pageData);
  }
  static async getPage(pageName){ // returns pageData
    const pageData = await pages.get(pageName);
    if(!pageData)
      throw new Error(`Page does not exist`);
    return pageData;
  }
}
