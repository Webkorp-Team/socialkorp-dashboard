import { useState, useCallback, useMemo, useEffect } from 'react';
import * as S from './styles';
import Api from 'api/api';
import { useRouter } from 'next/router';

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

  const [userData, setUserData] = useState(null);

  const userPage = useCallback((mode)=>()=>{
    router.push({
      pathname: `/${mode}`,
      query:{
        user: JSON.stringify({
          email: Api.currentUser(),
          userData
        })
      },
    },`/${mode}`);
  },[router,userData]);

  useEffect(()=>{
    Api.get('/user/current').then(({userData}) => {
      setUserData(userData);
    }).catch(()=>{});
  },[setUserData]);

  const name = useMemo(()=>{
    if(!userData || !userData.firstName)
      return Api.currentUser();
    else return `${userData.firstName} ${userData.lastName}`;
  },[userData]);

  const initials = useMemo(()=>{
    if(!userData)
      return null;
    else if(!userData.firstName)
      return Api.currentUser().substr(0,1);
    else return `${(userData.firstName||'').substr(0,1)}${(userData.lastName||'').substr(0,1)}`;
  },[userData]);

  return <S.Root>
    <S.AppTitle>
      Future HealthSpaces
    </S.AppTitle>
    <S.RightSideLayout>
      <S.UserAvatar>{initials}</S.UserAvatar>
      <S.ExpansiveSection data-collapse={collapse}>
        <S.UserName>{name}</S.UserName>
        <S.Menu>
          <S.MenuItem onClick={userPage('profile')}>Profile</S.MenuItem>
          <S.MenuItem onClick={userPage('password')}>Password</S.MenuItem>
          <S.MenuItem data-disabled={logout} onClick={logout}>Logout</S.MenuItem>
        </S.Menu>
      </S.ExpansiveSection>
      <S.ExpandButton data-collapse={collapse} onClick={()=>setCollapse(x=>!x)}/>
    </S.RightSideLayout>
  </S.Root>;
}
