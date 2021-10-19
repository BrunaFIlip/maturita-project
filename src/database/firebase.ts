import config from '../database/config';
import 'firebase/database'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const Firebase = firebase.initializeApp(config.firebase);



//export const db = firebase.database();
export const auth = firebase.auth();
export default Firebase;