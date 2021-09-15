import styled from 'styled-components';
import config from 'api/website.config.json';

export const Root = styled.main`
  width: 100%;
  min-height: 100vh;
  background-color: ${({theme}) => theme.colors.background};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media mobile{
    display: block;
  }

  &[data-transparentbg=true]{
    background-color: #0008;
    backdrop-filter: blur(5px);
  }
`;
export const Card = styled.form`
  width: 472px;
  height: auto;
  background-color: ${({theme}) => theme.colors.background};

  padding: 87px;

  box-shadow: 0px 15px 12px rgba(0, 0, 0, 0.22), 0px 19px 38px rgba(0, 0, 0, 0.3);
  border-radius: 2px;


  @media mobile{
    display: block;
    box-shadow: none;
    border-radius: none;
    width: 100%;
  }
`;
export const Logo = styled.img.attrs(({theme}) => {return{
  alt: config.dashboard.title,
  src: theme.assets.logo,
}})`
  width: 100%;
  height: auto;
  max-height: 200px;
  pointer-events: none;
`;
export const Spacer = styled.div`
  height: ${p => (p.count||1)*12}px;
`;
export const Title = styled.h1`
  color: ${p => p.theme.colors.text};
  font-size: 20px;
  font-weight: 500;
  line-height: 23px;
  text-align: center;
`;
export const PersonName = styled(Title).attrs({
  as: 'div'
})`

`;
export const HelpText = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${p => p.theme.colors.gray2};
`;
export const HelpTextLink = styled.span`
  font: inherit;
  cursor: pointer;
  color: inherit;
  &:hover{
    color: ${p => p.theme.colors.text};
  }
`;


export const InputError = styled.div`
  font-size: 12px;
  line-height: 16px;
  margin-top: 8px;

  color: ${p => p.theme.colors.error};
  letter-spacing: -0.01em;

  opacity: ${p=> p.$visible ? 1 : 0};
`;

