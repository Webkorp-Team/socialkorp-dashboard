import * as S from './styles';
import NextLink from 'next/link';

export default function Button({
  variant="primary",
  href,
  displayHref,
  ...props
}){

  

  return href ? (
    <NextLink href={href} displayHref={displayHref} passHref={true}>
      <S.Button as="a" data-variant={variant} {...props}/>
    </NextLink>
  ) : <S.Button data-variant={variant} {...props}/>;
} 
