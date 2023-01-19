import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAiypt4iZKX3rcnBTYtbJs1JsnekVFQmNk',
  authDomain: 'imovies-f5112.firebaseapp.com',
  projectId: 'imovies-f5112',
  storageBucket: 'imovies-f5112.appspot.com',
  messagingSenderId: '986619579750',
  appId: '1:986619579750:web:c2e9a99af9fb6bdafe4ca7',
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore();

export default app;
export { auth, db };
