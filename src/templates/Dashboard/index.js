import Icon from 'components/Icon';
import WorkspaceRoot from 'components/WorkspaceRoot';
import WorkspaceTitle from 'components/WorkspaceTitle';
import WorkspaceSectionTitle from 'components/WorkspaceSectionTitle';
import * as S from './styles';
import Card from 'components/Card';
import { CardSectionTitle } from 'components/Card';

export default function Dashboard({
  ...props
}){
  return <WorkspaceRoot>
    <WorkspaceTitle>Dashboard</WorkspaceTitle>
    <WorkspaceSectionTitle>Quick info</WorkspaceSectionTitle>
    <S.GridLayout>
      <Card footer={
        <a>
          Events
          <Icon>east</Icon>
        </a>
      } header={<>Events</>}>
          <S.CardTableDouble>
            <div>
              <div>Active</div><div>0</div>
              <div>Expired</div><div>0</div>
            </div>
            <div>
              <div>Expire soon</div><div>0</div>
            </div>
          </S.CardTableDouble>
      </Card>
      <Card footer={
        <a>
          Newsletter
          <Icon>east</Icon>
        </a>
      } header={<>Newsletter</>}>
          <S.CardTableDouble>
            <div>
              <div>Subscribers</div><div>0</div>
              <div>Last 7 days</div><div>0</div>
            </div>
            <div>
            </div>
          </S.CardTableDouble>
      </Card>
      <Card footer={
        <a>
          Contact us
          <Icon>east</Icon>
        </a>
      } header={<>Contact requests</>}>
          <S.CardTableDouble>
            <div>
              <div>Active</div><div>0</div>
              <div>Last 7 days</div><div>0</div>
            </div>
            <div>
            </div>
          </S.CardTableDouble>
      </Card>
    </S.GridLayout>
    <WorkspaceSectionTitle>Analytics</WorkspaceSectionTitle>
    <S.GridLayout>
    <Card
      variant="primary"
      footer={
        <a>
          Google Analytics
          <Icon>launch</Icon>
        </a>
      } header={<>Events</>}>
          <CardSectionTitle>Active users now</CardSectionTitle>
          <S.CardCount>
            0
          </S.CardCount>
          <CardSectionTitle>
            <div>Main active pages</div>
            <div>Active users</div>
          </CardSectionTitle>
          <S.CardTable>
            <div>Home Page</div><div>0</div>
            <div>About Us</div><div>0</div>
            <div>Blog</div><div>0</div>
            <div>Events</div><div>0</div>
            <div>Contact Us</div><div>0</div>
            <div></div><div></div>
            <div></div><div></div>
            <div></div><div></div>
            <div></div><div></div>
            <div></div><div></div>
            <div></div><div></div>
            <div></div><div></div>
            <div></div><div></div>
            <div></div><div></div>
            <div></div><div></div>
            <div></div><div></div>
          </S.CardTable>
      </Card>
      <Card
        footer={
          <a>
            Google Analytics
            <Icon>launch</Icon>
          </a>
        } header={<>Users location <small>(Last 7 days)</small></>}
      >
          <CardSectionTitle>
            <div>Country</div>
            <div>%</div>
          </CardSectionTitle>
      </Card>
      <Card
        footer={
          <a>
            Google Analytics
            <Icon>launch</Icon>
          </a>
        } header={<>Users location</>}
      >
          <CardSectionTitle>Country</CardSectionTitle>
      </Card>
    </S.GridLayout>
  </WorkspaceRoot>
}
