import './init.js';
import cookie from 'cookie';
import Auth from './auth/index.js';
import functions from 'firebase-functions';
import Users from './users/index.js';


// Auth.Token.generate('admin@futurehealthspaces.com',{}).then(result => console.log(result));

// Users.create('admin@futurehealthspaces.com','admin',{});


const refreshTokenCookieOptions = {
  sameSite: 'Strict',
  httpOnly: true,
  secure: true,
}

function managedHandler(method,handler){
  return (req,res)=>{
    try{
      
      // --- CORS ---
      // res.set('Access-Control-Allow-Origin','http://localhost:3000');
      // res.set('Access-Control-Allow-Headers','Authorization, Content-type');
      // res.set('Access-Control-Allow-Credentials','true');
      // if(req.method === 'OPTIONS'){
      //   return res.sendStatus(204);
      // }
      // --- ---


      if(
        (Array.isArray(method) && !method.includes(req.method))
        || (typeof method === 'string' && method !== req.method)
      )
        return res.sendStatus(405);
      req.cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
      return handler(req,res).catch(e => {
        return res.status(500).send(e.stack);
      });
    }catch(e){
      return res.status(500).send(e.stack);
    }
  };
}
function makePublicEndpoint(methods,handler){
  return functions.https.onRequest(managedHandler(methods,handler));
}
function makeEndpoint(methods,handler){
  return functions.https.onRequest((req,res)=>{
    const authorization = req.get('authorization');
    if(!authorization)
      return res.sendStatus(401);
    const [type,token] = authorization.split(' ');
    if(type !== 'Bearer')
      return res.status(401).send('Invalid authorization type');
    return Auth.Token.verify(token).then(payload => {
      const {sub: subject} = payload;
      if(!subject)
        return res.status(401).send('Missing subject');
      req.subject = subject;
      return managedHandler(methods,handler)(req,res);
    }).catch(e => {
      res.status(401).send(e.toString());
    });
  });
}

/************* PING ************* */

export const ping = makeEndpoint('GET',async (req,res)=>{
  res.sendStatus(200);
});

/*********** USER ****************/

const createUser = async (req,res)=>{
  const {email,password,userData} = req.body;

  await Users.create(email,password,userData);

  res.sendStatus(201);
};
const updateUser = async (req,res)=>{
  const {email,password,userData} = req.body;

  await Users.update(email,password,userData);

  res.sendStatus(204);
};
const deleteUser = async (req,res)=>{
  const {email} = req.body;

  await Users.delete(email);

  res.sendStatus(204);
};
export const createUpdateDeleteUser = makeEndpoint(['POST','PUT','DELETE'],async (req,res)=>{
  switch(req.method){
    case 'POST':
      return createUser(req,res);
    case 'PUT':
      return updateUser(req,res);
    case 'DELETE':
      return deleteUser(req,res);
  }
});
export const listUsers = makeEndpoint('GET',async (req,res)=>{

  const list = await Users.listAll();

  res.send(list);
});


/*********** LOGIN / LOGOUT ****************/

export const loginUser = makePublicEndpoint('POST',async (req,res)=>{
  const {email,password} = req.body;

  try{
    const {accessToken,refreshToken,userData} = await Users.login(email,password);

    res.cookie('refreshToken',refreshToken,refreshTokenCookieOptions);

    res.send({
      accessToken,
      userData,
    });
  }catch(error){
    res.status(401).send(error.message);
  }
});
export const logoutUser = makeEndpoint('POST',async (req,res)=>{
  
  const {refreshToken} = req.cookies;

  if(refreshToken)
    Users.logout(refreshToken);

  res.sendStatus(200);
});
export const refreshUserLogin = makePublicEndpoint('POST',async (req,res)=>{

  const {email} = req.body;

  const {refreshToken: currentRefreshToken} = req.cookies;

  if(!email || !currentRefreshToken)
    return res.sendStatus(401);

  try{

    const {accessToken,refreshToken} = await Users.refreshLogin(email,currentRefreshToken);

    res.cookie('refreshToken',refreshToken,refreshTokenCookieOptions);

    res.send({accessToken});
  }catch(e){
    res.status(401).send(e.message);
  }
});

  



