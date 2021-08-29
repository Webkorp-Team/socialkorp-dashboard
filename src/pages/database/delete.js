import DeleteItemTemplate from 'templates/Database/DeleteItem';
import { useEffect, useMemo, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import PasswordConfirmation from 'components/PasswordConfirmation';
import Api from 'api/Api';
import config from 'api/website.config.json';


export default function DeleteItem(){

  const router = useRouter();
  
  const {
    table: listName,
    record: itemId,
    data: itemData
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
    if(itemData){
      try{
        setItem(JSON.parse(itemData));
      }catch(e){
        router.replace(listingPage);
      }
      return;
    }
    
    Api.get('/list/item',{
      listName,
      itemId
    }).then(item => {
      setItem(item);
    }).catch(()=>{
      router.replace(listingPage);
    });
  },[router,listName,itemId,itemData,listingPage]);

  const listSchema = useMemo(()=>(
    !listName ? null : config.lists.filter( ({name}) => name === listName )[0]
  ),[listName]);

  const [showPwConfirmation, setShowPwConfirmation] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const doDelete = useCallback(()=>{
    setDisabled(true);
    Api.delete('/list/item',{
      listName,
      itemId,
    }).then(()=>{
      router.push(listingPage);
    }).catch(()=>{
      setDisabled(false);
    }); 
  },[
    setDisabled,
    item,
  ]);

  const handleSubmit = useCallback(()=>{
    if(Api.elevated())
      doDelete();
    else{
      setDisabled(true);
      setTimeout(()=>{
        setShowPwConfirmation(true);
      },500);
    }
  },[setShowPwConfirmation,setDisabled,doDelete]);
  const handleCancel = useCallback((e)=>{
    router.push(listingPage);
  },[router]);
  const handlePwCancel = useCallback((e)=>{
    setDisabled(false);
    setShowPwConfirmation(false);
  },[setShowPwConfirmation,setDisabled]);
  const handlePwSubmit = useCallback(()=>{
    setShowPwConfirmation(false);
    doDelete();
  },[
    setShowPwConfirmation,
    doDelete
  ]);


  return <>
    {showPwConfirmation ? <PasswordConfirmation
      onCancel={handlePwCancel}
      onLogin={handlePwSubmit}
    /> : null}
      {!item ? null : <DeleteItemTemplate disabled={disabled} onCancel={handleCancel} onSubmit={handleSubmit} listSchema={listSchema} item={item}/>}
  </>;

}

DeleteItem.getInitialProps = async ({query})=>({query});
