import HelloWorld from 'components/HelloWorld';

export default function Home({
  ...props
}) {
  return <HelloWorld {...props}/>
}
