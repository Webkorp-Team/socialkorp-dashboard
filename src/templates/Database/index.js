import WorkspaceSectionTitle from 'components/WorkspaceSectionTitle';
import WorkspaceTitle from 'components/WorkspaceTitle';
import WorkspaceRoot from 'components/WorkspaceRoot';
import Icon from 'components/Icon';
import * as S from './styles';
import { useEffect, useState, Fragment, useMemo } from 'react';
import Api from 'api/Api';
import ProgressBar from 'components/ProgressBar';
import Link from 'next/link';
import useSelectOptionsFromLists from 'utils/use-select-options-from-lists';

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
    )).filter(({type})=>type!=='padding')
  ),[listSchema]);

  const indexedPropertiesHydrated = useSelectOptionsFromLists(indexedProperties);

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
          <S.WorkspaceButton
            href={`/database/insert?table=${listSchema.name}`}
            displayHref={listSchema.name === 'settings' ? `/admin/settings/insert` : undefined}
          >
            <Icon>{listSchema.materialIcons?.create || 'add'}</Icon>
            Add {listSchema.singular}
          </S.WorkspaceButton>
        )}
      </div>
    </WorkspaceSectionTitle>

    {!items ? <ProgressBar/> : (
      <S.Table>

        <S.TableHead>
          {items.length === 0 ? (
            <S.TableHeadCell>This list is empty</S.TableHeadCell>
          ) : indexedProperties.map(property => (
            <S.TableHeadCell key={property.name}>{property.label||property.title}</S.TableHeadCell>
          ))}
          <S.TableHeadCell/>
        </S.TableHead>

        {items.map((item,idx) => (
          <Link
            key={idx}
            href={`/database/view?table=${listSchema.name}&record=${item._id}`}
            as={listSchema.name === 'settings' ? `/admin/settings/view&record=${item._id}` : undefined}
          >
            <S.TableRow>
              {indexedPropertiesHydrated.map(property => (
                <S.TableCell key={property.name}>{
                  item[property.name] === undefined
                  || item[property.name] === null
                  || item[property.name]?.trim?.() === '' ?
                  <small>{"<empty>"}</small>
                  :(
                    (
                      property.options?.list ? (
                        []
                      ):property.options
                    )?.filter(
                      ({value}) => value?.toString?.() == item[property.name]?.toString?.()
                    )[0]?.label
                    || item[property.name]
                  )
                }</S.TableCell>
              ))}
              <S.TableCell/>
            </S.TableRow>
          </Link>
        ))}

      </S.Table>
    )}

  </WorkspaceRoot>;
}
