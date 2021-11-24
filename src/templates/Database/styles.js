import styled from "styled-components";
import Link from 'components/Link';
import Button from '../../components/Button';

export const Table = styled.div`
  margin-top: 40px;
  display: table;
  width: calc(100% + 40px);
  position: relative;
  left: -20px;

`;

export const TableHead = styled.div`
  display: grid;
  /* grid-template-columns: repeat(5,350px); */
  display: table-row;
`;

export const TableRow = styled(TableHead).attrs({
  as: 'a'
})`
  background-color: transparent;
  transition: background-color 200ms;
  &:hover{
    background: ${p => p.theme.colors.gray1};
  }

  & > :last-child             {width:    0px;} // 7+ columns
  & > :last-child:nth-child(7){width:  200px;} // 6  columns
  & > :last-child:nth-child(6){width:  400px;} // 5  columns
  & > :last-child:nth-child(5){width:  600px;} // 4  columns
  & > :last-child:nth-child(4){width:  800px;} // 3  columns
  & > :last-child:nth-child(3){width: 1200px;} // 2  columns
  & > :last-child:nth-child(2){width: 1400px;} // 1  columns
`;

export const Img = styled.img`
  width: auto;
  height: 43px;
  margin-bottom: -16px;
`;

export const TableHeadCell = styled.div`
  font-size: 14px;
  line-height: 43px;
  color: ${p => p.theme.colors.lightText};
  display: table-cell;
  &:first-child{
    padding-left: 20px;
  }

  & i{
    font-size: 24px;
    line-height: inherit;
  }
`;
export const TableCell = styled.div`
  font-size: 16px;
  line-height: 43px;
  color: ${p => p.theme.colors.text};
  display: table-cell;
  max-width: 400px;
  &:first-child{
    padding-left: 20px;
  }

  border-bottom: 1pxc solid ${p => p.theme.colors.gray1};

  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  padding-right: 1em;

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
  & > textarea,
  & > [data-type=textarea]{
    grid-column: 1/3;
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
