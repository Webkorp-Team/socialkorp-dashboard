import Icon from 'components/Icon';
import * as S from './styles';

export default function Menu({
  ...props
}){
  return <S.Root {...props}>
    <S.AlignTop>
      <S.SectionLink href="/dashboard">
        <Icon>home</Icon>
        <span>Dashboard</span>
      </S.SectionLink>
      <S.Separator/>
      <S.SectionTitle>
        <Icon>web</Icon>
        <span>Website</span>
      </S.SectionTitle>
      <S.Section>
        <S.PageLink>Home Page</S.PageLink>
        <S.PageLink>About Us</S.PageLink>
        <S.PageLink>Blog</S.PageLink>
        <S.PageLink>Events</S.PageLink>
        <S.PageLink>Contact Us</S.PageLink>
      </S.Section>
      <S.Separator/>
      <S.SectionTitle>
        <Icon>storage</Icon>
        <span>Database</span>
      </S.SectionTitle>
      <S.Section>
        <S.PageLink>Newsletter</S.PageLink>
        <S.PageLink>Contact Forms</S.PageLink>
      </S.Section>
      <S.Separator/>
      <S.SectionTitle baseUrl="/admin">
        <Icon>settings</Icon>
        <span>Admin settings</span>
      </S.SectionTitle>
      <S.Section>
        <S.PageLink href="/admin/users">Users</S.PageLink>
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
