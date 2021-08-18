import { StyleSheetManager, ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import Head from 'next/head';
import { GlobalStyles, plugins } from 'responsive-toolkit';
import { useEffect, useState } from 'react';
import Api from 'api/Api';
import { useRouter } from 'next/router';
import AppFrame from 'templates/AppFrame';
import { CurrentUserProvider } from 'use-current-user';
import { useUpdateCurrentUserData } from 'use-current-user';

function App({ Component, pageProps }) {

  const [authInitialized, setAuthInitialized] = useState(false);

  const router = useRouter();

  const [user, setUser] = useState({email: Api.currentUser()});

  useEffect(()=>{
    if(Api.isSessionActive() || router.pathname === '/login'){
      setAuthInitialized(true);
      return;
    }

    if(!Api.currentUser()){
      router.push('/login');
      return;
    }

    setAuthInitialized(true);
    
    Api.refreshToken().then(user => {
      setUser(user);
      if(router.pathname === '/')
        router.push('/dashboard');
    }).catch((e)=>{
      if(e.unauthorized)
        router.push('/login');
    });

  },[
    setAuthInitialized,
    setUser,
    router.pathname
  ]);

  useEffect(()=>{
    Api.setOnLogoutListener(()=>{
      router.push('/login');
    });
  },[]);

  return (
    <>
      <Head>
        <title>Future HealthSpaces</title>
        <link rel="icon" href="data:,"/>
        {/* <link rel="shortcut icon" href="/img/favicon.ico" /> */}
        {/* <meta name="description" content="A simple project starter with Nextjs" /> */}
      </Head>
      <GlobalStyles/>
      <ThemeProvider theme={ theme }>
        <StyleSheetManager stylisPlugins={plugins}>
          {authInitialized ? (
            <CurrentUserProvider user={user}>
              { router.pathname === '/login' ? <Component {...pageProps} /> : (
                <AppFrame>
                  <Component {...pageProps} />
                </AppFrame>
              )}
            </CurrentUserProvider>
          ) : <></>}
        </StyleSheetManager>
      </ThemeProvider>
    </>
  )
}

export default App;
