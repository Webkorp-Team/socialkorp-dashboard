import DeleteUserTemplate from 'templates/Users/DeleteUser';
import { useEffect, useMemo, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import PasswordConfirmation from 'components/PasswordConfirmation';
import Api from 'api/api';


export default function DeleteUser(){

  const router = useRouter();
  
  const [user, setUser] = useState({});

  useEffect(()=>{
    console.log(router.isReady,router.query);
    if(!router.isReady)
      return;
    else if(router.query.email)
      setUser({email:router.query.email});
    else if(router.query.user)
      try{
        setUser(JSON.parse(router.query.user));
      }catch(e){
        setUser(null);
      }
    else
      setUser(null);
  },[router]);

  useEffect(()=>{
    if(!user || user.email === Api.currentUser()){
      router.replace('/admin/users');
      return;
    }
    if(!user.email)
      return;
    if(user.userData)
      return;
    
    Api.get('/users').then(list => {
      setUser(list.filter(u => u.email === user.email)[0] || null);
    }).catch(()=>{});

  },[user]);

  const [showPwConfirmation, setShowPwConfirmation] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const doDelete = useCallback(()=>{
    const email = user.email;
    setDisabled(true);
    Api.delete('/user',{
      email,
    }).then(()=>{
      router.push('/admin/users');
    }).catch(()=>{
      setDisabled(false);
    }); 
  },[
    setDisabled,
    user,
  ]);

  const handleSubmit = useCallback(()=>{
    if(Api.elevated())
      doDelete();
    else{
      setDisabled(true);
      setTimeout(()=>{
        setShowPwConfirmation(true);
      },500);
    }
  },[setShowPwConfirmation,setDisabled,doDelete]);
  const handleCancel = useCallback((e)=>{
    router.push('/admin/users');
  },[router]);
  const handlePwCancel = useCallback((e)=>{
    setDisabled(false);
    setShowPwConfirmation(false);
  },[setShowPwConfirmation,setDisabled]);
  const handlePwSubmit = useCallback(()=>{
    setShowPwConfirmation(false);
    doDelete();
  },[
    setShowPwConfirmation,
    doDelete
  ]);


  return <>
    {showPwConfirmation ? <PasswordConfirmation
      onCancel={handlePwCancel}
      onLogin={handlePwSubmit}
    /> : null}
      {!user ? null : <DeleteUserTemplate disabled={disabled} onCancel={handleCancel} onSubmit={handleSubmit} user={user}/>}
  </>;

}
