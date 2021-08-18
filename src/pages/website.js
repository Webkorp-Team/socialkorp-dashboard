import WorkspaceSectionTitle from "components/WorkspaceSectionTitle";
import WorkspaceTitle from "components/WorkspaceTitle";
import WorkspaceRoot from 'components/WorkspaceRoot';
import styled from "styled-components";
import { useEffect,useState } from 'react';
import Button from "components/Button";

const Iframe = styled.iframe`
  margin-top: 30px;
  /* margin-left: 40px; */
  width: calc(100%);
  height: calc(100vh);
`;
const ActionButton = styled(Button)`
  max-width: 150px;
  & + &{
    margin-left: 20px;
    max-width: 180px;
  }
`;

export default function Website(){
  const [showIframe, setShowIframe] = useState(false);
  useEffect(()=>{
    setShowIframe(true);
  },[setShowIframe]);

  return <WorkspaceRoot>
    <WorkspaceTitle>Homepage</WorkspaceTitle>
    <WorkspaceSectionTitle><div>Header</div><div>
      <ActionButton>Save changes</ActionButton>  
      <ActionButton variant="secondary">Discard changes</ActionButton>  
    </div></WorkspaceSectionTitle>
    {showIframe ? <Iframe src="/site/index.html"/> : null}
  </WorkspaceRoot>;

  return null;
}
