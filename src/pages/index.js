import Main from 'components/Main';

export default function Home({ value }) {
  return <Main/>
}

export async function getStaticProps(context) {
  return {
    props: {
      value: 1
    },
  }
}