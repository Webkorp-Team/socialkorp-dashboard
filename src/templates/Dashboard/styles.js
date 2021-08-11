import styled from "styled-components";


export const Root = styled.div`
  padding: 35px 20px 20px;
`;
export const Title = styled.h1`
  font-size: 20px;
  line-height: 23px;
  font-weight: 500;
  color: ${p => p.theme.colors.text};
`;
export const SectionTitle = styled.h2`
  font-size: 16px;
  line-height: 34px;
  font-weight: 600;
  color: ${p => p.theme.colors.text};

  padding-bottom: 10px;
  border-bottom: 1px solid ${p => p.theme.colors.gray1};

  margin-top: 24px;
`;
export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4,1fr);
  margin-top: 40px;
  grid-gap: 26px;
`;
export const Card = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
  border-radius: 2px;
  background-color: ${p => p.theme.colors.cardBackground};
  &[data-primary=true]{
    background-color: ${p => p.theme.colors.primary};
  }
`;
export const CardHeader = styled.div`
  background-color: #fff2;
  font-size: 16px;
  font-weight: 500;
  line-height: 55px;
  padding: 0 25px;
  color: ${p => p.theme.colors.text};
  [data-primary=true] &{
    color: ${p => p.theme.colors.textOverPrimary};
  }
  & > small{
    font: inherit;
    opacity: 0.5;
  }
`;
export const CardBody = styled.div`
  padding: 25px 20px;
  font-size: 16px;
  color: ${p => p.theme.colors.text};
  [data-primary=true] &{
    color: ${p => p.theme.colors.textOverPrimary};
  }
`;
export const CardFooter = styled.div`
  background-color: #0002;
  font-size: 16px;
  font-weight: 400;
  line-height: 52px;
  text-align: right;
  padding: 0 25px;
  & a:hover{
    text-decoration: underline;
  }
  & i{
    font-size: 24px;
    color: ${p => p.theme.colors.gray3};
    margin-left: 8px;
  }
  & *{
    vertical-align: middle;
  }
  & > small{
    font-size: 12px;
    color: ${p => p.theme.colors.gray3};
    & i{
      font-size: 18px;
    }
  }
  color: ${p => p.theme.colors.text};
  [data-primary=true] &{
    color: ${p => p.theme.colors.textOverPrimary};
  }
`;

export const CardSectionTitle = styled.div`
  padding-bottom: 18px;
  border-bottom: 1px solid ${p => p.theme.colors.text};
  [data-primary=true] &{
    border-bottom-color: ${p => p.theme.colors.textOverPrimary};
  }
  
  display: grid;
  grid-template-columns: 1fr 1fr;
  & > :last-child{
    text-align: right;
  }
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
