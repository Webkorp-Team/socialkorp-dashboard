import WorkspaceSectionTitle from "components/WorkspaceSectionTitle";
import WorkspaceTitle from "components/WorkspaceTitle";
import WorkspaceRoot from 'components/WorkspaceRoot';
import { useEffect,useState } from 'react';
import * as S from './styles';
import Link from "next/link";
import ProgressBar from "components/ProgressBar";
import styled, { withTheme } from 'styled-components';

function _Website({
  pageName,
  pageTitle,
  url,
  modified,
  disabled=false,
  saved=false,
  onSave=()=>{},
  onDiscard=()=>{},
  iframeRef,
  ready=true,
  theme
}){

  return <WorkspaceRoot>
    <WorkspaceTitle>{pageTitle}</WorkspaceTitle>
    <WorkspaceSectionTitle>
      <div>
        <S.SectionLink data-active={true}>
          Editor
        </S.SectionLink>
      </div>
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
    <S.Iframe data-visible={ready} ref={iframeRef} src={`${url}/preview?page=${pageName}&bg=${encodeURIComponent(theme.colors.contentBackground)}`}/>
  </WorkspaceRoot>;
}

const Website = withTheme(_Website);
export default Website;
