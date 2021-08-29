import admin from 'firebase-admin';

const firestore = admin.firestore();

function makeKey(key1, key2) {
  return `${key1.replace(/[\/#]/g, '-')}#${key2.replace(/[\/#]/g, '-')}`;
}

function getValue(data){
  const value = data._value !== undefined ? data._value : data;
  delete value._timestamp;
  return value;
}
async function getSnapshot(databaseName,collectionName,limit){
  return await firestore.collection(
    makeKey(databaseName, collectionName)
  ).orderBy('_timestamp','desc').limit(limit).get();
}

export default class Collection{
  databaseName;
  collectionName;

  constructor(databaseName,collectionName){
    this.databaseName = databaseName;
    this.collectionName = collectionName;
  }

  async get(key) {
    if(!key)
      return null;

    const doc = await firestore.collection(
      makeKey(this.databaseName, this.collectionName)
    ).doc(key).get();

    if (!doc.exists)
      return null;

    return getValue(doc.data());
  }

  async set(key, value) {
    const obj = {
      _value: value,
      _timestamp: Date.now()
    };

    return await firestore.collection(
      makeKey(this.databaseName, this.collectionName)
    ).doc(key).set(obj);
  }

  async delete(key) {
    return await firestore.collection(
      makeKey(this.databaseName, this.collectionName)
    ).doc(key).delete();
  }

  async getAll(limit=30) {
    const snapshot = await getSnapshot(this.databaseName,this.collectionName,limit);
    const list = [];
    snapshot.forEach(doc => {
      list.push({
        _id: doc.id,
        ...getValue(doc.data())
      });
    });
    return list;
  }

  async getKeys(limit=30) {
    const snapshot = await getSnapshot(this.databaseName,this.collectionName,limit);
    const keys = [];
    snapshot.forEach(doc => {
      keys.push(doc.id);
    });
    return keys;
  }

  async getMap(limit=30) {
    const snapshot = await getSnapshot(this.databaseName,this.collectionName,limit);
    const map = {};
    snapshot.forEach(doc => {
      map[doc.id] = getValue(doc.data());
    });
    return map;
  }
}
