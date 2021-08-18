import WorkspaceSectionTitle from 'components/WorkspaceSectionTitle';
import WorkspaceTitle from 'components/WorkspaceTitle';
import WorkspaceRoot from 'components/WorkspaceRoot';
import Icon from 'components/Icon';
import * as S from './styles';
import { useEffect, useState, Fragment } from 'react';
import Api from 'api/Api';
import ProgressBar from 'components/ProgressBar';

export default function Users({
  users=null,
  ...props
}){

  return <WorkspaceRoot>
    <WorkspaceTitle>Users</WorkspaceTitle>
    <WorkspaceSectionTitle>
      <div>Active users</div>
      <div>
        <S.WorkspaceButton href={'/admin/users/add'}>
          <Icon>person_add</Icon>
          Add user
        </S.WorkspaceButton>
      </div>
    </WorkspaceSectionTitle>
    <S.Table>
      <S.TableHead><Icon>manage_accounts</Icon></S.TableHead>
      <S.TableHead>Display name</S.TableHead>
      <S.TableHead>User</S.TableHead>
      <S.TableHead>Level</S.TableHead>
      <S.TableHead></S.TableHead>

      {
        !users ? null : users.map((user,idx) => <Fragment key={idx}>
          <S.TableCell>
            {/* email={user.email}  */}
            <S.ActionLink
              href={{
                pathname: '/admin/users/edit',
                query:{
                  user: JSON.stringify(user)
                }
              }}
              displayHref={`/admin/users/edit?email=${user.email}`}
            >
              Edit
            </S.ActionLink>
          </S.TableCell>
          <S.TableCell>{
              user.userData.firstName || user.userData.lastName ? (
                `${user.userData.firstName||''} ${user.userData.lastName||''}`
              ) : <small>No display name set</small>
          }</S.TableCell>
          <S.TableCell>{user.email}</S.TableCell>
          <S.TableCell>{user.level}</S.TableCell>
          <S.TableCell></S.TableCell>
        </Fragment>)
      }

    </S.Table>
    {!users ? <ProgressBar/> : null}
  </WorkspaceRoot>;
}
