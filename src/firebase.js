// /src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRpTP_mxsbt-AWeshWtUTYceVEWkgox9M",
    authDomain: "ids-project-39711.firebaseapp.com",
    projectId: "ids-project-39711",
    storageBucket: "ids-project-39711.appspot.com",
    messagingSenderId: "594675382585",
    appId: "1:594675382585:web:56b8365a6f3526ffa790e8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signInWithEmail = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
};

const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    return user;
};

const checkUserInDatabase = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists();
};

const addUserToDatabase = async (user) => {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        provider: user.providerData[0].providerId
    });
};

const storage = getStorage(firebaseApp);
export { auth, db, storage, signInWithEmail, signInWithGoogle, checkUserInDatabase, addUserToDatabase };
