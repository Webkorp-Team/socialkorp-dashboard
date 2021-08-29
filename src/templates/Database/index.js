import WorkspaceSectionTitle from 'components/WorkspaceSectionTitle';
import WorkspaceTitle from 'components/WorkspaceTitle';
import WorkspaceRoot from 'components/WorkspaceRoot';
import Icon from 'components/Icon';
import * as S from './styles';
import { useEffect, useState, Fragment, useMemo } from 'react';
import Api from 'api/Api';
import ProgressBar from 'components/ProgressBar';
import Link from 'next/link';

export default function Database({
  items=null,
  listSchema,
  ...props
}){

  const indexedProperties = useMemo(()=>(
    listSchema.properties.filter(property => (
      !listSchema.index && !listSchema.listing ? true : (
        (listSchema.listing || listSchema.index).includes(property.name)
      )
    ))
  ),[listSchema]);

  const canAdd = (
    (!listSchema.adminOperations || listSchema.adminOperations.create)
    && (!listSchema.maxItems || (items && items.length < listSchema.maxItems))
  );

  return <WorkspaceRoot {...props}>
    <WorkspaceTitle>{listSchema.title}</WorkspaceTitle>
    <WorkspaceSectionTitle>
      <div>All records</div>
      <div>
        {!canAdd ? null : (
          <S.WorkspaceButton href={`/database/insert?table=${listSchema.name}`}>
            <Icon>{listSchema.materialIcons?.create || 'add'}</Icon>
            Add {listSchema.singular}
          </S.WorkspaceButton>
        )}
      </div>
    </WorkspaceSectionTitle>
    <S.Table>

      <S.TableHead>
        {items && items.length === 0 ? (
          <S.TableHeadCell>This list is empty</S.TableHeadCell>
        ) : indexedProperties.map(property => (
          <S.TableHeadCell key={property.name}>{property.label||property.title}</S.TableHeadCell>
        ))}
      </S.TableHead>

      {
        !items ? null : items.map((item,idx) => (
          <Link key={idx} href={`/database/view?table=${listSchema.name}&record=${item._id}`}><a>
            <S.TableRow>
              {indexedProperties.map(property => (
                <S.TableCell key={property.name}>{
                  item[property.name] ? (
                    property.options?.filter(({value}) => value == item[property.name])[0]?.label
                    || item[property.name]
                  ) : <small>{"<empty>"}</small>
                }</S.TableCell>
              ))}
            </S.TableRow>
          </a></Link>
        ))
      }

    </S.Table>
    {!items ? <ProgressBar/> : null}
  </WorkspaceRoot>;
}
