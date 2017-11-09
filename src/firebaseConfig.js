import Firebase from 'firebase'

/* Firebase configuration */
let config = {
    apiKey: "AIzaSyC624ppr6-qXgI_gyRBCp_J8gOnP7Z8RmM",
    authDomain: "vue-4ff59.firebaseapp.com",
    databaseURL: "https://vue-4ff59.firebaseio.com",
    projectId: "vue-4ff59",
    storageBucket: "vue-4ff59.appspot.com",
    messagingSenderId: "408285728444"
};

const firebaseApp = Firebase.initializeApp(config);
const db = firebaseApp.database();

export {firebaseApp, db};