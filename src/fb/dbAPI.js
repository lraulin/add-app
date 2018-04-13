import { db } from 'fb/fb';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const doSaveWaistRecord = (id, date, cm) =>
  db.ref(`waist/${id}/${date}`).set({ cm });

export const onceGetUsers = () => db.ref('users').once('value');

// Other Entity APIs ...
