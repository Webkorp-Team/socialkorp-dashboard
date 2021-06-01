import { useEffect } from 'react';

import { wrapper } from 'store/store';
import { getUsers } from 'store/ducks/users';

import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import Main from 'components/Main';

export default function Home() {
  const store = useSelector(state => state);

  useEffect(() => {
    console.log(store)
  }, [store])

  return <Main/>
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(getUsers(0));

  store.dispatch(END);

  await store.sagaTask.toPromise();
}) 