import styled from "styled-components";

const WorkspaceSectionTitle = styled.h2`
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  color: ${p => p.theme.colors.text};

  padding-bottom: 12px;
  border-bottom: 1px solid ${p => p.theme.colors.gray1};

  margin-top: 24px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  & > *{
    display: flex;
    align-items: end;
  }
  & > :nth-child(2){
    justify-content: flex-end;
    padding-bottom: 2px;
  }
`;
export default WorkspaceSectionTitle;
