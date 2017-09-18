const USER_KEY = 'USER';
const DID_ONBOARDING_PLAY_KEY = 'ONBOARDING';

import {AsyncStorage} from 'react-native';

export const saveJson = (key, value) => {
    return AsyncStorage.setItem(key, JSON.stringify(value));
}

export const getJson = (key) => {
    return AsyncStorage.getItem(key)
        .then(response => JSON.parse(response));
}

export const saveBoolean = (key, value) => {
    return AsyncStorage.setItem(key, value ? 'yes' : 'no');
}

export const getBoolean = (key) => {
    return AsyncStorage.getItem(key)
        .then(response => response === 'yes');
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

export const saveOnBoardingPlayed = (didPlay) => {
    return saveBoolean(DID_ONBOARDING_PLAY_KEY, didPlay)
}

export const getOnBoardingPlayed = () => {
    return getBoolean(DID_ONBOARDING_PLAY_KEY)
}
