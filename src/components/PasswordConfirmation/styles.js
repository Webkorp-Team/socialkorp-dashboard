import LoginPage from 'pages/login.js';
import styled from 'styled-components';


export const Login = styled(LoginPage).attrs({
  passwordConfirmation: true,
})`
  position: absolute;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;
