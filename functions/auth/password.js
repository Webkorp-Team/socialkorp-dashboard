import bcrypt from 'bcrypt';
import Database from '../database/index.js';

const cost = 11;

export default class Password{
  static async save(subject,password){
    const passwordHash = await bcrypt.hash(password,cost);
    const collection = new Database('auth').collection('passwords');

    collection.set(subject,passwordHash);
  }
  static async verify(subject,password){
    const collection = new Database('auth').collection('passwords');

    const passwordHash = await collection.get(subject);

    if(!passwordHash){
      // prevent timing attack on username
      await bcrypt.compare(password,'$2b$11$wkpSmTeqfxxS0eIAAN4iKekR6dvQIWDE1TyX4KADUutofMtmvF3EW');
      return false;
    }

    return await bcrypt.compare(password,passwordHash);
  }
  static async delete(subject){
    
  }
}

