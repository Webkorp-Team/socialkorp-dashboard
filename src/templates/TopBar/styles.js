import styled from "styled-components";

export const Root = styled.div`
  height: 64px;
  background-color: ${p => p.theme.colors.primary};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12), 0px 4px 4px rgba(0, 0, 0, 0.24);

  display: grid;
  grid-template-columns: 1fr 1fr;
`;
export const AppTitle = styled.div`
  font-weight: 500;
  font-size: 20px;
  text-transform: uppercase;
  color: ${p => p.theme.colors.textOverPrimary};

  line-height: 64px;
  padding-left: 19px;
`;
export const RightSideLayout = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const UserAvatar = styled.div`
  margin: 12px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${p => p.theme.colors.textOverPrimary};
  
  background-color: ${p => p.theme.colors.background};
  color: ${p => p.theme.colors.text};
  font-size: 20px;
  line-height: 40px;
  font-weight: 400;
  text-align: center;
  text-transform: uppercase;

  cursor: pointer;
`;
export const ExpansiveSection = styled.div`
  display: flex;
  flex-direction: row;

  font-size: 16px;
  line-height: 64px;

  transition: opacity .25s .75s, font-size 1s;
  &[data-collapse=true]{
    opacity: 0;
    font-size: 0;
    transition: opacity .25s, font-size 1s 0s;
  }
`;
export const UserName = styled.div`
  font-size: ${16/16}em;
  margin-right: ${50/16}em;
  color: ${p => p.theme.colors.textOverPrimary};

  cursor: default;
`;
export const Menu = styled.div`
  display: flex;
  & > * + *{
    
  }
`;
export const MenuItem = styled.div`
  font-size: ${16/16}em;
  font-weight: 700;
  & + &{
    margin-left: ${28/16}em;
  }
  color: ${p => p.theme.colors.textOverPrimary};

  cursor: pointer;
  &:hover{
    color: ${p => p.theme.colors.lightTextOverPrimary};
  }
  &[data-disabled=true]{
    color: ${p => p.theme.colors.lightTextOverPrimary};
    cursor: default;
  }
`;
export const ExpandButton = styled.div.attrs({
  children: '•••',
})`
  font-size: 20px;
  line-height: 64px;
  margin-right: 20px;
  width: 64px;
  text-align: center;
  
  color: ${p => p.theme.colors.textOverPrimary};

  transition: transform 1s;
  &[data-collapse=true]{
    transition: transform 1s;
    transform: rotate(90deg);
  }

  cursor: pointer;
`;
