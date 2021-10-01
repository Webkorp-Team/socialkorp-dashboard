import './init-firebase-app.js';
import express from 'express';
import bearerToken from 'express-bearer-token';
import functions from 'firebase-functions';
import cookieParser from 'cookie-parser';

import Auth from './auth/index.js';
import Users from './users/index.js';
import Website from './website/index.js';
import { MissingParameterError, NotFoundError, UnauthorizedError } from './errors.js';
import List from './list/index.js';
import Settings from './settings/index.js';
import Email from './email/index.js';

/* ----------- Common middleware settings ------------ */

const rootApp = express();

const app = express.Router();

rootApp.use('/api/v1',app);

const parseBearerToken = bearerToken({
  headerKey: 'Bearer',
  bodyKey: false,
  queryKey: false,
  reqKey: false,
  cookie: false,
});
  
async function verifyAccessToken(req,res,next){
  if(!req.token){
    req.subject = null;
    req.elevated = false;
    return next();
  }

  const {
    sub: subject,
    elv: elevated
  } = await Auth.Token.verify(req.token);

  req.subject = subject;
  req.elevated = elevated;
  return next();
}

async function requireAuthentication(req,res,next){
  if(!req.subject)
    throw new Error('Missing access token');
  return next();
}

async function catchAccessTokenErrors(error,req,res,next){
  return res.set('WWW-Authenticate','Bearer').status(401).send(error.message);
}

function catchAuthFlowErrors(error,req,res,next){
  return res.status(401).send(error.message);
}

function checkElevation(req,res,next){
  if(!req.elevated)
    return res.status(403).send('Login again');
  return next();
}

function parseQuery(req,res,next){
  if(req.query?._body)
    req.query = JSON.parse(req.query._body);
  return next();
}

/* ------------ Endpoint-specific middleware settings ---------- */

// Website endpoints
const website = {

  // Public data fetching endpoints
  public: [
    parseQuery,
  ],
};

// Admin dashboard endpoints
const admin = {

  // Auth flow
  // Requires either refresh token or email+password
  // Returns 401 on all errors
  authFlow: [
    cookieParser(),
  ],

  // Requires a valid access token
  private: [
    parseBearerToken,
    verifyAccessToken,
    requireAuthentication,
    catchAccessTokenErrors,
    parseQuery,
  ],

  // Requires an elevated access token
  elevated: [
    parseBearerToken,
    verifyAccessToken,
    requireAuthentication,
    catchAccessTokenErrors,
    checkElevation,
    parseQuery,
  ],
};

const database = {

  // Optional authentication.
  // Authorization is checked at higher level code.
  mixed: [
    parseBearerToken,
    verifyAccessToken,
    catchAccessTokenErrors,
    parseQuery,
  ]
}

/* ------------- Auth ------------------ */

const refreshTokenCookieOptions = {
  sameSite: 'Strict',
  httpOnly: true,
  secure: true,
}

app.post('/user/login',...admin.authFlow,
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
  },
  catchAuthFlowErrors
);

app.post('/user/refreshLogin',...admin.authFlow,
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
  },
  catchAuthFlowErrors
);


app.post('/user/logout',
  ...admin.private,
  async function userLogout({subject},res){
    await Users.logout(subject);
    return res.sendStatus(204);
  }
);

/* -------------- Users --------------- */

app.post('/user',
  ...admin.elevated,
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

app.put('/user',
  ...admin.elevated,
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

app.delete('/user',
  ...admin.elevated,
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

app.get('/users',
  ...admin.private,
  async function listUsers(req,res){
    return res.send(
      await Users.listAll()
    );
  }
);

/* --------------- Website -------------------- */

app.get('/website/page',
  ...website.public,
  async function getPage(
    {query: {name}},
    res
  ){
    res.send(await Website.getPage(name));
  }
);

app.put('/website/page',
  ...admin.elevated,
  async function putPage(
    {body: {name,data}},
    res
  ){
    await Website.setPage(name,data);
    res.sendStatus(204);
  }
);

/* --------------- Database -------------------- */

app.get('/list/item',
  ...database.mixed,
  async function getListItem(
    {subject, query: {listName,itemId,query}},
    res
  ){
    const list = new List(
      listName,
      subject
    );
    const result = query ? list.findOne(query) : list.get(itemId);
    res.send(await result);
  }
);

app.put('/list/item',
  ...database.mixed,
  async function setListItem(
    {subject, body: {listName,itemId,data}},
    res
  ){
    await (new List(
      listName,
      subject
    )).set(itemId,data);
    res.sendStatus(204);
  }
);

app.post('/list/item',
  ...database.mixed,
  async function insertListItem(
    {subject, body: {listName,data}},
    res
  ){
    res.send({
      itemId: await (new List(
        listName,
        subject
      )).insert(data)
    });
  }
);

app.delete('/list/item',
  ...database.mixed,
  async function deleteListItem(
    {subject, body: {listName,itemId}},
    res
  ){
    await (new List(
      listName,
      subject
    )).delete(itemId);
    res.sendStatus(204);
  }
);

app.get('/list/index',
  ...database.mixed,
  async function getListIndex(
    {subject, query: {listName}},
    res
  ){
    res.send(
      await (new List(
        listName,
        subject
      )).getIndex()
    );
  }
);

app.get('/list/archive',
  ...database.mixed,
  async function getListArchive(
    {subject, query: {listName}},
    res
  ){
    res.send(
      await (new List(
        listName,
        subject
      )).getArchive()
    );
  }
);

/* --------------- Settings -------------------- */

app.get('/settings',
  ...database.mixed,
  async function getSettings(
    {subject, query: {flatten}},
    res
  ){
    res.send(await Settings.getAll(
      flatten,
      subject
    ));
  }
);

/* --------------- Email -------------------- */

app.post('/email/send',
  ...website.public,
  async function sendEmail(
    {body: {template,params}},
    res
  ){
    await Email.send(template,params);
    res.sendStatus(204);
  }
);
app.post('/newsletter/subscribe',
  ...website.public,
  async function subscribeNewsletter(
    {body: {email}},
    res
  ){
    await Email.subscribe(email);
    res.sendStatus(204);
  }
);

/* ---------- Generic Error handling ---------- */

app.use(
  function catchCustomErrors(error,req,res,next){
    if(error instanceof MissingParameterError)
      return res.status(422).send(error.message);
    if(error instanceof UnauthorizedError)
      return res.set('WWW-Authenticate','Bearer').status(401).send(error.message);
    if(error instanceof NotFoundError)
      return res.status(404).send(error.message);
    return next(error);
  }
);

/* --------------  404  --------------- */

rootApp.all('*',(req,res)=>{
  return res.sendStatus(404);
});

/* ------------ Firebase -------------- */

export const api = functions.https.onRequest(rootApp);
