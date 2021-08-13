import Auth from "../auth/index.js";
import Database from "../database/index.js";

const users = new Database('users').collection('users');

export default class Users{

  static async create(email,password,userData){
    if(await users.get(email))
      throw new Error('User already exists');

    await users.set(email,userData);

    await Auth.Password.save(email,password);
  }

  static async delete(email){
    if(!await users.get(email))
      throw new Error('User does not exist');

    await users.delete(email);

    await Auth.Password.delete(email);
  }

  static async update(email,password,userData){
    if(!await users.get(email))
      throw new Error('User does not exist');

    await users.set(email,userData);
    
    if(password)
      await Auth.Password.save(email,password);
  }

  static async get(email){ // returns userData
    const userData = await users.get(email);
    if(!userData)
      throw new Error('User does not exist');
    return userData;
  }

  static async listAll(){
    const map = await users.getMap();

    const list = [];

    for(const email of Object.keys(map))
      list.push({
        email,
        userData: map[email],
        level: 'Admin',
      });

    return list;
  }

  static async login(email,password){
    if(!email || !password)
      throw new Error('Incorrect email and/or password');

    if(!await Auth.Password.verify(email,password))
      throw new Error('Incorrect email and/or password');

    const userData = await users.get(email);

    if(!userData){
      // database inconsistency
      await Auth.Password.delete(email);
      throw new Error('Incorrect email and/or password');
    }

    const {accessToken,refreshToken} = await Auth.Token.generate(email,{
      elv: true
    });

    return {
      accessToken,
      refreshToken,
      userData
    };
  }
  static async logout(email){
    await Auth.Token.revoke(email);
  }
  static async refreshLogin(email,currentRefreshToken){
    const userData = await users.get(email);

    if(!userData)
      throw new Error('Invalid refresh token');

    const {accessToken,refreshToken} = await Auth.Token.refresh(email,currentRefreshToken,{
      elv: false
    });

    return {accessToken,refreshToken,userData};
  }
}
