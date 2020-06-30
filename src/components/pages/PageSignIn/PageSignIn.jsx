import React, { useEffect } from 'react';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import uiConfig from '../../../firebase/uiConfig';

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

function PageSignIn() {
  useEffect(() => {
    // The start method will wait until the DOM is loaded to include the FirebaseUI sign-in widget
    // within the element corresponding to the selector specified.
    ui.start('#firebaseui-auth-container', uiConfig);
  }, []);

  return (
    <div>
      <h1>Sign in to use the site</h1>
      <div id="firebaseui-auth-container" />
    </div>
  );
}

export default PageSignIn;
