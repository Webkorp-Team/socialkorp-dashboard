import Database from "../database/index.js";

const config = new Database('config').collection('config');

export default class Config{
  static async set(key,value){
    await config.set(key,value);
  }
  static async get(key){
    return await pages.get(key);
  }
}
