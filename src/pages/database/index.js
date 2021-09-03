import Api from 'api/Api';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import DatabaseTemplate from 'templates/Database';
import config from 'api/website.config.json';

const cache = {};

export default function Database(){

  const router = useRouter();

  const {
    table: listName,
  } = router.query;

  const listSchema = useMemo(()=>(
    !listName ? null : config.lists.filter( ({name}) => name === listName )[0]
  ),[listName]);
  
  const [items, setItems] = useState();

  const [noonce, setNoonce] = useState(0);

  useEffect(()=>{
    if(!listName)
      return;
    setItems(items => cache[listName] || null);
    var timeout;
    Api.get('/list/index',{listName}).then(list => {
      setItems(list);
      cache[listName] = list;
      timeout = setTimeout(()=>{
        setNoonce(x=>x+1);
      },5000);
    }).catch(()=>{});
    return ()=>{
      clearTimeout(timeout);
    };
  },[listName,noonce]);

  return !listSchema ? null : <>
    <DatabaseTemplate items={items} listSchema={listSchema}/>
  </>
}

Database.getInitialProps = async ({query})=>({query});
