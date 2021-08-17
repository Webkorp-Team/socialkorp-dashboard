import { useEffect, useMemo, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import AddEditUser from 'templates/Users/AddEditUser';
import PasswordConfirmation from 'components/PasswordConfirmation';
import Api from 'api/api';
import useCurrentUser,{ useUpdateCurrentUserData } from 'use-current-user';

export default function EditUser({selfMode=null}){

  const router = useRouter();

  const currentUser = useCurrentUser();
  const updateCurrentUserData = useUpdateCurrentUserData();

  const [user, setUser] = useState({});

  useEffect(()=>{
    if(!router.isReady)
      return;
    if(selfMode)
      setUser(currentUser);
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
  },[router,selfMode,currentUser]);

  useEffect(()=>{
    if(!user){
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

  const [form, setForm] = useState(null);

  useEffect(()=>{
    if(form)
      put();
  },[form]);

  const put = useCallback(()=>{
    
    if(!Api.elevated()){
      setDisabled(true);
      setTimeout(()=>{
        setShowPwConfirmation(true);
      },500);
      return;
    }

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
      if(user.email === currentUser.email)
        updateCurrentUserData(userData);
      router.push('/admin/users');
    }).catch(()=>{
      setDisabled(false);
    }); 
  },[
    setDisabled,
    user,
    currentUser,
    form
  ]);


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
    
    { !user ? null : <AddEditUser disabled={disabled} onCancel={handleCancel} onSubmit={handleSubmit} user={user} selfMode={selfMode}/> }
  </>;

}
