import { StyleSheetManager, ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import Head from 'next/head';

import { GlobalStyles, plugins } from 'responsive-toolkit';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Future HealthSpaces</title>
        {/* <link rel="shortcut icon" href="/img/favicon.ico" /> */}
        {/* <meta name="description" content="A simple project starter with Nextjs" /> */}
      </Head>
      <GlobalStyles/>
      <ThemeProvider theme={ theme }>
        <StyleSheetManager stylisPlugins={plugins}>
          <Component {...pageProps} /> 
        </StyleSheetManager>
      </ThemeProvider>
    </>
  )
}

export default App;
