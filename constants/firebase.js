import firebase  from 'firebase/app';
import * as Config from '../constants/Config';

require('firebase/auth');
require('firebase/database');
require('firebase/storage');

const mainApp = firebase.initializeApp(Config.firebaseCredentials);
const storage = firebase.storage();

const getRef = (ref) => {
	return ref.once("value")
		.then(snapshot => {

			return snapshot.val();

		});
}

export const listen = (ref, callback) => {
    return ref.on("value", snapshot => {
        const val = snapshot ? snapshot.val() : {};
        callback.call(this, val, ref);
    })
}

export const listen_added = (ref, callback) => {
    return ref.on("child_added", snapshot => {
        callback.call(this, snapshot.val());
    })
}

export {
	mainApp,
	storage,
	getRef,
};
