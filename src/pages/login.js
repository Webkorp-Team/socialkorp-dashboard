import LoginTemplate from 'templates/Login';
import PasswordConfirmationTemplate from 'templates/Login/PasswordConfirmation';
import { useState, useCallback, useRef } from 'react';
import Api from 'api/api.js';
import { useRouter } from 'next/router';
import useCurrentUser, { useUpdateCurrentUserData } from 'use-current-user';

export default function Login({
  passwordConfirmation=false,
  onLogin=()=>{},
  onCancel=()=>{},
  ...props
}){

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const currentUser = useCurrentUser();
  const updateCurrentUserData = useUpdateCurrentUserData();

  const submit = useCallback((ev)=>{
    ev.preventDefault();
    setLoading(true);
    const {email,password} = ev.target;
    Api.login(
      passwordConfirmation ? currentUser.email : email.value,
      password.value
    ).then(userData => {
      window.sessionActive = true;
      if(!passwordConfirmation){
        router.push('/dashboard');
        updateCurrentUserData(userData);
        console.log(userData);
      }else
        onLogin();
    }).catch(error => {
      setLoading(false);
      setErrorMessage(error.message);
    });
  },[setErrorMessage,
    setLoading,
    router,
    currentUser,
    passwordConfirmation,
    onLogin,
    updateCurrentUserData,
  ]);

  const Template = passwordConfirmation ? PasswordConfirmationTemplate : LoginTemplate;

  return <Template
    onSubmit={submit}
    errorMessage={errorMessage}
    loading={loading}
    clearError={()=>setErrorMessage(null)}
    email={currentUser.email}
    onCancel={onCancel}
    {...props}
  />
}
