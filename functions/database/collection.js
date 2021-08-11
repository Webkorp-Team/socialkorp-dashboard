import admin from 'firebase-admin';

const firestore = admin.firestore();

function makeKey(key1, key2) {
  return `${key1.replace(/[\/#]/g, '-')}#${key2.replace(/[\/#]/g, '-')}`;
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

    const data = doc.data();

    return data._value !== undefined ? data._value : data;
  }

  async set(key, value) {
    const obj = (typeof value === 'object' && !Array.isArray(value)) ? value : { _value: value };
    return await firestore.collection(
      makeKey(this.databaseName, this.collectionName)
    ).doc(key).set(obj);
  }

  async delete(key) {
    return await firestore.collection(
      makeKey(this.databaseName, this.collectionName)
    ).doc(key).delete();
  }

  async getAll() {
    var snapshot = await firestore.collection(
      makeKey(this.databaseName, this.collectionName)
    ).get()
    var allData = [];
    snapshot.forEach(doc => {
      allData.push(doc.data());
    });
    return allData;
  }
}
