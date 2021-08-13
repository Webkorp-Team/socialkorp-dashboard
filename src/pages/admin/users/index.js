import Api from 'api/api';
import { useEffect, useState } from 'react';
import AppFrame from 'templates/AppFrame';
import UsersTemplate from 'templates/Users';

export default function Users(){

  const [users, setUsers] = useState([]);

  useEffect(()=>{
    Api.get('/users').then(
      list => setUsers(list)
    ).catch(()=>{});
  },[setUsers]);

  return <>
    <UsersTemplate users={users}/>
  </>
}
