import WorkspaceSectionTitle from "components/WorkspaceSectionTitle";
import WorkspaceTitle from "components/WorkspaceTitle";
import WorkspaceRoot from 'components/WorkspaceRoot';
import { useEffect,useState } from 'react';
import * as S from './styles';
import Link from "next/link";

export default function Website({
  pageName,
  pageTitle,
  sectionName,
  sections=[],
  url,
  modified=false,
  disabled=false,
  onSave=()=>{},
  onDiscard=()=>{},
  iframeRef,
}){
  
  // prevent iframe from rendering server side (do we need this?)
  const [showIframe, setShowIframe] = useState(false);
  useEffect(()=>{
    setShowIframe(true);
  },[setShowIframe]);

  return <WorkspaceRoot>
    <WorkspaceTitle>{pageTitle}</WorkspaceTitle>
    <WorkspaceSectionTitle>
      <div>{sections.map(section => (
        <Link href={`/website?page=${pageName}&section=${section.name}`}>
          <S.SectionLink data-active={section.name === sectionName} key={section.name}>
            {section.title}
          </S.SectionLink>
        </Link>
      ))}</div>
      <div>
        <S.ActionButton disabled={disabled} data-noclick={!modified} onClick={onSave}>
          {modified ? <>Save changes</> : <>Published</>}
        </S.ActionButton>  
        <S.ActionButton disabled={disabled || !modified} variant="secondary" onClick={onDiscard}>
          Discard changes
        </S.ActionButton>  
      </div>
    </WorkspaceSectionTitle>
    {showIframe ? <S.Iframe ref={iframeRef} src={`${url}/preview?page=${pageName}&section=${sectionName}`}/> : null}
  </WorkspaceRoot>;
}
