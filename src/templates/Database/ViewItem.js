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
import { getListIndex } from 'utils/use-list-index';

async function fetchOptionsList({list,label,value}){

  const index = await getListIndex(list);

  return index.map(item => ({
    label: item[label],
    value: item[value],
  }));
}

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
            itemId ? <S.FooterActionLink
              href={{
                pathname: `/database/delete`,
                query:{
                  table: listSchema.name,
                  record: itemId,
                  data: JSON.stringify(item),
                }
              }}
              displayHref={
                listSchema.name === 'settings'
                ? `/admin/settings/delete&record=${itemId}`
                : `/database/delete?table=${listSchema.name}&record=${itemId}`
              }
            >
              Delete {listSchema.singular}
            </S.FooterActionLink> : null
          }
        >
          {!itemId ? <>
            <S.Spacer count={2}/>
          </>:null}
          <S.CardLayout>
            {listSchema.properties.map((property,idx) => (
              property.type === 'hidden' ? (
                <input
                  type="hidden"
                  name={property.name}
                  value={item ? item[property.name] : ''}
                  key={idx}
                />
              ) :
              property.type === 'padding' ? <div key={idx}/> :
              property.type === 'file' ? (
                property.accept.match(/^image\b/) ? <Fragment key={idx}>
                  <ImageUpload
                    accept={property.accept}
                    label={property.label || property.title}
                    name={property.name}
                    readOnly={property.readOnly}
                    defaultValue={item ? item[property.name] : ''}
                    required={property.required}
                  />
                </Fragment> : (
                  <input
                    type="hidden"
                    name={property.name}
                    value={item ? item[property.name] : ''}
                    key={idx}
                  />
                )
              ):(
                <TextField
                  key={idx}
                  type={property.type}
                  label={item ? property.label || property.title : undefined}
                  placeholder={item ? '<empty>' : property.label || property.title}
                  name={property.name}
                  readOnly={property.readOnly}
                  options={property.options?.list ? (()=>fetchOptionsList(property.options)) : property.options}
                  defaultValue={item ? item[property.name] : ''}
                  required={property.required}
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
