import {getUser, saveUser, getOnBoardingPlayed, saveOnBoardingPlayed, clear} from '../utils/storage'
import api from '../utils/login_api';
import {
    configureContract,
    fetchContract,
    saveContract,
    saveContractName,
    saveContractPlans,
    saveContractPlansByDate
} from '../utils/contracts_api';
import {setAppState, setAvailabilityString} from '../reducers/appState/appState_actions'
import {setContractId, setIsLoading} from '../reducers/UIState/UIState_actions'
import {showModal, modalTypes} from '../reducers/modal/modal_actions'
import {guid8} from '../utils/guid'
import {contractUrl} from '../constants/Config'
import {contractToText} from '../utils/contracts'

import {Linking} from 'react-native'

import {defaultAppState} from '../constants/appState';

export const loadApp = () => {

    // clear();

    return (dispatch, getState) => {
        dispatch(setIsLoading(true));

        loginOrNewUser()
            .then(contractId => {
                dispatch(setContractId(contractId));
                configureContract(contractId);
                return fetchContract()
                    .then(contract => {
                        dispatch(setAppState(contract));
                        dispatch(setIsLoading(false));
                        dispatch(refreshAvailabilityString(contract));
                    })
            });

        getOnBoardingPlayed()
            .then(played => {
                if (!played) {
                    dispatch(showModal(modalTypes.ONBOARDING_MODAL));
                    saveOnBoardingPlayed(true);
                }
            })


    }
}

export const refreshAvailabilityString = (contract) => {
    return (dispatch, getState) => {

        contract = contract || getState().appState;
        const availabilityString = contractToText(contract, 'en', true);

        dispatch(setAvailabilityString(availabilityString));
    }
}

export const createNewUser = () => {
    const username = guid8() + '@socialcontracts.io',
        password = guid8(),
        contractId = guid8();

    return api.createUser(username, password)
        .then(user => {
            api.setUser(user.uid);
            configureContract(contractId);

            api.setPermissions(contractId, user.uid);
            api.addToUserLibrary(contractId);

            return saveUser({
                id: user.uid,
                username,
                password,
                contractId,
            })
        })
        .then(() => {
            return saveContract(defaultAppState);
        })
        .then(() => {
            return contractId;
        })
}

export const login = (username, password, contractId) => {
    return api.loginUser(username, password)
        .then(() => {
            return contractId;
        })
}

export const loginOrNewUser = () => {
    return getUser()
        .then(user => {
            if (!user) {
                return createNewUser();
            } else {
                return login(user.username, user.password, user.contractId);
            }

        })
}

export const saveContractAfterChange = () => {
    return (dispatch, getState) => {

        const {appState} = getState(),
            {plans, plansByDate, settings} = appState;

        saveContractPlans(plans || {});
        saveContractPlansByDate(plansByDate || {});
        saveContractName(settings.name || '');
    }
}

export const openContractInBrowser = () => {

    return (dispatch, getState) => {

        const {uiState} = getState(),
            {contractId} = uiState;

        let url = contractUrl(contractId);

        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

}