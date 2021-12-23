import WorkspaceSectionTitle from 'components/WorkspaceSectionTitle';
import WorkspaceTitle from 'components/WorkspaceTitle';
import WorkspaceRoot from 'components/WorkspaceRoot';
import { useCallback, useState, useMemo, useEffect } from 'react';
import Card, { CardSectionTitle } from 'components/Card';
import * as S from './styles';
import TextField from 'components/TextField';
import ProgressBar from 'components/ProgressBar';
import useSelectOptionsFromLists from 'utils/use-select-options-from-lists';

export default function DeleteItem({
  item,
  listSchema,
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
    setShowConfirmationError(false);
    return onSubmit(e);
  },[onSubmit,setShowConfirmationError]);
  const handleCancel = useCallback((e)=>{
    e.preventDefault();
    onCancel(e);
  },[onCancel]);

  const properties = useSelectOptionsFromLists(listSchema.properties);
  const [counter, setCounter] = useState(0);
  useEffect(()=>{
    setCounter(x=>x+1);
  },[properties]);

  return <WorkspaceRoot>
    <WorkspaceTitle>{listSchema.title}</WorkspaceTitle>
    <WorkspaceSectionTitle>
      <div><S.Capitalize>{listSchema.singular}</S.Capitalize></div>
    </WorkspaceSectionTitle>
    <S.Layout>{!item ? <ProgressBar/> : (
      <Card
        header={<>Delete {listSchema.singular}</>}
      >
        <S.CardLayout>
          {properties.map((property,idx) => (
            property.type === 'file' ? (
              null
            ):(
              <TextField
                key={`${idx}-${counter}`}
                type={property.type}
                options={property.options}
                label={property.label||property.title}
                placeholder={'<empty>'}
                readOnly={true}
                value={item[property.name]}
              />
            )
          ))}
        </S.CardLayout>
        <S.Spacer count={10}/>
        <S.CardLayout as="form" onSubmit={handleSubmit}>
          
          <div>
            <CardSectionTitle>
              Confirmation
            </CardSectionTitle>
            <S.Spacer count={4}/>
            <S.HelpText>
              To permanently delete this {listSchema.singular}, type the word "delete" in the box below.
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
            <S.ActionButton disabled={disabled} variant="primary">
              Delete
            </S.ActionButton>
            <S.ActionButton disabled={disabled} onClick={handleCancel} variant="secondary">
              Cancel
            </S.ActionButton>
          </div>
        </S.CardLayout>
      </Card>
    )}</S.Layout>
  </WorkspaceRoot>
}
