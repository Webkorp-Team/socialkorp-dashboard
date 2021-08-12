import Main from 'templates/Login/Main';
import { useState, useCallback, useRef } from 'react';
import Api from 'api/api.js';
import { useRouter } from 'next/router';

export default function Login(){

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const submit = useCallback((ev)=>{
    ev.preventDefault();
    setLoading(true);
    const {email,password} = ev.target;
    Api.login(
      email.value,
      password.value
    ).then(userData => {
      window.sessionActive = true;
      setLoading(false);
      router.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      setErrorMessage(error.message);
      window.lastError = error;
    });
  },[setErrorMessage,setLoading,router]);

  return <Main
    onSubmit={submit}
    errorMessage={errorMessage}
    loading={loading}
    clearError={()=>setErrorMessage(null)}
  />
}
