import './init.js';
import cookie from 'cookie';
import Auth from './auth/index.js';
import functions from 'firebase-functions';
import Users from './users/index.js';


// Auth.Token.generate('mateus',{}).then(result => console.log(result));

// Users.create('mateus','1234',{});


function managedHandler(method,handler){
  return (req,res)=>{
    try{
      if(req.method !== method)
        return res.sendStatus(405);
      req.cookies = req.headers.cookies ? cookie.parse(req.headers.cookies) : {};
      return handler(req,res).catch(e => {
        return res.status(500).send(e.stack);
      });
    }catch(e){
      return res.status(500).send(e.stack);
    }
  };
}
function makePublicEndpoint(method,handler){
  return functions.https.onRequest(managedHandler(method,handler));
}
function makeEndpoint(method,handler){
  return functions.https.onRequest((req,res)=>{
    const authorization = req.get('authorization');
    if(!authorization)
      return res.sendStatus(401);
    const [type,token] = authorization.split(' ');
    if(type !== 'Bearer')
      return res.status(400).send('Invalid authorization type');
    return Auth.Token.verify(token).then(payload => {
      const {sub: subject} = payload;
      if(!subject)
        return res.status(401).send('Missing subject');
      req.subject = subject;
      return managedHandler(method,handler)(req,res);
    }).catch(e => {
      res.status(401).send(e.toString());
    });
  });
}

export const createUser = makeEndpoint('POST',async (req,res)=>{
  const {email,password,userData} = req.body;
// 
  await Users.create(email,password,userData);

  res.sendStatus(201);
});
export const deleteUser = makeEndpoint('POST',async (req,res)=>{
  const {email} = req.body;

  await Users.delete(email);

  res.sendStatus(204);
});
export const updateUser = makeEndpoint('POST',async (req,res)=>{
  const {email,password,userData} = req.body;

  await Users.update(email,password,userData);

  res.sendStatus(204);
});
export const loginUser = makePublicEndpoint('POST',async (req,res)=>{
  const {email,password} = req.body;

  const {accessToken,refreshToken,userData} = await Users.login(email,password);

  res.cookie('refreshToken',refreshToken,{
    sameSite: 'Strict',
    httpOnly: true,
    secure: true,
  });

  res.send({
    accessToken,
    userData,
  });
});
export const refreshUserLogin = makePublicEndpoint('POST',async (req,res)=>{

  const {email} = req.body;

  const {refreshToken: currentRefreshToken} = req.cookies;

  if(!email || !currentRefreshToken)
    return res.sendStatus(401);

  const {accessToken,refreshToken} = await Users.refreshLogin(email,currentRefreshToken);

  res.cookie('refreshToken',refreshToken,{
    sameSite: 'Strict',
    httpOnly: true,
    secure: true,
  });

  res.send({accessToken});
});

// export const helloWorld = handlerWrapper(()=>{});
  



