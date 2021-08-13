import styled from "styled-components";

const WorkspaceSectionTitle = styled.h2`
  font-size: 16px;
  line-height: 34px;
  font-weight: 600;
  color: ${p => p.theme.colors.text};

  padding-bottom: 10px;
  border-bottom: 1px solid ${p => p.theme.colors.gray1};

  margin-top: 24px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  & > :nth-child(2){
    display: flex;
    justify-content: flex-end;
  }
`;
export default WorkspaceSectionTitle;
