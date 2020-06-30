import React, {useEffect, useState} from 'react';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';

function UserBtn() {
// @TODO login/ logout functionality updated with onclick method
  // should contain the logout  functionality (if user clicks when already logged in)
  // and for sign in, redirect the user to the signing page/widget

  const history = useHistory();
  const [btn, setBtn] = useState();

  useEffect(() => {
    // listens for user change and updates
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setBtn('Log Out');
      } else {
        localStorage.removeItem('user');
        setBtn('Sign In');
      }
    });
  }, []);

  const handleClick = () => {
    if (btn === 'Log Out') {
      firebase.auth().signOut();
    } else {
      history.push('/sign-in');
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
    >
      {btn}
    </button>
  );
}

export default UserBtn;
