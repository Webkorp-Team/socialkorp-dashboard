import queryString from 'query-string';

async function performRequest(method,url,payload=undefined,token=undefined){

  const haveBody = !['GET','HEAD'].includes(method);

  const query = (haveBody || !payload) ? '' : '?'+queryString.stringify(payload);

  const response = await window.fetch(`${url}${query}`,{
    method,
    headers:{
      ...(token ? {
        'Authorization': `Bearer ${token}`,
      }:{}),
      ...(haveBody ? {
        'Content-Type': 'application/json',
      }:{}),
    },
    body: haveBody ? JSON.stringify(payload||{}) : undefined,
    mode: 'same-origin',
    credentials: 'same-origin',
    cache: 'no-cache',
    redirect: 'error',
    keepalive: false,
  });

  if(!response.ok)
    return response;

  const contentType = response.headers.get("content-type");
  if(contentType && contentType.indexOf("application/json") !== -1)
    return response;
  else return new Response('{}',{
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
}

const apiRoot = '/api/v1';

export class UnauthorizedError extends Error{
  unauthorized = true;
  status = 401;
  statusText = 'Unauthorized';
}

export default class Api{

  static #accessToken;
  static #email;
  static #sessionActive;
  static #onLogout = ()=>{};

  static setOnLogoutListener(listener){
    this.#onLogout = listener;
  }

  static isSessionActive(){
    return this.#sessionActive;
  }

  static currentUser(){
    return (typeof window !== 'undefined') ? window.localStorage.getItem('currentUser') : null;
  }

  static async login(email,password){
    const response = await performRequest('POST',`${apiRoot}/user/login`,{
      email,
      password,
    });

    if(response.status === 401)
      throw new Error('Invalid email and/or password');
    else if(!response.ok)
      throw new Error(response.statusText);

    const body = await response.json();

    this.#email = email;
    this.#accessToken = body.accessToken;
    this.#sessionActive = true;

    window.localStorage.setItem('currentUser',this.#email);

    return body.userData;
  }
  static async logout(){
    await this.post(`/user/logout`);
    this.#accessToken = null;
    this.#sessionActive = false;
    window.localStorage.removeItem('currentUser');
    this.#onLogout();
  }

  
  static #refreshTokenInProgress = null;
  static async refreshToken(){
    if(this.#refreshTokenInProgress)
      return await this.#refreshTokenInProgress;
    
    this.#refreshTokenInProgress = this.#doRefreshToken();
    try{
      return await this.#refreshTokenInProgress;
    }finally{
      this.#refreshTokenInProgress = null;
    }
  }
  static async #doRefreshToken(){
    if(!this.#email)
      this.#email = this.currentUser();
    if(!this.#email)
      throw new UnauthorizedError('Session expired');

    const response = await performRequest('POST',`${apiRoot}/user/refreshLogin`,{
      email: this.#email
    });

    if(response.status === 401){
      this.#sessionActive = false;
      this.#email = null;
      this.#accessToken = null;
      window.localStorage.removeItem('currentUser');

      throw new UnauthorizedError('Session expired');
    } else if(response.status !== 200)
      throw new Error(response.statusText);

    const body = await response.json();

    this.#accessToken = body.accessToken;
    this.#sessionActive = true;
  }
  static async request(method,endpoint,payload,abortIfUnauthorized=false){
    
    const response = this.#accessToken ? (
      await performRequest(method,`${apiRoot}${endpoint}`,payload,this.#accessToken)
    ) : {};

    if(!this.#accessToken || response.status === 401){

      if(abortIfUnauthorized){
        // Prevents the code from crashing into infinite recursion if we continue to receive 401 even after a successful token refresh.
        // Should not happen.
        throw new UnauthorizedError('Session expired');
      }

      try{
        await this.refreshToken();
      }catch(error){
        if(error instanceof UnauthorizedError)
          this.#onLogout();
        else
          throw error;
      }

      return await this.request(method,endpoint,payload,true);
    }

    if(!response.ok)
      throw new Error(response.statusText);
    
    return await response.json();
  }

  static async get(endpoint,payload){
    return await this.request('GET',endpoint,payload);
  }
  static async post(endpoint,payload){
    return await this.request('POST',endpoint,payload);
  }

}
