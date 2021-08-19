import './init-firebase-app.js';
import express from 'express';
import bearerToken from 'express-bearer-token';
import functions from 'firebase-functions';
import cookieParser from 'cookie-parser';

import Auth from './auth/index.js';
import Users from './users/index.js';
import Website from './website/index.js';

/* -------------- Errors ----------------- */

class MissingParameterError extends Error{
  constructor(parameter){
    super(`Missing parameter "${parameter}"`);
  }
}

/* ------------ Endpoint categories ---------- */

// Website endpoints
const website = { 

  // Public data fetching endpoints
  public: express.Router(),
};

// Admin dashboard endpoints
const admin = { 

  // Public endpoints used in build time
  config: express.Router(),

  // Auth flow
  // Requires either refresh token or email+password
  // Returns 401 on all errors
  authFlow: express.Router(), 

  // Requires a valid access token
  private: express.Router(),

  // Requires an elevated access token
  elevated: express.Router(),
};

/* ----------- Middleware settings ------------ */

const app = express();

const v1 = express.Router();

app.use('/api/v1',v1);

v1.use(
  website.public,
  admin.authFlow,
  admin.private,
  admin.elevated,
  admin.config,
);

admin.authFlow.use(cookieParser());
  
admin.private.use(bearerToken({
  headerKey: 'Bearer',
  bodyKey: false,
  queryKey: false,
  reqKey: false,
  cookie: false,
}));

admin.private.use(
  async function verifyAccessToken(req,res,next){
    if(!req.token)
      throw new Error('Missing access token');
    
    const {
      sub: subject,
      elv: elevated
    } = await Auth.Token.verify(req.token);

    req.subject = subject;
    req.elevated = elevated;
    return next();
  },
  async function catchAccessTokenErrors(error,req,res,next){
    return res.status(401).send(error.message);
  }
);

admin.elevated.use(admin.private);

admin.elevated.use(
  function checkElevation(req,res,next){
    if(!req.elevated)
      return res.status(403).send('Login again');
    return next();
  }
);

/* ------------- Auth ------------------ */

const refreshTokenCookieOptions = {
  sameSite: 'Strict',
  httpOnly: true,
  secure: true,
}

admin.authFlow.post('/user/login',
  async function userLogin({
    body: {email,password}
  },res){

    const {
      accessToken,
      refreshToken,
      userData
    } = await Users.login(email,password);;

    res.cookie('refreshToken',refreshToken,refreshTokenCookieOptions);
    
    return res.send({
      accessToken,
      userData
    });
  }
);

admin.authFlow.post('/user/refreshLogin',
  async function userRefreshLogin({
    body: { email },
    cookies: { refreshToken: currentRefreshToken }
  },res){

    if(!email)
      throw new MissingParameterError('email');

    if(!currentRefreshToken)
      throw new Error('Missing refresh token');
      
    const {
      accessToken,
      refreshToken,
      userData
    } = await Users.refreshLogin(email,currentRefreshToken);

    res.cookie('refreshToken',refreshToken,refreshTokenCookieOptions);

    return res.send({
      accessToken,
      userData
    });
  }
);

admin.authFlow.use(
  function catchAuthFlowErrors(error,req,res,next){
    return res.status(401).send(error.message);
  }
);

admin.private.post('/user/logout',
  async function userLogout({subject},res){
    await Users.logout(subject);
    return res.sendStatus(204);
  }
);

/* -------------- Users --------------- */

admin.elevated.post('/user',
  async function createUser({
    body: {email,password,userData},
  },res){
    if(!email)
      throw new MissingParameterError('email');
    if(!password)
      throw new MissingParameterError('password');
    if(!userData)
      throw new MissingParameterError('userData');

    await Users.create(email,password,userData);

    return res.sendStatus(204);
  }
);

admin.elevated.put('/user',
  async function updateUser({
    body: {email,password,userData}
  },res){
    if(!email)
      throw new MissingParameterError('email');
    if(!userData)
      throw new MissingParameterError('userData');

    await Users.update(email,password,userData);

    return res.sendStatus(204);
  }
);

admin.elevated.delete('/user',
  async function deleteUser({
    body: {email},
    subject
  },res){
    if(!email)
      throw new MissingParameterError('email');
    if(email === subject)
      return res.status(409).send("You can not delete yourself");

    await Users.delete(email);

    return res.sendStatus(204);
  }
);

admin.private.get('/users',
  async function listUsers(req,res){
    return res.send(
      await Users.listAll()
    );
  }
);

/* --------------- Config -------------------- */

admin.config.get('/website/page',
  async function getPage(
    {query: {name}},
    res
  ){
    res.send(await Website.getPage(name));
  }
);

admin.elevated.put('/website/page',
  async function putPage(
    {body: {name,data}},
    res
  ){
    await Website.setPage(name,data);
    res.sendStatus(204);
  }
);

/* --------------- Website -------------------- */

website.public.get('/website/page',
  async function getPage(
    {query: {name}},
    res
  ){
    res.send(await Website.getPage(name));
  }
);

admin.elevated.put('/website/page',
  async function putPage(
    {body: {name,data}},
    res
  ){
    await Website.setPage(name,data);
    res.sendStatus(204);
  }
);

/* ---------- Generic Error handling ---------- */

v1.use(
  function catchCustomErrors(error,req,res,next){
    if(error instanceof MissingParameterError)
      return res.status(422).send(error.message);
    return next(error);
  }
);

/* --------------  404  --------------- */

app.all('*',(req,res)=>{
  return res.sendStatus(404);
});

/* ------------ Firebase -------------- */

export const api = functions.https.onRequest(app);
