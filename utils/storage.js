const USER_KEY = 'USER';

import {AsyncStorage} from 'react-native';

export const saveJson = (key, value) => {
    return AsyncStorage.setItem(key, JSON.stringify(value));
}

export const getJson = (key) => {
    return AsyncStorage.getItem(key)
        .then(response =>  JSON.parse(response));
}

export const saveUser = (user) => {
    return saveJson(USER_KEY, user);
}

export const getUser = () => {
    return getJson(USER_KEY);
}

export const clear = () => {
    AsyncStorage.clear();
}