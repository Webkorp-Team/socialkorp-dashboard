import { StyleSheetManager, ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import Head from 'next/head';
import { GlobalStyles, plugins } from 'responsive-toolkit';
import { useEffect, useState } from 'react';
import Api from 'api/api';
import { useRouter } from 'next/router';

function App({ Component, pageProps }) {

  const [authInitialized, setAuthInitialized] = useState(Boolean(Api.currentUser()));

  const router = useRouter();

  const pathname = (typeof window !== 'undefined') && window.location.pathname;

  useEffect(()=>{
    if(Api.isSessionActive() || pathname === '/login'){

      setAuthInitialized(true);
      return;

    }else if(Api.currentUser()){

      Api.refreshToken().then(()=>{
        setAuthInitialized(true);
        if(pathname === '/')
          router.push('/dashboard');
      }).catch((e)=>{
        if(e.unauthorized)
          router.push('/login');
      });

    }else
      router.push('/login');
  },[setAuthInitialized,pathname]);

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
          {authInitialized ? <Component {...pageProps} /> : <></>}
        </StyleSheetManager>
      </ThemeProvider>
    </>
  )
}

export default App;
