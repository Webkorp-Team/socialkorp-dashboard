import Icon from 'components/Icon';
import * as S from './styles';

export default function Dashboard({
  ...props
}){
  return <S.Root>
    <S.Title>Dashboard</S.Title>
    <S.SectionTitle>Quick info</S.SectionTitle>
    <S.GridLayout>
      <S.Card>
        <S.CardHeader>Events</S.CardHeader>
        <S.CardBody>
          <S.CardTableDouble>
            <div>
              <div>Active</div><div>0</div>
              <div>Expired</div><div>0</div>
            </div>
            <div>
              <div>Expire soon</div><div>0</div>
            </div>
          </S.CardTableDouble>
        </S.CardBody>
        <S.CardFooter>
          <small>
          <a>
            Events
            <Icon>east</Icon>
          </a>
          </small>
        </S.CardFooter>
      </S.Card>
      <S.Card>
        <S.CardHeader>Newsletter</S.CardHeader>
        <S.CardBody>
          <S.CardTableDouble>
            <div>
              <div>Subscribers</div><div>0</div>
              <div>Last 7 days</div><div>0</div>
            </div>
            <div>
            </div>
          </S.CardTableDouble>
        </S.CardBody>
        <S.CardFooter>
          <small>
          <a>
            Events
            <Icon>east</Icon>
          </a>
          </small>
        </S.CardFooter>
      </S.Card>
      <S.Card>
        <S.CardHeader>Contact Us form</S.CardHeader>
        <S.CardBody>
          <S.CardTableDouble>
            <div>
              <div>Active</div><div>0</div>
              <div>Last 7 days</div><div>0</div>
            </div>
            <div>
            </div>
          </S.CardTableDouble>
        </S.CardBody>
        <S.CardFooter>
          <small>
          <a>
            Events
            <Icon>east</Icon>
          </a>
          </small>
        </S.CardFooter>
      </S.Card>
    </S.GridLayout>
    <S.SectionTitle>Analytics</S.SectionTitle>
    <S.GridLayout>
      <S.Card data-primary={true}>
        <S.CardHeader>Real time</S.CardHeader>
        <S.CardBody>
          <S.CardSectionTitle>Active users now</S.CardSectionTitle>
          <S.CardCount>
            0
          </S.CardCount>
          <S.CardSectionTitle>
            <div>Main active pages</div>
            <div>Active users</div>
          </S.CardSectionTitle>
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
        </S.CardBody>
        <S.CardFooter>
          <a>
            Google Analytics
            <Icon>launch</Icon>
          </a>
        </S.CardFooter>
      </S.Card>
      <S.Card>
        <S.CardHeader>Users location <small>(Last 7 days)</small></S.CardHeader>
        <S.CardBody>
          <S.CardSectionTitle>
            <div>Country</div>
            <div>%</div>
          </S.CardSectionTitle>
        </S.CardBody>
        <S.CardFooter>
          <a>
            Google Analytics
            <Icon>launch</Icon>
          </a>
        </S.CardFooter>
      </S.Card>
      <S.Card>
        <S.CardHeader>Users location</S.CardHeader>
        <S.CardBody>
          <S.CardSectionTitle>
            Country
          </S.CardSectionTitle>
        </S.CardBody>
        <S.CardFooter>
          <a>
            Google Analytics
            <Icon>launch</Icon>
          </a>
        </S.CardFooter>
      </S.Card>
    </S.GridLayout>
  </S.Root>
}
