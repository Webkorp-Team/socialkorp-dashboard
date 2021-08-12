import { useState } from "react";
import styled from "styled-components";
import UnstyledLink from "components/Link";

export const Root = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;

  background-color: ${p => p.theme.colors.background};
  max-height: 100%;
  overflow-y: hidden;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12), 0px 4px 4px rgba(0, 0, 0, 0.24);

  padding: 35px 20px 35px;
`;
export const AlignTop = styled.div`
  display: flex;
  flex-direction: column;
`;
export const AlignBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;


const _SectionTitle = (p)=>{
  const [collapse, setCollapse] = useState(false);
  return <div {...p} data-collapse={collapse} onClick={()=>setCollapse(x=>!x)}/>
}
export const SectionTitle = styled(_SectionTitle)`
  & > i{
    font-size: 22px;
    margin-right: 18px;
    color: ${p => p.theme.colors.gray2};
  }
  & > span{
    font-size: 20px;
    font-weight: 500;
    color: ${p => p.theme.colors.text};
  }
  & > *{
    vertical-align: middle;
    transition: color .2s;
  }

  
  cursor: pointer;
  
  &:hover,&[data-active=true]{
    & > *{
      color: ${p => p.theme.colors.primary};
    }
  }

  position: relative;
  &:after{
    display: block;
    position: absolute;
    top: 7.5px;
    right: 0;
    content: '';
    width: 0; 
    height: 0; 
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid ${p => p.theme.colors.primary};

    transition: transform 0.5s;
  }
  &[data-collapse=true]:after{
    transform: scaleY(-1);
  }
`;
const _SectionLink = ({...props})=>{

  return <SectionTitle as="a" {...props}/>;
};
export const SectionLink = styled(_SectionLink)`
  display: block;
  &&:after{
    display: none;
  }
`;
export const Section = styled.div`
  font-size: 16px;
  margin: ${24/16}em 0 ${21/16}em 42px;

  transition: opacity .25s 1s, font-size 1s;
  [data-collapse=true] + &{
    opacity: 0;
    font-size: 0;
    transition: opacity .25s, font-size 1s .25s;
  }
`;
export const Link = styled(UnstyledLink)`
  display: block;
  font-size: ${16/16}em;
  color: ${p => p.theme.colors.text};

  cursor: pointer;
  transition: color .2s;
  &:hover,&[data-active=true]{
    color: ${p => p.theme.colors.primary};
  }
  & + &{
    margin-top: ${18/16}em;
  }
`;



export const Separator = styled.div`
  height: 1px;
  min-height: 1pxc;
  background: ${p => p.theme.colors.gray1};
  margin: 35px 0;
`;
