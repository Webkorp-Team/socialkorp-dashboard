import AppFrame from 'templates/AppFrame';
import AddEditUser from 'templates/Users/AddEditUser';
import { useEffect, useMemo, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import PasswordConfirmation from 'components/PasswordConfirmation';
import Api from 'api/api';
import { shallowEqualObjects } from "shallow-equal";


export default function EditUser({
  forwardedUser=null
}){

  const router = useRouter();
  
  const user = useMemo(()=>{
    if(forwardedUser)
      return forwardedUser;
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

  const [form, setForm] = useState(null);

  const put = useCallback(()=>{
    const email = user.email;
    const userData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
    };
    const password = form.password.value;
    setDisabled(true);
    Api.put('/user',{
      email,
      userData,
      password
    }).then(()=>{
      if(user.email === Api.currentUser() && !shallowEqualObjects(user.userData,userData))
        window.location = '/admin/users';
      else
        router.push('/admin/users');
    }).catch(()=>{
      setDisabled(false);
    }); 
  },[
    setDisabled,
    user,
    form
  ]);

  useEffect(()=>{
    if(!form)
      return;
    if(Api.elevated())
      put();
    else{
      setDisabled(true);
      setTimeout(()=>{
        setShowPwConfirmation(true);
      },500);
    }
  },[form,setShowPwConfirmation,setDisabled,put]);

  const handleSubmit = useCallback((e)=>{
    setForm(e.currentTarget);
  },[setForm]);
  const handleCancel = useCallback((e)=>{
    router.push('/admin/users');
  },[router]);
  const handlePwCancel = useCallback((e)=>{
    setDisabled(false);
    setShowPwConfirmation(false);
    setForm(null);
  },[setShowPwConfirmation,setForm,setDisabled]);
  const handlePwSubmit = useCallback(()=>{
    setShowPwConfirmation(false);
    put();
  },[
    setShowPwConfirmation,
    put
  ]);


  return <>
    {showPwConfirmation ? <PasswordConfirmation
      onCancel={handlePwCancel}
      onLogin={handlePwSubmit}
    /> : null}
      <AddEditUser disabled={disabled} onCancel={handleCancel} onSubmit={handleSubmit} user={user}/>
  </>;

}
