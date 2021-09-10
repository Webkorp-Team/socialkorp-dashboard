import Button from "components/Button";
import styled from "styled-components";

export const Iframe = styled.iframe`
  margin-top: 30px;
  width: calc(100%);
  height: calc(100vh - 257px);
  background-color: ${p => p.theme.colors.contentBackground};
  &[data-visible=false]{
    opacity: 0;
    height: 0;
    margin-top: 0;
  }
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
    &[data-modified=true]{
      color: ${p => p.theme.colors.error};
    }
  }
  padding: 0 1em;
  &:first-child{
    padding-left: 0;
  }
  & + &{
    border-left: 1px solid ${p => p.theme.colors.lightText};
  }
`;

export const MetaTabLayout = styled.div`
  margin-top: 30px;
  max-width: 800px;
  &[data-visible=false]{
    display: none;
  }
`;
export const CardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 22px;
  row-gap: 50px;
  [data-slim=true] &{
    grid-template-columns: 1fr;
    max-width: 400px;
  }
  & > textarea,
  & > [data-type=textarea]{
    grid-column: 1/3;
  }
`;
