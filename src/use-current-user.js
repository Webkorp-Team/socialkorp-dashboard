import Api from "api/Api";
import { createContext, useContext, useCallback, useState, useEffect } from 'react';

const currentUserContext = createContext();

export const CurrentUserProvider = ({
  user: forwardedUser,
  ...props
})=>{

  const [user, setUser] = useState({
    email: Api.currentUser(),
  });

  useEffect(()=>{
    if(!forwardedUser)
      return;
    setUser(forwardedUser);
  },[forwardedUser,setUser]);

  return <currentUserContext.Provider value={{
    user,
    setUser
  }} {...props}/>;
}

const useCurrentUser = ()=>{
  return useContext(currentUserContext).user;
}
export const useUpdateCurrentUserData = ()=>{
  
  const setUser = useContext(currentUserContext).setUser;

  const setUserData = useCallback((userData)=>{
    setUser({
      email: Api.currentUser(),
      userData
    });
  })

  return setUserData;
}

export default useCurrentUser;
