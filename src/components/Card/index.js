import * as S from './styles';

export default function HelloWorld({
  ...props
}){

  return (
    <S.Wrapper {...props}>
      <S.Title>Hello world!</S.Title>
    </S.Wrapper>
  );
};
