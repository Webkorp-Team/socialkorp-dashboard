import styled from "styled-components";


export const Root = styled.div`
  background-color: ${p => p.theme.colors.contentBackground};
  height: 100vh;
  max-height: 100vh;
`;
export const Content = styled.div`
  overflow-y: scroll;
  padding-bottom: 80px;
`;
export const MenuWrapperGrid = styled.div`
  display: grid;
  grid-template-columns: 317px 1fr;
  height: calc(100vh - 64px);
`;
