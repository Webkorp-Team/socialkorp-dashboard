import List from "../list/index.js";

const list = new List('settings',true);

export default class Settings{

  static async get(key,authenticatedUser=null){
    const value = (await list.getIndex()).filter(
      ({key:k}) => k === key
    ).filter(
      setting => authenticatedUser || setting.public == 1
    )[0];
    return (
      value === undefined
      ? null
      : value
    );
  }

  static async getAll(flatten=false,authenticatedUser=null){
    const map = {};
    
    (await list.getIndex()).filter(setting => (
      authenticatedUser || setting.public == 1
    )).forEach(({key,value}) => {
      if(flatten)
        map[key] = value;
      else
        key.split('.').reduce( (obj,key,idx,arr) => {
          return (
            obj[key] = arr[idx+1] ? obj[key] || {} : value
          );
        },map);
    });

    return map;
  }
}
