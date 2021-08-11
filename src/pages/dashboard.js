import { useEffect } from 'react';
import AppFrame from 'templates/AppFrame';
import DashboardTemplate from 'templates/Dashboard';

export default function Dashboard(){
  
  useEffect(()=>{
    if(window.localStorage.getItem('email') !== 'admin@futurehealthspaces.com')
      window.location = '/login';
  },[])

  return <AppFrame>
    <DashboardTemplate/>
  </AppFrame>
}
