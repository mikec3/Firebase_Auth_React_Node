import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";

  // Your web app's Firebase configuration
  // This is apparently safe to upload to VC and web because api permissions are set in firebase console. Approve list IP or domains.
  // https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
  //https://console.cloud.google.com/apis/credentials?project=fir-auth-deaa9
  const firebaseConfig = {
    apiKey: "AIzaSyCI0jaR_Hv6764LN1-AUC6V-U3GcsyHMgU",
    authDomain: "fir-auth-deaa9.firebaseapp.com",
    projectId: "fir-auth-deaa9",
    storageBucket: "fir-auth-deaa9.appspot.com",
    messagingSenderId: "230801736765",
    appId: "1:230801736765:web:9bc776f79bd30200ec9654"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user
    return user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = async () => {
  await signOut(auth);

  // this should return null
  return auth.currentUser;
};

const getCurrentUser = async () => {
  return auth.currentUser;
}

const updateDisplayName = async (displayName) => {
  await updateProfile(auth.currentUser, {
    displayName: displayName
  });

  return auth.currentUser;
}

export {
  auth,
  //db,
  //signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  getCurrentUser,
  updateDisplayName
};