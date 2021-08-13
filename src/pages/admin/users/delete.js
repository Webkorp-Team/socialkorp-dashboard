import DeleteUser from 'templates/Users/DeleteUser';
import { useEffect, useMemo, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import PasswordConfirmation from 'components/PasswordConfirmation';
import Api from 'api/api';


export default function DeleteUser(){

  const router = useRouter();
  
  const user = useMemo(()=>{
    try{
      return JSON.parse(router.query.user);
    }catch(e){
      return null
    }
  },[router]);

  useEffect(()=>{
    if(!user)
      router.replace('/admin/users');
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
      <DeleteUser disabled={disabled} onCancel={handleCancel} onSubmit={handleSubmit} user={user}/>
  </>;

}
