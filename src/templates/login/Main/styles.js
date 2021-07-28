import styled from 'styled-components';
import theme from 'styles/theme';


export const Root = styled.main`
  width: 100%;
  min-height: 100vh;
  background-color: ${({theme}) => theme.colors.background};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Card = styled.div`
  width: 470px;
  height: auto;
  background-color: ${({theme}) => theme.colors.background};

  padding: 87px;

  box-shadow: 0px 15px 12px rgba(0, 0, 0, 0.22), 0px 19px 38px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
`;
