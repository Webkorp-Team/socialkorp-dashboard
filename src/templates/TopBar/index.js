import { useState, useCallback } from 'react';
import * as S from './styles';
import Api from 'api/api';
import { useRouter } from 'next/router';

export default function TopBar({
  ...props
}){

  const [collapse, setCollapse] = useState(true);

  const router = useRouter();

  const logout = useCallback(()=>{
    Api.logout();
  },[router]);

  return <S.Root>
    <S.AppTitle>
      Future HealthSpaces
    </S.AppTitle>
    <S.RightSideLayout>
      <S.UserAvatar>A</S.UserAvatar>
      <S.ExpansiveSection data-collapse={collapse}>
        <S.UserName>Adminstrator</S.UserName>
        <S.Menu>
          <S.MenuItem>Profile</S.MenuItem>
          <S.MenuItem>Password</S.MenuItem>
          <S.MenuItem onClick={logout}>Logout</S.MenuItem>
        </S.Menu>
      </S.ExpansiveSection>
      <S.ExpandButton data-collapse={collapse} onClick={()=>setCollapse(x=>!x)}/>
    </S.RightSideLayout>
  </S.Root>;
}
