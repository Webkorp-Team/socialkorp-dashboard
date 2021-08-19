import Api from "api/Api";
import config from "api/website.config.json";
import PasswordConfirmation from "components/PasswordConfirmation";
import { useRouter } from "next/router";
import { useEffect, useMemo, useCallback, useState, useRef } from "react";
import WebsiteTemplate from 'templates/Website';

export default function Website(){
  
  const router = useRouter();

  const {
    page: pageName,
    section: sectionName
  } = router.query;

  const {page,section,sections} = useMemo(()=>{
    if(!pageName || !sectionName)
      return {};
    const page = config.pages.filter( ({name}) => name === pageName )[0];
    const section = page?.sections.filter( ({name}) => name === sectionName )[0];
    return {
      page,
      section,
      sections: page?.sections
    };
  },[pageName,sectionName]);

  useEffect(()=>{
    if(!router.isReady)
      return;
    if(!pageName || !sectionName || !page || !section){
      window.location = '/';
      return;
    }
  },[router.isReady,pageName,sectionName]);

  const [editorState, setEditorState] = useState(null);

  useEffect(()=>{
    const listener = (ev)=>{
      if(ev.origin !== config.url){
        console.log(`Expected origin ${config.url}, got ${ev.origin}`);
        return;
      }
      setEditorState(ev.data);
    };
    window.addEventListener('message',listener);
    return ()=> {
      window.removeEventListener('message',listener);
    };
  },[]);

  const [disabled, setDisabled] = useState(false);
  const [showPwConfirmation, setShowPwConfirmation] = useState(false);
  const iframeRef = useRef();

  const put = useCallback(()=>{
    if(!Api.elevated()){
      setDisabled(true);
      setTimeout(()=>{
        setShowPwConfirmation(true);
      },500);
      return;
    }

    setDisabled(true);

    Api.put('/website/page',{
      name: pageName,
      data: editorState.draft
    }).then(()=>{
      setDisabled(false);
      setEditorState(null);
      if(iframeRef.current)
        iframeRef.current.contentWindow.postMessage('save','*');
    }).catch(()=>{
      window.location.reload();
    }); 
  },[
    pageName,
    editorState,
    iframeRef
  ]);


  const handlePwCancel = useCallback((e)=>{
    setDisabled(false);
    setShowPwConfirmation(false);
  },[]);
  const handlePwSubmit = useCallback(()=>{
    setShowPwConfirmation(false);
    put();
  },[put]);

  const handleDiscard = useCallback(()=>{
    setEditorState(null);
    if(iframeRef.current)
      iframeRef.current.contentWindow.postMessage('discard','*');
  },[iframeRef]);
  const handleSave = useCallback(()=>{
    if(editorState)
      return put();
    else{
      setDisabled(true);
      setTimeout(()=>setDisabled(false),500);
    }
  },[editorState,put]);


  return <>

    {showPwConfirmation ? <PasswordConfirmation
      onCancel={handlePwCancel}
      onLogin={handlePwSubmit}
    /> : null}

    {(page && section) ? <WebsiteTemplate
      iframeRef={iframeRef}
      pageName={page.name}
      pageTitle={page.title}
      sectionName={section.name}
      sections={sections}
      url={config.url}
      modified={editorState !== null}
      disabled={disabled}
      onSave={handleSave}
      onDiscard={handleDiscard}
    /> : null}

  </>;
}
