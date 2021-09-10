import Icon from 'components/Icon';
import * as S from './styles';
import config from 'api/website.config.json';

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
        {config.pages
          .filter(page => page.sections && page.sections.length > 0)
          .map(page => (
            <S.PageLink key={page.name} href={`/website?page=${page.name}`}>
              {page.title}
            </S.PageLink>
          ))
        }
      </S.Section>
      <S.Separator/>
      <S.SectionTitle>
        <Icon>storage</Icon>
        <span>Database</span>
      </S.SectionTitle>
      <S.Section>
        {config.lists.filter(({hidden}) => !hidden).map(list => (
          <S.PageLink key={list.name} href={`/database?table=${list.name}`}>
            {list.title}
          </S.PageLink>
        ))}
      </S.Section>
      <S.Separator/>
      <S.SectionTitle baseUrl="/admin">
        <Icon>settings</Icon>
        <span>Admin settings</span>
      </S.SectionTitle>
      <S.Section>
        <S.PageLink href="/admin/users">Users</S.PageLink>
        <S.PageLink href="/database?table=settings" displayHref="/admin/settings">System settings</S.PageLink>
      </S.Section>
      <S.Separator/>
    </S.AlignTop>
    <S.AlignBottom>
      <S.Separator/>
      <S.SectionLink href="#">
        <Icon>help_outline</Icon>
        <span>Support</span>
      </S.SectionLink>
    </S.AlignBottom>
  </S.Root>;
}
