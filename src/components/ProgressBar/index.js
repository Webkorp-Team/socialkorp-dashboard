import * as S from './styles';

export default function ProgressBar({...props}){
  return <S.ProgressBar {...props}>
    <S.Indicator/>
  </S.ProgressBar>
}
