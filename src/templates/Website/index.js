import WorkspaceSectionTitle from "components/WorkspaceSectionTitle";
import WorkspaceTitle from "components/WorkspaceTitle";
import WorkspaceRoot from 'components/WorkspaceRoot';
import { useEffect,useRef,useState,useCallback } from 'react';
import * as S from './styles';
import Link from "next/link";
import ProgressBar from "components/ProgressBar";
import styled, { withTheme } from 'styled-components';
import Meta from "./Meta";

function _Website({
  pageName,
  pageTitle,
  url,
  modified,
  disabled=false,
  saved=false,
  onSave=()=>{},
  onDiscard=()=>{},
  meta={},
  commonMeta={},
  onMetaChange=(meta)=>{},
  iframeRef,
  ready=true,
  theme
}){

  const [tab, setTab] = useState('preview'); // preview | meta

  const handleCtrlS = useCallback(e => {
    if(e.key !== 's' || !e.ctrlKey)
      return true;
    e.preventDefault();
    if(modified && !disabled)
      onSave(e);
    return false;
  },[modified,disabled,onSave]);

  return <WorkspaceRoot onKeyDown={handleCtrlS}>
    <WorkspaceTitle>{pageTitle}</WorkspaceTitle>
    <WorkspaceSectionTitle>
      <div>
        <S.SectionLink onClick={()=>setTab('preview')} data-active={tab === 'preview'}>
          Page preview
        </S.SectionLink>
        <S.SectionLink onClick={()=>setTab('meta')} data-active={tab === 'meta'}>
          SEO + meta tags
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
    <S.Iframe data-visible={ready && tab === 'preview'} ref={iframeRef} src={`${url}/preview?page=${pageName}&bg=${encodeURIComponent(theme.colors.contentBackground)}`}/>
    <Meta visible={ready && tab === 'meta'} meta={meta} commonMeta={commonMeta} onChange={onMetaChange}/>
  </WorkspaceRoot>;
}

const Website = withTheme(_Website);
export default Website;
