import Api from 'api/api';
import ProgressBar from 'components/ProgressBar';
import { useRouter } from 'next/router';
import EditUser from 'pages/admin/users/edit';
import { useEffect, useState } from 'react';

export default function ProfileAndPassword(){
  
  const router = useRouter();

  const [user, setUser] = useState({});

  useEffect(()=>{
    try{
      setUser(JSON.parse(router.query.user));
    }catch(e){
      Api.get('/user/current').then(user => {
        setUser(user);
      }).catch(()=>{});
    }
  },[router]);

  return !user ? <ProgressBar/> : <EditUser key={user.email || 'loading'} forwardedUser={user}/>;
}
