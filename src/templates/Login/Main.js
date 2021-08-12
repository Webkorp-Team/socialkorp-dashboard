import * as S from './styles';
import TextField from 'components/TextField';
import Button from 'components/Button';

export default function Main({
  errorMessage=null,
  loading=false,
  clearError=()=>{},
  onSubmit=()=>{},
  ...props
}){

  return <S.Root {...props}>
    <S.Card onSubmit={onSubmit}>
      <S.Logo/>
      <S.Spacer count={8}/>
      <S.Title>Sign in</S.Title>
      <S.Spacer count={6}/>
      <TextField
        type="email"
        name="email"
        placeholder="E-mail"
        required
        onChange={()=>clearError()}
        invalid={Boolean(errorMessage)}
        disabled={loading}
      />
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
      <S.HelpText>Not your computer? Use Guest mode to sign in privately.</S.HelpText>
      <S.Spacer count={2}/>
      <Button disabled={loading}>Login</Button>
      <S.Spacer count={2}/>
      <S.HelpText>Powered by Webkorp</S.HelpText>
    </S.Card>
  </S.Root>;
}
