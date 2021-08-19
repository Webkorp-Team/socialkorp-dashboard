import Button from "components/Button";
import styled from "styled-components";

export const Iframe = styled.iframe`
  margin-top: 30px;
  width: calc(100%);
  min-height: 100vh;
`;
export const ActionButton = styled(Button)`
  width: 160px;
  & + &{
    margin-left: 20px;
    width: 160px;
  }
  &[data-noclick=true]{
    background: none;
    box-shadow: none;
    pointer-events: none;
  }
`;
export const SectionLink = styled.a`
  &[data-active=false]:not(:hover){
    color: ${p => p.theme.colors.lightText};
  }
  padding: 0 1em;
  &:first-child{
    padding-left: 0;
  }
  & + &{
    border-left: 1px solid ${p => p.theme.colors.lightText};
  }
`;
