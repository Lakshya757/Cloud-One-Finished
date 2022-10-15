import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig ={
    apiKey: "AIzaSyAcdfafNyWyF4K_XI-Z-GD6OuXxB7wJ6z0",
    authDomain: "cloud-one-51e62.firebaseapp.com",
    databaseURL: "https://cloud-one-51e62-default-rtdb.firebaseio.com",
    projectId: "cloud-one-51e62",
    storageBucket: "cloud-one-51e62.appspot.com",
    messagingSenderId: "955311993635",
    appId: "1:955311993635:web:ad0ac54a6c31d947709296"
}

    firebase.initializeApp(firebaseConfig)


export { firebase }