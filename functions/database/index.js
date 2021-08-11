import Collection from "./collection.js";

export default class Database{
  databaseName;

  constructor(databaseName){
    this.databaseName = databaseName;
  }

  collection(collectionName){
    return new Collection(this.databaseName,collectionName);
  }
}
