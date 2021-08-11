import Menu from 'templates/Menu';
import TopBar from 'templates/TopBar';
import * as S from './styles';

export default function AppFrame({children,...props}){

  return <S.Root {...props}>
    <TopBar/>
    <S.MenuWrapperGrid>
      <Menu/>
      <S.Content>
        {children}
      </S.Content>
    </S.MenuWrapperGrid>
    
  </S.Root>
}
