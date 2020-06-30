import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

// Get local storage value and replace default with it
export const UserContext = React.createContext({});

// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userState) => {
      if (userState) {
        localStorage.setItem('user state', JSON.stringify(userState));
        setUser(userState);
      } else {
        localStorage.removeItem('user state');
        setUser(userState);
      }
    });
  }, [user]);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
