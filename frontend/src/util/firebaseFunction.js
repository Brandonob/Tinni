import firebase from "../firebase";

export const logout = () => firebase.auth().signOut();

export const login = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const signUp = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

export const getFirebaseIdToken = () =>
  firebase.auth().currentUser.getIdToken(false);

export const config = {
  apiKey: "AIzaSyDUkWJiUNnYwqe5nwb3qMRxRqTkeimmfG4",
  authDomain: "codename-ida.firebaseapp.com",
};

export const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: "/userprofile",
};
