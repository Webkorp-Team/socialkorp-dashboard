import Api from 'api/Api';
import { useEffect, useState } from 'react';
import AppFrame from 'templates/AppFrame';
import UsersTemplate from 'templates/Users';

const cache = {
  users: null
};

export default function Users(){

  const [users, setUsers] = useState(cache.users);

  useEffect(()=>{
    Api.get('/users').then(list => {
      setUsers(list);
      cache.users = list;
    }).catch(()=>{});
  },[setUsers]);

  return <>
    <UsersTemplate users={users}/>
  </>
}
