import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { firebaseConfig } from './config';
import {getStorage, ref} from 'firebase/storage';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = getStorage();
export const storageRef = ref(getStorage());
export const currentUser = firebase.auth().currentUser;


const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => {
    auth.signInWithPopup(GoogleProvider)
    .then(user => {
        console.log(user)
        firestore.collection("users").doc(user.user.uid);
    })
    .catch((error) => {
        console.log(error)
    })
};

