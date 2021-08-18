import AppFrame from 'templates/AppFrame';
import AddEditUser from 'templates/Users/AddEditUser';
import { useEffect, useMemo, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import PasswordConfirmation from 'components/PasswordConfirmation';
import Api from 'api/Api';


export default function AddUser(){

  const router = useRouter();

  const [showPwConfirmation, setShowPwConfirmation] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [form, setForm] = useState(null);

  const post = useCallback(()=>{
    const email = form.email.value;
    const userData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
    };
    const password = form.password.value;
    setDisabled(true);
    Api.post('/user',{
      email,
      userData,
      password
    }).then(()=>{
      router.push('/admin/users');
    }).catch(()=>{
      setDisabled(false);
    }); 
  },[
    setDisabled,
    form
  ]);

  useEffect(()=>{
    if(!form)
      return;
    if(Api.elevated())
      post();
    else{
      setDisabled(true);
      setTimeout(()=>{
        setShowPwConfirmation(true);
      },500);
    }
  },[form,setShowPwConfirmation,setDisabled]);

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
    post();
  },[
    setShowPwConfirmation,
    post
  ]);


  return <>
    {showPwConfirmation ? <PasswordConfirmation
      onCancel={handlePwCancel}
      onLogin={handlePwSubmit}
    /> : null}
      <AddEditUser disabled={disabled} onCancel={handleCancel} onSubmit={handleSubmit} user={null}/>
  </>;

}
