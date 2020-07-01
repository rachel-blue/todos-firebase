import React, { useContext } from 'react';
import { UserContext } from '../../../app/UserContextProvider';
import CreateBtn from '../../molecule/CreateBtn/CreateBtn';

function PageHome() {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div>
        {/*
         //put splash page in here
         */}
        <h1>This is the Home Page!</h1>
        <p>Sign in to start using To-Do lists</p>
      </div>
    );
  }
  return (
    <div>
      <h1>This is the Home Page!</h1>
      {/*
      // if no cards have been made yet, then a create card button should display here
      // actual cards made by the user should display here
      */}
      <CreateBtn />
    </div>
  );
}

export default PageHome;
