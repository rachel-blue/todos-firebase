import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as firebaseui from 'firebaseui';
import { firebaseConfig } from './config';

const myFirebase = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

// Initialize the FirebaseUI Widget using Firebase.
export const ui = new firebaseui.auth.AuthUI(firebase.auth());

export default myFirebase;
