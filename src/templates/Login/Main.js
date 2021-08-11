import * as S from './styles';
import TextField from 'components/TextField';
import Button from 'components/Button';
import { useState, useCallback, useRef } from 'react';

export default function Main({
  ...props
}){

  const [error, setError] = useState(false);

  const input = useRef();

  const submit = useCallback((e)=>{
    e.preventDefault();
    setTimeout(()=>{
      if(document.getElementById('email').value === 'admin@futurehealthspaces.com'){
        window.localStorage.setItem('email','admin@futurehealthspaces.com');
        window.location = '/dashboard';
      }else
        setError(true);
    },300);
  },[setError,input]);

  return <S.Root {...props}>
    <S.Card onSubmit={submit}>
      <S.Logo/>
      <S.Spacer count={8}/>
      <S.Title>Sign in</S.Title>
      <S.Spacer count={6}/>
      <TextField id="email" required type="email" onChange={()=>setError(false)} invalid={error} placeholder="E-mail"/>
      <S.InputError $visible={error}>Couldn’t find your account. Please check e-mail address.</S.InputError>
      <S.Spacer count={2}/>
      <S.HelpText>Not your computer? Use Guest mode to sign in privately.</S.HelpText>
      <S.Spacer count={2}/>
      <Button>Login</Button>
      <S.Spacer count={2}/>
      <S.HelpText>Powered by Webkorp</S.HelpText>
    </S.Card>
  </S.Root>;
}
