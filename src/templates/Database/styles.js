import styled from "styled-components";
import Link from 'components/Link';
import Button from '../../components/Button';

export const Table = styled.div`
  margin-top: 40px;

`;

export const TableHead = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5,200px);
`;

export const TableRow = styled(TableHead)`
  border-bottom: 1pxc solid ${p => p.theme.colors.gray1};
  
  position: relative;
  &:before{
    border-bottom: 1pxc solid transparent;
    position: absolute;
    display: inline-block;
    background: green;
    height: 100%;
    top: 0;
    width: 20px;
    left: -20px;
    content: '';
  }
  &:after{
    border-bottom: 1pxc solid transparent;
    position: absolute;
    display: inline-block;
    background: green;
    height: 100%;
    top: 0;
    width: 20px;
    right: -20px;
    content: '';
  }
  
  &,&:before,&:after{
    background-color: transparent;
    transition: background-color 200ms;
  }
  &:hover{
    &,&:before,&:after{
      background: ${p => p.theme.colors.gray1};
      border-bottom-color: ${p => p.theme.colors.gray1};
    }
  }
`;

export const TableHeadCell = styled.div`
  font-size: 14px;
  line-height: 43px;
  color: ${p => p.theme.colors.lightText};

  & i{
    font-size: 24px;
    line-height: inherit;
  }
`;
export const TableCell = styled.div`
  font-size: 16px;
  line-height: 43px;
  color: ${p => p.theme.colors.text};

  & small{
    font: inherit;
    font-size: 12px;
    line-height: inherit;
    color: ${p => p.theme.colors.lightText};
    opacity: 0.5;
  }
`;
export const ActionLink = styled(Link)`
  font-weight: 700;
  color: ${p => p.theme.colors.primary};
  cursor: pointer;
`;
export const Layout = styled.div`
  margin-top: 40px;
  max-width: 800px;
  &[data-slim=true]{
    max-width: 600px;
  }
`;
export const Footer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* & > :last-child{ */
    /* display: flex; */
    /* justify-content: flex-end; */
  /* } */
`;
export const Spacer = styled.div`
  height: ${p => p.count*8}px;
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
`;
export const WorkspaceButton = styled(Button)`
  padding: 0 16px;
  width: max-content;
  min-width: 138px;
`;
export const ActionButton = styled(Button)`
  width: calc(50% - 10px);
  & + &{
    margin-left: 20px;
  }
`;
export const FooterActionLink = styled(Link)`
  &&:hover{
    text-decoration: none;
    color: ${p => p.theme.colors.text};
  }
  cursor: pointer;
`;
export const FieldError = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: ${p => p.theme.colors.error};
`;
export const HelpText = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: ${p => p.theme.colors.lightText};
`;
export const Capitalize = styled.span`
  font: inherit;
  text-transform: capitalize;
`;
