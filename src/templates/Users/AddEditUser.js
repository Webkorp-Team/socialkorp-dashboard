import WorkspaceSectionTitle from 'components/WorkspaceSectionTitle';
import WorkspaceTitle from 'components/WorkspaceTitle';
import WorkspaceRoot from 'components/WorkspaceRoot';
import { useCallback, useState } from 'react';
import Card, { CardSectionTitle } from 'components/Card';
import * as S from './styles';
import TextField from 'components/TextField';
import Api from 'api/api';
import { useRouter } from 'next/router';
import ProgressBar from 'components/ProgressBar';

export default function AddEditUser({
  user,
  onSubmit=()=>{},
  onCancel=()=>{},
  disabled=false,
}){

  const [passwordError, setPasswordError] = useState(null);

  const handlePwChange = useCallback((e)=>{
    setPasswordError(null);
  },[setPasswordError]);
  const handleSubmit = useCallback((e)=>{
    e.preventDefault();
    const form = e.currentTarget;
    if(form.password.value !== form.passwordConfirmation.value){
      setPasswordError('Passwords do not match.');
      return false;
    }
    if(form.password.value.length && form.password.value.length < 8){
      setPasswordError('Passwords must be at least 8 characters long.');
      return false;
    }
    return onSubmit(e);
  },[onSubmit,setPasswordError]);
  const handleCancel = useCallback((e)=>{
    e.preventDefault();
    onCancel(e);
  },[onCancel]);

  const router = useRouter();

  const profile = router.asPath === '/profile';
  const password = router.asPath === '/password';

  return <WorkspaceRoot>
    <WorkspaceTitle>Users</WorkspaceTitle>
    <WorkspaceSectionTitle>
      {
        profile || password ? <>My profile</> :
        user ? <>Edit user</> : <>Add user</>
      }
    </WorkspaceSectionTitle>
    <S.Layout data-slim={profile||password}>{
      !user.email ? <ProgressBar/> : (
        <Card
          header={
            profile ? <>Edit profile</> :
            password ? <>Change password</> :
            <>Profile</>
          }
          footer={!user || profile || password ? null : user.email === Api.currentUser() ? (
            <S.FooterActionLink style={{pointerEvents:'none'}} as="span">
              This is your account
            </S.FooterActionLink>
          ):(
            <S.FooterActionLink
              href={{
                pathname: '/admin/users/delete',
                query:{
                  user: JSON.stringify(user)
                }
              }}
              displayHref={`/admin/users/delete?user=${user.email}`}
            >
              Delete account
            </S.FooterActionLink>
          )}
        >
          <S.CardLayout as="form" onSubmit={handleSubmit}>

            
            <div>
              <CardSectionTitle>
                Email
              </CardSectionTitle>
              <S.Spacer count={6}/>
              <TextField type="email" name="email" required={true} disabled={disabled} readOnly={Boolean(user)} defaultValue={user ? user.email : user} placeholder="E-mail"/>
            </div>

            {profile || password ? null : <div/>}

            {password ? <>
              <input type="hidden" name="firstName"  value={user.userData.firstName}/>
              <input type="hidden" name="lastName" value={user.userData.lastName}/>
            </> : <div>
              <CardSectionTitle>
                Name
              </CardSectionTitle>
              <S.Spacer count={6}/>
              <TextField disabled={disabled} name="firstName" placeholder="Given name" defaultValue={user ? user.userData.firstName : ''}/>
              <S.Spacer count={2}/>
              <TextField disabled={disabled} name="lastName" placeholder="Surname" defaultValue={user ? user.userData.lastName : ''}/>
              <S.Spacer count={2}/>
            </div>}

            {profile ? <>
              <input type="hidden" name="password" value=""/>
              <input type="hidden" name="passwordConfirmation" value=""/>
            </> : <div>
              <CardSectionTitle>
                Password
              </CardSectionTitle>
              <S.Spacer count={6}/>
              <TextField onFocus={handlePwChange} disabled={disabled} type="password" autoComplete="new-password" name="password" placeholder={user?"New password (no changes)":"Password (min 8 chars)"} required={!Boolean(user)}/>
              <S.Spacer count={2}/>
              <TextField onFocus={handlePwChange} disabled={disabled} type="password" autoComplete="new-password" name="passwordConfirmation" placeholder="Confirm password"/>
              <S.Spacer count={2}/>
              <S.FieldError>{passwordError}</S.FieldError>
            </div>}
            
            <div>
              {/* <S.Spacer count={6}/> */}
              <S.ActionButton disabled={disabled} variant="primary">
                {user ? <>Save changes</> : <>Add user</>}
              </S.ActionButton>
              <S.ActionButton disabled={disabled} onClick={handleCancel} variant="secondary">
                {user ? <>Discard changes</> : <>Cancel</>}
              </S.ActionButton>
            </div>
          </S.CardLayout>
        </Card>
      )
    }</S.Layout>
  </WorkspaceRoot>
}
