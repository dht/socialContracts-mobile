// import { mainApp, getRef, listen } from '../constants/firebase_debug';
import {mainApp, getRef, listen} from '../constants/firebase';

let contractsRef,
    contractRef;

export const configureFirebase = () => {
    contractsRef = mainApp.database().ref("contracts");
}

export const configureContract = (id) => {
    contractRef = contractsRef.child(id);
}

export const fetchContract = () => {

    return getRef(contractRef);
}

export const saveContractName = (name) => {
    if(contractRef) {
        contractRef.child('settings').child('name').set(name);
    }
}

export const saveContractPlans = (plans) => {
    if(contractRef) {
        contractRef.child('plans').set(plans);
    }
}

export const saveContractPlansByDate = (plansByDate) => {
    if(contractRef) {
        contractRef.child('plansByDate').set(plansByDate);
    }
}

export const saveContract = (contract) => {
    if(contractRef) {
        contractRef.set(contract);
    }
}

configureFirebase();
