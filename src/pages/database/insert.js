import { useEffect, useMemo, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import PasswordConfirmation from 'components/PasswordConfirmation';
import Api from 'api/Api';
import ViewItem from 'templates/Database/ViewItem';
import config from 'api/website.config.json';


export default function InsertItem(){

  const router = useRouter();
  
  const {
    table: listName,
  } = router.query;

  const listingPage = useMemo(()=>(
    `/database?table=${listName}`
  ),[listName]);

  useEffect(()=>{
    if(!router.isReady)
      return;
    if(!listName){
      router.replace('/');
      return;
    }
  },[router,listName]);

  const listSchema = useMemo(()=>(
    !listName ? null : config.lists.filter( ({name}) => name === listName )[0]
  ),[listName]);

  const [showPwConfirmation, setShowPwConfirmation] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [form, setForm] = useState(null);

  const post = useCallback(()=>{
    const data = {};
    for(const property of listSchema.properties){
      console.log(property.name,form[property.name]);
      data[property.name] = form[property.name]?.value;
    }

    setDisabled(true);

    Api.post('/list/item',{
      listName,
      data
    }).then(()=>{
      router.push(listingPage);
    }).catch(()=>{
      setDisabled(false);
    }); 
  },[
    setDisabled,
    form,
    listSchema,
    listName,
    listingPage
  ]);

  useEffect(()=>{
    if(!form)
      return;
    if(Api.elevated())
      post();
    else{
      setDisabled(true);
      setTimeout(()=>{
        setShowPwConfirmation(true);
      },500);
    }
  },[form,setShowPwConfirmation,setDisabled]);

  const handleSubmit = useCallback((e)=>{
    setForm(e.currentTarget);
  },[setForm]);
  const handleCancel = useCallback((e)=>{
    router.push(listingPage);
  },[router,listingPage]);
  const handlePwCancel = useCallback((e)=>{
    setDisabled(false);
    setShowPwConfirmation(false);
    setForm(null);
  },[setShowPwConfirmation,setForm,setDisabled]);
  const handlePwSubmit = useCallback(()=>{
    setShowPwConfirmation(false);
    post();
  },[
    setShowPwConfirmation,
    post
  ]);


  return <>
    {showPwConfirmation ? <PasswordConfirmation
      onCancel={handlePwCancel}
      onLogin={handlePwSubmit}
    /> : null}
    {!listSchema ? null : <ViewItem disabled={disabled} onCancel={handleCancel} onSubmit={handleSubmit} item={null} listSchema={listSchema}/>}
  </>;

}

InsertItem.getInitialProps = async ({query})=>({query});
