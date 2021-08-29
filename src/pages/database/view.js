import { useEffect, useMemo, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import ViewItem from 'templates/Database/ViewItem';
import PasswordConfirmation from 'components/PasswordConfirmation';
import Api from 'api/Api';
import config from 'api/website.config.json';

export default function View({}){

  const router = useRouter();
  
  const {
    table: listName,
    record: itemId,
  } = router.query;

  const listingPage = useMemo(()=>(
    `/database?table=${listName}`
  ),[listName]);

  const [item, setItem] = useState(null);

  useEffect(()=>{
    if(!router.isReady)
      return;
    if(!listName || !itemId){
      router.replace('/');
      return;
    }
    
    Api.get('/list/item',{
      listName,
      itemId
    }).then(item => {
      setItem(item);
    }).catch(()=>{});
  },[router,listName,itemId]);

  const listSchema = useMemo(()=>(
    !listName ? null : config.lists.filter( ({name}) => name === listName )[0]
  ),[listName]);
  
  const [showPwConfirmation, setShowPwConfirmation] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [form, setForm] = useState(null);

  useEffect(()=>{
    if(form)
      put();
  },[form]);

  const put = useCallback(()=>{
    
    if(!Api.elevated()){
      setDisabled(true);
      setTimeout(()=>{
        setShowPwConfirmation(true);
      },500);
      return;
    }

    const data = {};
    for(const property of listSchema.properties)
      data[property.name] = form[property.name]?.value;

    setDisabled(true);

    Api.put('/list/item',{
      listName,
      itemId,
      data
    }).then(()=>{
      router.push(listingPage);
    }).catch(()=>{
      setDisabled(false);
    }); 
  },[
    setDisabled,
    listName,
    itemId,
    listSchema,
    form,
  ]);


  const handleSubmit = useCallback((e)=>{
    setForm(e.currentTarget);
  },[setForm]);
  const handleCancel = useCallback((e)=>{
    router.push(listingPage);
  },[router]);
  const handlePwCancel = useCallback((e)=>{
    setDisabled(false);
    setShowPwConfirmation(false);
    setForm(null);
  },[setShowPwConfirmation,setForm,setDisabled]);
  const handlePwSubmit = useCallback(()=>{
    setShowPwConfirmation(false);
    put();
  },[
    setShowPwConfirmation,
    put
  ]);


  return <>
    
    {showPwConfirmation ? <PasswordConfirmation
      onCancel={handlePwCancel}
      onLogin={handlePwSubmit}
    /> : null}
    
    { !listSchema ? null : <ViewItem disabled={disabled} onCancel={handleCancel} onSubmit={handleSubmit} listSchema={listSchema} item={item} itemId={itemId}/> }
  </>;

}
