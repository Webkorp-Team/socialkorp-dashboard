import { useState, useCallback, useMemo } from 'react';
import * as S from './styles';
import Api from 'api/Api';
import { useRouter } from 'next/router';
import useCurrentUser from 'use-current-user';
import config from "api/website.config.json";

export default function TopBar({
  ...props
}){

  const [collapse, setCollapse] = useState(true);

  const router = useRouter();

  const [logoutDisabled, setLogoutDisabled] = useState(false);

  const logout = useCallback(()=>{
    setLogoutDisabled(true);
    Api.logout().catch(()=>{
      setLogoutDisabled(false);
    });
  },[router,setLogoutDisabled]);

  const userPage = useCallback((mode)=>()=>{
    router.push(`/${mode}`);
  },[router]);

  const user = useCurrentUser();

  const name = useMemo(()=>{
    if(!user.userData || (
      !user.userData.firstName
      && !user.userData.lastName
    ))
      return user.email;
    else return `${user.userData.firstName} ${user.userData.lastName}`;
  },[user]);

  const initials = useMemo(()=>{
    if(!user.userData)
      return null;
    else if(
      !user.userData.firstName
      && !user.userData.lastName
    )
      return user.email.substr(0,1);
    else
      return `${(user.userData.firstName||'').substr(0,1)}${(user.userData.lastName||'').substr(0,1)}`;
  },[user]);

  return <S.Root>
    <S.AppTitle>
      {config.dashboard.title}
    </S.AppTitle>
    <S.RightSideLayout>
      <S.UserAvatar>{initials}</S.UserAvatar>
      <S.ExpansiveSection data-collapse={collapse}>
        <S.UserName>{name}</S.UserName>
        <S.Menu>
          <S.MenuItem onClick={userPage('profile')}>Profile</S.MenuItem>
          <S.MenuItem onClick={userPage('password')}>Password</S.MenuItem>
          <S.MenuItem data-disabled={logoutDisabled} onClick={logout}>Logout</S.MenuItem>
        </S.Menu>
      </S.ExpansiveSection>
      <S.ExpandButton data-collapse={collapse} onClick={()=>setCollapse(x=>!x)}/>
    </S.RightSideLayout>
  </S.Root>;
}
