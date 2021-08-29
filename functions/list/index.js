import Database from "../database/index.js";
import { NotFoundError, UnauthorizedError } from "../errors.js";
import fs from 'fs';
import crypto from 'crypto';
import crc32 from 'fast-crc32c';
import Storage from "../storage/index.js";

function sha256(data){
  return crypto.createHash('sha256').update(data).digest('hex');
}

const config = JSON.parse(
  fs.readFileSync('website.config.json')
);

export async function generateId(collection){
  var id;

  do{
    id = String(
      sha256(
        String(Date.now()) + String(Math.random())
      )
    ).substr(0,16);
  }while(collection && await collection.get(id));
  
  return id;
}



export default class List{
  #index;
  #data;
  #archive;
  #accessControl;
  #indexedFields;
  #listName;

  constructor(listName,authenticatedUser=null){
    this.#index = new Database('lists-index').collection(listName);
    this.#data = new Database('lists-data').collection(listName);
    this.#archive = new Database('lists-archive').collection(listName);
    this.#listName = listName;

    const schema = (
      config.lists.filter(list => list.name === listName)[0]
    );

    if(!schema)
      throw new NotFoundError('Unknown list');

    this.#indexedFields = schema.index || null;

    const ops = schema.publicAccess;
    this.#accessControl = {
      read: authenticatedUser ? true : ops.read || false,
      write: authenticatedUser ? true : ops.write || false,
      create: authenticatedUser ? true : ops.create || ops.write || false,
      update: authenticatedUser ? true : ops.update || ops.write || false,
      delete: authenticatedUser ? true : ops.delete || ops.write || false,
    };
  }

  async get(itemId){
    if(!this.#accessControl.read)
      throw new UnauthorizedError();

    const index = await this.#index.get(itemId);
    const data = await this.#data.get(itemId);
    
    if(index && data)
      return {...index,...data};
    else if(index)
      return index;

    const archive = await this.#archive.get(itemId);

    if(archive && data)
      return {...archive,...data};
    if(archive)
      return archive;

    if(data)
      throw new Error('Found a data entry without a matching index');

    throw new NotFoundError();
  }
  async getIndex(){
    if(!this.#accessControl.read)
      throw new UnauthorizedError();

    return await this.#index.getAll();
  }
  async getArchived(){
    if(!this.#accessControl.read)
      throw new UnauthorizedError();

    return await this.#archive.getAll();
  }

  async set(itemId,data){
    const ac = this.#accessControl;
    if(!ac.create && !ac.update)
      throw new UnauthorizedError(); 
    if(!ac.create || !ac.update){
      const exists = Boolean(await this.#index.get(itemId));
      if(exists && !ac.update)
        throw new UnauthorizedError();
      if(!exists && !ac.create)
        throw new UnauthorizedError();
    }

    const archiveEntry = await this.#archive.get(itemId);
    if(archiveEntry)
      await this.#archive.delete(itemId);

    if(!this.#indexedFields){
      await this.#index.set(itemId,data);
      await this.#data.delete(itemId);
      return;
    }

    const indexEntry = {};
    const dataEntry = {};
    for(const key in data){
      const value = data[key].match(/^data:[^;]*;base64,/) ? (
        await Storage.writeDataUrl(
          `${this.#listName}-list/${itemId}/${key}-${crc32.calculate(data[key])}`,
          data[key]
        )
      ) : data[key];

      if(this.#indexedFields.includes(key))
        indexEntry[key] = value;
      else
        dataEntry[key] = value;
    }

    await this.#index.set(itemId,indexEntry);
    await this.#data.set(itemId,dataEntry);
  }

  async insert(data){ // returns itemId
    if(!this.#accessControl.create)
      throw new UnauthorizedError();
    const itemId = await generateId(this.#index);
    await this.set(itemId,data);
    return itemId;
  }

  async delete(itemId){
    if(!this.#accessControl.delete)
      throw new UnauthorizedError();
    const indexEntry = await this.#index.get(itemId);
    if(!indexEntry)
      throw new NotFoundError();
    await this.#archive.set(itemId,indexEntry);
    await this.#index.delete(itemId);
  }

}

// const list = new List('people',false);

// // list.insert({name:'asd',email:'dsa'})
// list.getIndex()
// // list.get('aa332827e4d7bf127943b91d6ea1513b3a5993e659b550a296b0c8dd6797d247')
// // list.delete('aa332827e4d7bf127943b91d6ea1513b3a5993e659b550a296b0c8dd6797d247')

// // .then(()=>console.log('ok'))
// .then(v => console.log(v))
