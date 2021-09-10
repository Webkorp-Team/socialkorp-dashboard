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

const url = (process.env.NODE_ENV === 'development' ? config.devUrls.website : null) || config.deploy.url;

export default function Website(){

  const router = useRouter();

  const {
    page: pageName,
  } = router.query;

  const pageInfo = useMemo(()=>(
    !pageName ? null : config.pages.filter( ({name}) => name === pageName )[0]
  ),[pageName]);

  const [saved, setSaved] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [publishedState, setPublishedState] = useState(null);
  const [editorState, setEditorState] = useState(null);

  const modified = editorState !== null;

  const postPageState = useCallback((pageState)=>{
    iframeRef.current.contentWindow.postMessage({
      setState: true,
      pageState
    },'*');
  },[iframeRef]);

  const [commonMeta, setCommonMeta] = useState(undefined);
  useEffect(()=>{
    if(!pageName)
      return;
    Api.get('/website/page',{name:'common'}).then(state => {
      setCommonMeta(state.meta || {});
    });
  },[pageName]);

  const handleMetaChange = useCallback(meta => {
    const newState = {
      ...(editorState || publishedState),
      meta
    };
    setEditorState(newState);
    postPageState(newState);
  },[editorState,postPageState]);

  const meta = useMemo(()=>(
    editorState?.meta || publishedState?.meta || {}
  ),[editorState,publishedState]);

  const updatePublishedState = useCallback(()=>{
    Api.get('/website/page',{name:pageName}).then((state)=>{
      setPublishedState(state)
    });
  },[pageName]);

  const [firstStatePosted, setFirstStatePosted] = useState(false);

  useEffect(()=>{
    setPublishedState(null);
    setEditorState(null);
  },[pageName]);

  useEffect(()=>{
    if(!router.isReady)
      return;
    if(!pageName || !pageInfo){
      window.location = '/';
      return;
    }
    setSaved(false);
    setPreviewReady(false);
    setFirstStatePosted(false);
    updatePublishedState();
  },[router.isReady,pageName,pageInfo]);

  useEffect(()=>{
    if(!previewReady || !publishedState)
      return;
    if(firstStatePosted)
      return;
    setFirstStatePosted(true);
    postPageState(editorState || publishedState);
  },[previewReady,firstStatePosted,publishedState,editorState]);

  useEffect(()=>{
    const listener = (ev)=>{
      if(ev.origin !== url){
        console.log(`Expected origin ${url}, got ${ev.origin}`);
        return;
      }
      if(ev.data === 'ready')
        setPreviewReady(true);
      else if(ev.data.location && ev.data.location.startsWith('/')){
        router.push(ev.data.location);
      }else if(ev.data.state)
        setEditorState(ev.data.state.pageDraft);
      else if(ev.data.save && modified && !disabled)
        handleSave(ev);
    };
    window.addEventListener('message',listener);
    return ()=> {
      window.removeEventListener('message',listener);
    };
  },[editorState,publishedState,iframeRef,router,modified,disabled,handleSave]);

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
      setEditorState(null);
      setPublishedState(compiledState);
      setDisabled(false);
      setSaved(true);
      updatePublishedState();
    }).catch((e)=>{
      if(e.forbidden)
        return put();
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
    setEditorState(null);
    setSaved(false);
    postPageState(publishedState);
  },[publishedState]);
  const handleSave = useCallback(()=>{
    if(editorState)
      return put();
  },[editorState,put]);

  return <>

    {showPwConfirmation ? <PasswordConfirmation
      onCancel={handlePwCancel}
      onLogin={handlePwSubmit}
    /> : null}

    {(pageInfo) ? <WebsiteTemplate
      iframeRef={iframeRef}
      pageName={pageInfo.name}
      pageTitle={pageInfo.title}
      url={url}
      modified={modified}
      disabled={disabled}
      saved={saved}
      onSave={handleSave}
      onDiscard={handleDiscard}
      meta={meta}
      commonMeta={commonMeta}
      onMetaChange={handleMetaChange}
      ready={Boolean(commonMeta && previewReady && publishedState)}
    /> : null}

  </>;
}
