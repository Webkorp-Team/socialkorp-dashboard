import * as S from './styles';
import TextField from 'components/TextField';
import Button from 'components/Button';
import { useCallback } from 'react';
import Link from 'next/link';

export default function PasswordConfirmation({
  errorMessage=null,
  loading=false,
  clearError=()=>{},
  onSubmit=()=>{},
  onCancel=()=>{},
  email="",
  ...props
}){

  const handleCancel = useCallback((ev)=>{
    ev.preventDefault();
    onCancel();
  },[onCancel]);

  return <S.Root data-transparentbg={true} {...props}>
    <S.Card onSubmit={onSubmit}>
      <S.Title>Please enter your password again to confirm your identity</S.Title>
      <S.Spacer count={6}/>
      <S.Title>{email}</S.Title>
      <S.Spacer count={2}/>
      <TextField
        type="password"
        name="password"
        placeholder="Password"
        required
        onChange={()=>clearError()}
        invalid={Boolean(errorMessage)}
        disabled={loading}
      />
      <S.InputError $visible={Boolean(errorMessage)}>{errorMessage}</S.InputError>
      <S.Spacer count={2}/>
      <S.HelpText>
        Not you? <Link href="/login"><S.HelpTextLink>Login as another user.</S.HelpTextLink></Link>
      </S.HelpText>
      <S.Spacer count={2}/>
      <Button disabled={loading}>Login</Button>
      <S.Spacer count={1}/>
      <Button onClick={handleCancel} variant="secondary" disabled={loading}>Cancel</Button>
      <S.Spacer count={2}/>
      <S.HelpText>Powered by Webkorp</S.HelpText>
    </S.Card>
  </S.Root>;
}
