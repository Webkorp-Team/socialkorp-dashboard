import styled from "styled-components";

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4,1fr);
  margin-top: 40px;
  grid-gap: 26px;
`;

export const CardTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 10px;
  & > :nth-child(even){
    text-align: right;
  }
  margin-top: 18px;
`;
export const CardTableDouble = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  & > :first-child{
    padding-right: 25px;
    border-right: 1px solid ${p => p.theme.colors.gray1};
  }
  & > :last-child{
    padding-left: 25px;
  }
  & > div{
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 10px;
    & > :nth-child(even){
      text-align: right;
    }
  }
`;
export const Red = styled.span`
  color: ${p => p.theme.colors.error};
`;  
export const Green = styled.span`
  color: ${p => p.theme.colors.success};
`;  
export const CardCount = styled.div`
  font-size: 86px;
  font-weight: 700;
  margin: 30px 0 26px;
`;
