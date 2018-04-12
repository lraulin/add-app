import * as firebase from 'firebase';

const prodConfig = {};

const devConfig = {
  apiKey: 'AIzaSyA8d_Xpfwy6aZmp1uf6eJyoVOxNNqtNiy0',
  authDomain: 'add-app-47772.firebaseapp.com',
  databaseURL: 'https://add-app-47772.firebaseio.com',
  projectId: 'add-app-47772',
  storageBucket: 'add-app-47772.appspot.com',
  messagingSenderId: '122102049562',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { db, auth };
