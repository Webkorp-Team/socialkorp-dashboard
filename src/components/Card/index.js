import * as S from './styles';

export default function Card({
  header=null,
  footer=null,
  children,
  variant="secondary",
  ...props
}){

  return (
    <S.Card data-variant={variant} {...props}>
      <S.CardHeader>
        {header}
      </S.CardHeader>
      <S.CardBody>
        {children}
      </S.CardBody>
      <S.CardFooter>
        {footer}
      </S.CardFooter>
    </S.Card>
  );
};

export const CardSectionTitle = S.CardSectionTitle;
