import Head from 'next/head';
import { wrapper } from 'store/store';

import GlobalStyles from 'styles/global';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Boilerplate</title>
        <link rel="shortcut icon" href="/img/favicon.ico" />
        <meta name="description" content="A simple project starter with Nextjs" />
      </Head>
      <GlobalStyles/>
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(App);
