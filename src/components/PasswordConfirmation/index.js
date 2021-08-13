import * as S from './styles';
import LoginPage from 'pages/login.js';

export default function PasswordConfirmation({
  onLogin=()=>{},
  onCancel=()=>{},
  ...props
}){
  return <S.Login onLogin={onLogin} onCancel={onCancel}/>;
}
