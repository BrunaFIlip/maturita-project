//import firebase from 'firebase/app';
//import 'firebase/auth';
import 'firebase/firestore';
import config from '../database/config';


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const Firebase = firebase.initializeApp(config.firebase);

export const auth = firebase.auth();
export default Firebase;