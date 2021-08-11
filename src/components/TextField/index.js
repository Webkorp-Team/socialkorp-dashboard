import * as S from './styles';

export default function TextField({
  type="text",
  ...props
}){


  return <S.TextField type={type} {...props}/>
}
