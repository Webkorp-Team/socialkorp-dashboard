import WorkspaceSectionTitle from "components/WorkspaceSectionTitle";
import WorkspaceTitle from "components/WorkspaceTitle";
import WorkspaceRoot from 'components/WorkspaceRoot';
import { useEffect,useState } from 'react';
import * as S from './styles';
import Link from "next/link";
import ProgressBar from "components/ProgressBar";

export default function Website({
  pageName,
  pageTitle,
  sectionName,
  sections=[],
  url,
  modifiedSections={},
  disabled=false,
  saved=false,
  onSave=()=>{},
  onDiscard=()=>{},
  iframeRef,
  ready=true,
}){

  const modified = modifiedSections[sectionName];

  return <WorkspaceRoot>
    <WorkspaceTitle>{pageTitle}</WorkspaceTitle>
    <WorkspaceSectionTitle>
      <div>{sections.map(section => (
        <Link key={section.name} href={`/website?page=${pageName}&section=${section.name}`}>
          <S.SectionLink data-modified={modifiedSections[section.name]} data-active={section.name === sectionName} key={section.name}>
            {section.title}
            {modifiedSections[section.name] ? <> * </> :null}
          </S.SectionLink>
        </Link>
      ))}</div>
      <div>
        <S.ActionButton disabled={disabled} data-noclick={!modified} onClick={onSave}>
          {modified ? disabled ? <>Saving</> : <>Save changes</> : saved ? <>Saved</> : null}
        </S.ActionButton>  
        <S.ActionButton disabled={disabled || !modified} variant="secondary" onClick={onDiscard}>
          Discard changes
        </S.ActionButton>  
      </div>
    </WorkspaceSectionTitle>
    { !ready ? <ProgressBar/> : null }
    <S.Iframe data-visible={ready} ref={iframeRef} src={`${url}/preview?page=${pageName}&section=${sectionName}`}/>
  </WorkspaceRoot>;
}
