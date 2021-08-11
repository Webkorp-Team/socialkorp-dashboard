import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  height: 36px;
  line-height: 36px;
  
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.04em;
  
  color: ${p => p.theme.colors.text};
  background-color: ${p => p.theme.colors.primary};
  border-radius: 2px;

  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);

  cursor: pointer;

  &:hover,&:focus{
    filter: brightness(110%);
  }
  &:active{
    filter: brightness(95%);
  }
`;

