import React, { useContext } from 'react';
import UserBtn from '../../organisms/UserBtn/UserBtn';
import { UserContext } from '../../../app/UserContextProvider';

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
        <UserBtn />
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
      <ul>
        <li>thing one</li>
        <li>thing two</li>
        <li>the cat in the hat</li>
      </ul>
    </div>
  );
}

export default PageHome;
