import WorkspaceSectionTitle from 'components/WorkspaceSectionTitle';
import WorkspaceTitle from 'components/WorkspaceTitle';
import WorkspaceRoot from 'components/WorkspaceRoot';
import { useCallback, useState, useMemo } from 'react';
import Card, { CardSectionTitle } from 'components/Card';
import * as S from './styles';
import TextField from 'components/TextField';

export default function DeleteUser({
  user,
  onSubmit=()=>{},
  onCancel=()=>{},
  disabled=false,
}){

  const [showConfirmationError, setShowConfirmationError] = useState(false);
  
  const handleConfirmationChange = useCallback((e)=>{
    setShowConfirmationError(false);
  },[setShowConfirmationError]);
  const handleSubmit = useCallback((e)=>{
    e.preventDefault();
    const form = e.currentTarget;
    if(form.confirmation.value.trim().toLowerCase() !== 'delete'){
      setShowConfirmationError(true);
      return false;
    }
    return onSubmit(e);
  },[onSubmit,setShowConfirmationError]);
  const handleCancel = useCallback((e)=>{
    e.preventDefault();
    onCancel(e);
  },[onCancel]);

  const name = useMemo(()=>{
    if(!user.userData || !user.userData.firstName)
      return user.email;
    else return `${user.userData.firstName} ${user.userData.lastName}`;
  },[user]);

  return <WorkspaceRoot>
    <WorkspaceTitle>{name}</WorkspaceTitle>
    <WorkspaceSectionTitle>
      Account
    </WorkspaceSectionTitle>
    <S.Layout>

    <Card
      header={<>Delete account</>}
    >
      <S.CardLayout as="form" onSubmit={handleSubmit}>

        <div>
          <CardSectionTitle>
            Name
          </CardSectionTitle>
          <S.Spacer count={4}/>
          <TextField readOnly={true} name="firstName" placeholder="No given names set" defaultValue={user ? user.userData.firstName : ''}/>
          <S.Spacer count={2}/>
          <TextField readOnly={true} name="lastName" placeholder="No surname set" defaultValue={user ? user.userData.lastName : ''}/>
        </div>
        
        <div>
          <CardSectionTitle>
            Email
          </CardSectionTitle>
          <S.Spacer count={4}/>
          <TextField readOnly={true} name="email" defaultValue={user ? user.email : user} placeholder="E-mail"/>
        </div>

        <div>
          <CardSectionTitle>
            Confirmation
          </CardSectionTitle>
          <S.Spacer count={4}/>
          <S.HelpText>
            To permanently delete this account, type the word "delete" in the box below.
            <br/><br/>
            This action is irreversible!
          </S.HelpText>
          <S.Spacer count={4}/>
          <TextField required={true} disabled={disabled} name="confirmation" placeholder='Type "delete"' autoComplete="off" onFocus={handleConfirmationChange}/>
          <S.Spacer count={2}/>
          <S.FieldError>{showConfirmationError ? <>Confirmation word does not match.<br/>Type the word "delete" exactly as it reads.</> : null}</S.FieldError>
        </div>
        
        <div></div>
        
        <div>
          {/* <S.Spacer count={6}/> */}
          <S.ActionButton disabled={disabled} variant="primary">
            Delete
          </S.ActionButton>
          <S.ActionButton disabled={disabled} onClick={handleCancel} variant="secondary">
            Cancel
          </S.ActionButton>
        </div>
      </S.CardLayout>
    </Card>
    </S.Layout>
  </WorkspaceRoot>
}
