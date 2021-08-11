import { useEffect } from "react";

export default function Home({
  ...props
}) {
  

  useEffect(()=>{
    if(window.localStorage.getItem('email') !== 'admin@futurehealthspaces.com')
      window.location = '/login';
    else
      window.location = '/dashboard';
  },[])


  return <>

  </>;
}
