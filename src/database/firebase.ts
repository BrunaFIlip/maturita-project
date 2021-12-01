import config from '../database/config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getDatabase } from "firebase/database";


export const Firebase = firebase.initializeApp(config.firebase);
export const auth = Firebase.auth();
export const db = getDatabase(Firebase);
