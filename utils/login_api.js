import firebase from 'firebase';
import {mainApp, getRef, listen} from '../constants/firebase';

let permissionsRef,
    permissionRef,
    usersRef,
    userRef;

const configureFirebase = () => {
    permissionsRef = mainApp.database().ref("permissions");
    usersRef = mainApp.database().ref("users");
}

const setUser = (userId) => {
    userRef = usersRef.child(userId);
}

const currentUser = () => {
    return firebase
        .auth()
        .currentUser;
}

const createUser = (username, password) => {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(username, password);
}

const loginUser = (username, password) => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(username, password);
}

const setPermissions = (contractId, userId) => {
    permissionRef = permissionsRef.child(contractId);
    return permissionRef.child('owner').set(userId);
}

const addToUserLibrary = (contractId) => {
    userRef.child(contractId).set(true);
}

const checkPermissions = (contractId) => {
    return getRef(userRef.child(contractId));
}

const login = () => {
    return firebase.auth().signInAnonymously()
        .then(response => {
            return response.uid;
        })
        .catch(error => {
            alert('problem: ' + error.message);
        });
}

const logout = () => {
    return firebase.auth().signOut();
}

configureFirebase();

export default {
    login,
    setUser,
    setPermissions,
    addToUserLibrary,
    checkPermissions,
    logout,
    currentUser,
    createUser,
    loginUser,
}