import Icon from 'components/Icon';
import * as S from './styles';

export default function Menu({
  ...props
}){
  return <S.Root {...props}>
    <S.AlignTop>
      <S.SectionLink data-active={true}>
        <Icon>home</Icon>
        <span>Dashboard</span>
      </S.SectionLink>
      <S.Separator/>
      <S.SectionTitle>
        <Icon>web</Icon>
        <span>Website</span>
      </S.SectionTitle>
      <S.Section>
        <S.Link>Home Page</S.Link>
        <S.Link>About Us</S.Link>
        <S.Link>Blog</S.Link>
        <S.Link>Events</S.Link>
        <S.Link>Contact Us</S.Link>
      </S.Section>
      <S.Separator/>
      <S.SectionTitle>
        <Icon>storage</Icon>
        <span>Database</span>
      </S.SectionTitle>
      <S.Section>
        <S.Link>Newsletter</S.Link>
        <S.Link>Contact Forms</S.Link>
      </S.Section>
      <S.Separator/>
      <S.SectionTitle>
        <Icon>settings</Icon>
        <span>Admin settings</span>
      </S.SectionTitle>
      <S.Section>
        <S.Link href="/users">Users</S.Link>
      </S.Section>
      <S.Separator/>
    </S.AlignTop>
    <S.AlignBottom>
      <S.Separator/>
      <S.SectionLink>
        <Icon>help_outline</Icon>
        <span>Support</span>
      </S.SectionLink>
    </S.AlignBottom>
  </S.Root>;
}
