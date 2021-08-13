import LoginTemplate from 'templates/Login';
import PasswordConfirmationTemplate from 'templates/Login/PasswordConfirmation';
import { useState, useCallback, useRef } from 'react';
import Api from 'api/api.js';
import { useRouter } from 'next/router';

export default function Login({
  passwordConfirmation=false,
  onLogin=()=>{},
  onCancel=()=>{},
  ...props
}){

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const currentUser = Api.currentUser();

  const submit = useCallback((ev)=>{
    ev.preventDefault();
    setLoading(true);
    const {email,password} = ev.target;
    Api.login(
      passwordConfirmation ? currentUser : email.value,
      password.value
    ).then(userData => {
      window.sessionActive = true;
      if(!passwordConfirmation)
        router.push('/dashboard');
      else
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
  ]);

  const Template = passwordConfirmation ? PasswordConfirmationTemplate : LoginTemplate;

  return <Template
    onSubmit={submit}
    errorMessage={errorMessage}
    loading={loading}
    clearError={()=>setErrorMessage(null)}
    email={currentUser}
    onCancel={onCancel}
    {...props}
  />
}
