import * as S from './styles';

export default function TextField({
  type="text",
  label=null,
  ...props
}){

  const field = <S.TextField type={type} {...props}/>;

  return label ? (
    <S.Label>
      <span>{label}</span>
      {field}
    </S.Label>
  ) : field;
}
