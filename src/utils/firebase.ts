import firebase from 'firebase'

firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATEBASE_URL,
    projectId: process.env.PROJECT,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGEGING,
    appId: process.env.APP_ID
})

export default firebase