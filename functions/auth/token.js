import { SignJWT } from 'jose/jwt/sign';
import { jwtVerify } from 'jose/jwt/verify'
import fs from 'fs';
import crypto from 'crypto';
import util from 'util';
import Database from '../database/index.js';

const privateKey = crypto.createPrivateKey(fs.readFileSync('jwtRS256.key'));
const publicKey = crypto.createPublicKey(fs.readFileSync('jwtRS256.key.pub'));
const randomBytes = util.promisify(crypto.randomBytes);

const issuer = 'socialkorp.com';
const audience = 'admin.futurehealthspaces.com';

const refreshTokenExpirationTimeInDays = 30;
const accessTokenExpirationTimeInMinutes = 30;

class RefreshToken{
  static async #hash(token){
    return crypto.createHash('sha256').update(token,'base64').digest('hex');
  }
  static async generate(subject,previousTokenHash=null){ // returns accessToken
    const collection = new Database('auth').collection('refreshTokens');

    const refreshToken = (await randomBytes(32)).toString('base64');
    const refreshTokenHash = await this.#hash(refreshToken);

    await collection.set(subject,{
      hash: refreshTokenHash,
      exp: Date.now() + refreshTokenExpirationTimeInDays*24*3600*1000,
      prev: previousTokenHash,
    });

    return refreshToken;
  }
  static async refresh(subject,refreshToken){ // returns boolean(true)
    if(!subject || !refreshToken)
      throw new Error('Invalid refresh token');
    const collection = new Database('auth').collection('refreshTokens');

    const refreshTokenHash = await RefreshToken.#hash(refreshToken);

    const data = await collection.get(subject);

    if(!data)
      throw new Error('Invalid refresh token');

    const matches = refreshTokenHash === data.hash;
    const expired = Date.now() > data.exp;
    const matchesPrevious = refreshTokenHash === data.prev;

    if(!matches || expired){
      if(expired || matchesPrevious)
        await this.revoke(subject);
      throw new Error('Invalid refresh token');
    }

    return this.generate(subject,refreshTokenHash);
  }
  static async revoke(subject){
    const collection = new Database('auth').collection('refreshTokens');

    await collection.delete(subject);
  }
}

export default class Token{

  static async #generateAccessToken(subject,payload){
    if(!subject)
      throw new Error('Missing subject');

    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setIssuer(issuer)
      .setAudience(audience)
      .setSubject(subject)
      .setExpirationTime( Math.floor(Date.now()/1000) + accessTokenExpirationTimeInMinutes*60 )
      .sign(privateKey);
  }

  static async generate(subject,payload={}){ // returns {accessToken,refreshToken}
    const refreshToken = await RefreshToken.generate(subject);
    const accessToken = await this.#generateAccessToken(subject,payload);

    return {accessToken,refreshToken};
  }
  static async refresh(subject,currentRefreshToken,payload={}){ // returns {accessToken,refreshToken}
    const refreshToken = await RefreshToken.refresh(subject,currentRefreshToken);
    const accessToken = await this.#generateAccessToken(subject,payload);

    return {accessToken,refreshToken};
  }
  static async revoke(subject){
    await RefreshToken.revoke(subject);
  }
  static async verify(accessToken){ // returns payload
    const { payload } = await jwtVerify(
      accessToken,
      publicKey,{
        issuer,
        audience,
      }
    );

    if(!payload.sub)
      throw new Error('Missing subject');

    return payload;
  }
  
}
