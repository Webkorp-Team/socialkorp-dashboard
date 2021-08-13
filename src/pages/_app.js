import { StyleSheetManager, ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import Head from 'next/head';
import { GlobalStyles, plugins } from 'responsive-toolkit';
import { useEffect, useState } from 'react';
import Api from 'api/api';
import { useRouter } from 'next/router';
import AppFrame from 'templates/AppFrame';

function App({ Component, pageProps }) {

  const [authInitialized, setAuthInitialized] = useState(Boolean(Api.currentUser()));

  const router = useRouter();

  useEffect(()=>{
    if(Api.isSessionActive() || router.pathname === '/login'){

      setAuthInitialized(true);
      return;

    }else if(Api.currentUser()){

      Api.refreshToken().then(()=>{
        setAuthInitialized(true);
        if(router.pathname === '/')
          router.push('/dashboard');
      }).catch((e)=>{
        if(e.unauthorized)
          router.push('/login');
      });

    }else
      router.push('/login');
  },[setAuthInitialized,router.pathname]);

  useEffect(()=>{
    Api.setOnLogoutListener(()=>{
      router.push('/login');
    });
  },[]);

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
          {authInitialized ? (
            router.pathname == '/login' ? (
              <Component {...pageProps} />
            ) : (
              <AppFrame>
                <Component {...pageProps} />
              </AppFrame>
            )
          ) : <></>}
        </StyleSheetManager>
      </ThemeProvider>
    </>
  )
}

export default App;
