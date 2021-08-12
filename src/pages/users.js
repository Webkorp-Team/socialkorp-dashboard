import Api from 'api/api';
import { useEffect } from 'react';
import AppFrame from 'templates/AppFrame';
import UsersTemplate from 'templates/Users';

export default function Users(){

  useEffect(()=>{
    Api.get('/users');
  },[]);

  return <AppFrame>
    <UsersTemplate/>
  </AppFrame>
}
