import Api from 'api/api';
import { useEffect } from 'react';
import AppFrame from 'templates/AppFrame';
import DashboardTemplate from 'templates/Dashboard';

export default function Dashboard(){

  useEffect(()=>{
    Api.get('/ping').then(()=>{}).catch(()=>{});
  },[]);

  return <DashboardTemplate/>;
}
