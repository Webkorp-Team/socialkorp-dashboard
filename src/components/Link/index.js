import { useRouter } from 'next/router'
import { useCallback } from 'react';


export default function Link({href,...props}){
  const router = useRouter();

  const handleClick = useCallback((ev)=>{
    ev.preventDefault();
    router.push(href);
  },[router,href]);

  return <a onClick={handleClick} href={href} {...props}/>
}
