import firebase from 'firebase';
import { CLIENT_ID } from './config';

const uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // Required to enable ID token credentials for this provider.
      clientId: CLIENT_ID,
    },
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // signInMethod: getEmailSignInMethod(),
    },
  ],
};

export default uiConfig;
