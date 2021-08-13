import NextLink from 'next/link';

export default function Link({href,displayHref,...p}){
  return href ? (
    <NextLink href={href} as={displayHref}>
      <a {...p}/>
    </NextLink>
  ) : <a {...p}/>;
}
