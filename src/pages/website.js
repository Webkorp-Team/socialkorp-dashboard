import Api from "api/Api";
import config from "api/website.config.json";
import PasswordConfirmation from "components/PasswordConfirmation";
import { useRouter } from "next/router";
import { useEffect, useMemo, useCallback, useState, useRef } from "react";
import WebsiteTemplate from 'templates/Website';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Website(){
  
  const router = useRouter();

  const {
    page: pageName,
    section: sectionName
  } = router.query;

  const {pageInfo,sectionInfo,sections} = useMemo(()=>{
    if(!pageName || !sectionName)
      return {};
    const pageInfo = config.pages.filter( ({name}) => name === pageName )[0];
    const sectionInfo = pageInfo?.sections.filter( ({name}) => name === sectionName )[0];
    return {
      pageInfo,
      sectionInfo,
      sections: pageInfo?.sections
    };
  },[pageName,sectionName]);

  const [saved, setSaved] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [publishedState, setPublishedState] = useState(null);
  const [editorState, setEditorState] = useState({});

  const modifiedSections = useMemo(()=>{
    const obj = {};
    Object.keys(editorState).forEach(key => obj[key] = true);
    return obj;
  },[editorState]);

  const postSectionState = useCallback((sectionState)=>{
    iframeRef.current.contentWindow.postMessage({
      setState: true,
      sectionState
    },'*');
  },[iframeRef]);

  const updatePublishedState = useCallback(()=>{
    Api.get('/website/page',{name:pageName}).then((state)=>{
      setPublishedState(state)
    });
  },[pageName]);

  const [firstStatePosted, setFirstStatePosted] = useState(false);

  useEffect(()=>{
    setPublishedState(null);
    setEditorState({});
  },[pageName]);

  useEffect(()=>{
    if(!router.isReady)
      return;
    if(!pageName || !sectionName || !pageInfo || !sectionInfo){
      window.location = '/';
      return;
    }
    setSaved(false);
    setPreviewReady(false);
    setFirstStatePosted(false);
    updatePublishedState();
  },[router.isReady,pageName,sectionName,pageInfo,sectionInfo]);

  useEffect(()=>{
    if(!previewReady || !publishedState)
      return;
    if(firstStatePosted.current)
      return;
    setFirstStatePosted(true);
    postSectionState(editorState[sectionName] || publishedState[sectionName]);
  },[previewReady,firstStatePosted,sectionName,publishedState,editorState]);

  useEffect(()=>{
    const listener = (ev)=>{
      if(ev.origin !== config.url){
        console.log(`Expected origin ${config.url}, got ${ev.origin}`);
        return;
      }
      if(ev.data === 'ready'){
        setPreviewReady(true);
      }else if(ev.data.state)
        setEditorState(state => ({
          ...state,
          [sectionName]: ev.data.state.sectionDraft,
        }));
    };
    window.addEventListener('message',listener);
    return ()=> {
      window.removeEventListener('message',listener);
    };
  },[sectionName,editorState,publishedState]);

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

    const compiledState = {
      ...publishedState,
      ...editorState
    };

    Api.put('/website/page',{
      name: pageName,
      data: compiledState
    }).then(()=>{
      setPublishedState(editorState);
      setEditorState({});
      setDisabled(false);
      setSaved(true);
      updatePublishedState();
    }).catch(()=>{
      setDisabled(false);
      setSaved(false);
    }); 
  },[
    pageName,
    editorState,
    publishedState,
    pageName,
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
    const newState = {
      ...editorState
    };
    delete newState[sectionName];
    setEditorState(newState);
    setSaved(false);
    postSectionState(publishedState[sectionName]);
  },[sectionName,editorState]);
  const handleSave = useCallback(()=>{
    if(editorState)
      return put();
  },[editorState,put]);

  return <>

    {showPwConfirmation ? <PasswordConfirmation
      onCancel={handlePwCancel}
      onLogin={handlePwSubmit}
    /> : null}

    {(pageInfo && sectionInfo) ? <WebsiteTemplate
      iframeRef={iframeRef}
      pageName={pageInfo.name}
      pageTitle={pageInfo.title}
      sectionName={sectionInfo.name}
      sections={sections}
      url={config.url}
      modifiedSections={modifiedSections}
      disabled={disabled}
      saved={saved}
      onSave={handleSave}
      onDiscard={handleDiscard}
      ready={Boolean(previewReady && publishedState)}
    /> : null}

  </>;
}
