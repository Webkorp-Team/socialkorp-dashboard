import styled, { keyframes } from 'styled-components';


const animation = keyframes`

  0%{
    justify-content: flex-start;
    padding-right: 100%;
    padding-left: 0%;
  }
  50%{
    justify-content: flex-end;
    padding-right: 0%;
    padding-left: 0%;
  }
  100%{
    justify-content: flex-end;
    padding-left: 100%;
    padding-right: 0;
  }

`;

export const ProgressBar = styled.div`

  display: flex;

  width: 100%;
  height: 6px;
  background-color: ${p => p.theme.colors.gray1};

  margin: 40px 0;

  animation: 1s linear 0s infinite running ${animation};

`;

export const Indicator = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${p => p.theme.colors.primary};
`;
