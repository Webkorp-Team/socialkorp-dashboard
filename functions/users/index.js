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

    await Auth.Password.save(email,password);
  }

  static async listAll(){
    const map = await users.getMap();

    const list = [];

    for(const email of Object.keys(map))
      list.push({
        email,
        userData: map[email],
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

    const {accessToken,refreshToken} = await Auth.Token.generate(email);

    return {
      accessToken,
      refreshToken,
      userData
    };
  }
  static async logout(refreshToken){
    await Auth.Token.revoke(refreshToken);
  }
  static async refreshLogin(email,currentRefreshToken){
    if(!await users.get(email))
      throw new Error('Invalid refresh token');

    const {accessToken,refreshToken} = await Auth.Token.refresh(email,currentRefreshToken);

    return {accessToken,refreshToken};
  }
}
