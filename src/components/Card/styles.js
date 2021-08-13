import styled from 'styled-components';

export const Card = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
  border-radius: 2px;
  background-color: ${p => p.theme.colors.cardBackground};
  &[data-variant=primary]{
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
  [data-variant=primary] &{
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
  [data-variant=primary] &{
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
  & i{
    font-size: 24px;
    margin-left: 8px;
  }
  & a i{
    cursor: inherit;
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
  color: ${p => p.theme.colors.lightText};
  [data-variant=primary] &{
    color: ${p => p.theme.colors.lightTextOverPrimary};
    & i{
      color: ${p => p.theme.colors.lightTextOverPrimary};
    }
  }
  & a:hover{
    color: ${p => p.theme.colors.text};
    & i{
      color: ${p => p.theme.colors.text};
    }
  }
  &[data-variant=primary] a:hover{
    color: ${p => p.theme.colors.textOverPrimary};
    & i{
      color: ${p => p.theme.colors.textOverPrimary};
    }
  }
`;
export const CardSectionTitle = styled.div`
  padding-bottom: 18px;
  border-bottom: 1pxc solid ${p => p.theme.colors.lightText};
  [data-variant=primary] &{
    border-bottom-color: ${p => p.theme.colors.lightTextOverPrimary};
  }
  
  display: grid;
  grid-template-columns: 1fr 1fr;
  & > :last-child{
    text-align: right;
  }
`;
