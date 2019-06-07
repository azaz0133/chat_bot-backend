import admin from 'firebase-admin'
const sa = require('../../smartbiz-2ce3e-1fc73e5281b6.json');

require('@google-cloud/firestore');

admin.initializeApp({
  credential: admin.credential.cert(sa),
  databaseURL: 'https://smartbiz-2ce3e.firebaseio.com',
});

const firestore = admin.firestore();
export default firestore