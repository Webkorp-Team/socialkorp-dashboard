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

const refreshTokenExpirationTimeInDays = 7;
const accessTokenExpirationTimeInMinutes = 15;

class RefreshToken{
  static async #hash(token){
    return crypto.createHash('sha256').update(token,'base64').digest('hex');
  }
  static async generate(subject){ // returns accessToken
    const collection = new Database('auth').collection('refreshTokens');

    const refreshToken = (await randomBytes(32)).toString('base64');
    const refreshTokenHash = await this.#hash(refreshToken);

    await collection.set(refreshTokenHash,{
      sub: subject,
      exp: Date.now() + refreshTokenExpirationTimeInDays*24*3600*1000,
    });

    return refreshToken;
  }
  static async validate(expectedSubject,refreshToken){ // returns boolean(true)
    if(!expectedSubject || !refreshToken)
      throw new Error('Invalid refresh token');
    const collection = new Database('auth').collection('refreshTokens');

    const refreshTokenHash = await RefreshToken.#hash(refreshToken);

    const data = await collection.get(refreshTokenHash);

    if(!data)
      throw new Error('Invalid refresh token');

    const {
      sub: subject,
      exp: expirationTime
    } = data;

    if(expectedSubject !== subject)
      throw new Error('Invalid refresh token');

    if(Date.now() > expirationTime){
      await this.revoke(refreshToken);
      throw new Error('Invalid refresh token');
    }

    return true;
  }
  static async revoke(refreshToken){
    const collection = new Database('auth').collection('refreshTokens');

    const refreshTokenHash = await RefreshToken.#hash(refreshToken);

    await collection.delete(refreshTokenHash);
  }
}

export default class Token{

  static async generate(subject,payload={}){ // returns {accessToken,refreshToken}
    const accessToken = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setIssuer(issuer)
      .setAudience(audience)
      .setSubject(subject)
      .setExpirationTime( Math.floor(Date.now()/1000) + accessTokenExpirationTimeInMinutes*60 )
      .sign(privateKey);

    const refreshToken = await RefreshToken.generate(subject);

    return {accessToken,refreshToken};
  }
  static async refresh(subject,refreshToken,payload={}){ // returns {accessToken,refreshToken}
    await RefreshToken.validate(subject,refreshToken);
    
    await RefreshToken.revoke(refreshToken);

    return await this.generate(subject,payload);
  }
  static async revoke(refreshToken){
    await RefreshToken.revoke(refreshToken);
  }
  static async verify(accessToken){ // returns payload
    const { payload } = await jwtVerify(
      accessToken,
      publicKey,
      {
        issuer,
        audience,
      }
    );

    return payload;
  }
  
}
