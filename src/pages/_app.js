import { StyleSheetManager, ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import Head from 'next/head';

import initResponsiveToolkit from 'styled-components-responsive-toolkit';
import cssReset from 'css-config/css-reset';
import viewport from 'css-config/viewport';
import fonts from 'css-config/fonts';
import mediaQueries from 'css-config/media-queries';

const {
  GlobalStyles,
  plugins,
} = initResponsiveToolkit({
  cssReset,
  viewport,
  fonts,
  mediaQueries,
}); 

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
