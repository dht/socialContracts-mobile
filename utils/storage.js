const CONTACTS_KEY = 'CONTACTS';
const HIDDEN_KEY = 'HIDDEN';

import {AsyncStorage} from 'react-native';

export const saveJson = (key, value) => {
    return AsyncStorage.setItem(key, JSON.stringify(value));
}

export const getJson = (key) => {
    return AsyncStorage.getItem(key)
        .then(response =>  JSON.parse(response));
}

export const saveContacts = (contacts) => {
    return saveJson(CONTACTS_KEY, contacts);
}

export const getContacts = () => {
   return getJson(CONTACTS_KEY);
}
export const saveHidden = (hidden) => {
    return saveJson(HIDDEN_KEY, hidden);
}

export const getHidden = () => {
    return getJson(HIDDEN_KEY);
}