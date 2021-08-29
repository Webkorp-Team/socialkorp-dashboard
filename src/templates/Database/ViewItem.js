import WorkspaceSectionTitle from 'components/WorkspaceSectionTitle';
import WorkspaceTitle from 'components/WorkspaceTitle';
import WorkspaceRoot from 'components/WorkspaceRoot';
import { useCallback, useState } from 'react';
import Card, { CardSectionTitle } from 'components/Card';
import * as S from './styles';
import TextField from 'components/TextField';
import Api from 'api/Api';
import { useRouter } from 'next/router';
import ProgressBar from 'components/ProgressBar';
import ImageUpload from 'components/ImageUpload';
import { Fragment } from 'react';

export default function ViewItem({
  item,
  itemId,
  listSchema,
  onSubmit=()=>{},
  onCancel=()=>{},
  disabled=false,
}){

  const handleSubmit = useCallback((e)=>{
    e.preventDefault();
    return onSubmit(e);
  },[onSubmit]);
  const handleCancel = useCallback((e)=>{
    e.preventDefault();
    onCancel(e);
  },[onCancel]);

  return <WorkspaceRoot>
    <WorkspaceTitle>{listSchema.title}</WorkspaceTitle>
    <WorkspaceSectionTitle>
      <div>{itemId ? <>View and edit {listSchema.singular}</> : <>Add {listSchema.singular}</>}</div>
    </WorkspaceSectionTitle>
    {itemId && !item ? <ProgressBar/> : (
      <S.Layout>
        <Card
          as="form"
          onSubmit={handleSubmit}
          header={<S.Capitalize>{listSchema.singular}</S.Capitalize>}
          footer={
            <S.FooterActionLink
              href={{
                pathname: `/database/delete`,
                query:{
                  table: listSchema.name,
                  record: itemId,
                  data: JSON.stringify(item),
                }
              }}
              displayHref={`/admin/users/delete?table=${listSchema.name}&record=${itemId}`}
            >
              Delete {listSchema.singular}
            </S.FooterActionLink>
          }
        >
          {!itemId ? <>
            <S.Spacer count={2}/>
          </>:null}
          <S.CardLayout>
            {listSchema.properties.map(property => (
              property.type === 'file' ? (
                property.accept.match(/^image\b/) ? <Fragment key={property.name}>
                  <ImageUpload
                    accept={property.accept}
                    label={property.title}
                    name={property.name}
                    readOnly={property.readOnly}
                    defaultValue={item ? item[property.name] : ''}
                  />
                  <div/>
                </Fragment> : null
              ):property.type === 'select' ? (
                null
              ):(
                <TextField
                  key={property.name}
                  type={property.type}
                  label={item ? property.title : undefined}
                  placeholder={item ? '<empty>' : property.title}
                  name={property.name}
                  readOnly={property.readOnly}
                  defaultValue={item ? item[property.name] : ''}
                />
              )
            ))}
            
          </S.CardLayout>
          <S.CardLayout>
            <div>
              <S.Spacer count={6}/>
              <S.ActionButton disabled={disabled} variant="primary">
                {item ? <>Save changes</> : <>Add {listSchema.singular}</>}
              </S.ActionButton>
              <S.ActionButton disabled={disabled} onClick={handleCancel} variant="secondary">
                {item ? <>Discard changes</> : <>Cancel</>}
              </S.ActionButton>
            </div>
          </S.CardLayout>
        </Card>
      </S.Layout>
    )}
  </WorkspaceRoot>
}
