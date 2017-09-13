import {getUser, saveUser, clear} from '../utils/storage'
import api from '../utils/login_api';
import {
    configureContract,
    fetchContract,
    saveContract,
    saveContractName,
    saveContractPlans,
    saveContractPlansByDate
} from '../utils/contracts_api';
import {setAppState} from '../reducers/appState/appState_actions'
import {setContractId, setIsLoading} from '../reducers/UIState/UIState_actions'
import {guid8} from '../utils/guid'
import {contractUrl} from '../constants/Config'

import {Linking} from 'react-native'

import {defaultAppState} from '../constants/appState';

export const loadApp = () => {

    // clear();


    return (dispatch, getState) => {
        console.log('true -> ', api.currentUser());
        dispatch(setIsLoading(true));

        loginOrNewUser()
            .then(contractId => {
                console.log('loadApp contractId -> ', contractId);
                dispatch(setContractId(contractId));
                configureContract(contractId);
                return fetchContract()
                    .then(contract => {
                        console.log('contract -> ', contract);
                        dispatch(setAppState(contract));
                        dispatch(setIsLoading(false));
                    })
            })
    }
}

export const createNewUser = () => {
    const username = guid8() + '@socialcontracts.io',
        password = guid8(),
        contractId = guid8();

    console.log('createNewUser -> ', username, password, contractId);

    return api.createUser(username, password)
        .then(user => {
            console.log('user -> ', user);

            api.setUser(user.uid);
            configureContract(contractId);

            api.setPermissions(contractId, user.uid);
            api.addToUserLibrary(contractId);

            console.log('current -> ', api.currentUser());

            return saveUser({
                id: user.uid,
                username,
                password,
                contractId,
            })
        })
        .then(() => {
            console.log('saving -> ', true);
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
                console.log('createNewUser user -> ', user);
                return createNewUser();
            } else {
                console.log('login user -> ', user);
                return login(user.username, user.password, user.contractId);
            }

        })
}

export const saveContractAfterChange = () => {
    return (dispatch, getState) => {

        const {appState} = getState(),
            {plans, plansByDate, settings} = appState;

        console.log('plans -> ', plans);

        saveContractPlans(plans || {});
        saveContractPlansByDate(plansByDate || {});
        saveContractName(settings.name || '');
    }
}

export const openContractInBrowser = () => {

    return (dispatch, getState) => {

        const {uiState} = getState(),
            {contractId} = uiState;

        console.log('contractId -> ', contractId);

        let url = contractUrl(contractId);

        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

}