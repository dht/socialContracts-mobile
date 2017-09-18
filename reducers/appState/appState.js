import {getMaxId} from '../../utils/ranges';
import {emptyAppState} from '../../constants/appState';

import clone from 'clone';

export const initialState = emptyAppState;

export const ActionTypes = {
    SET_APP_STATE:'SET_APP_STATE',
    SET_NAME: 'SET_NAME',
    SET_TIMEZONE: 'SET_TIMEZONE',
    SET_DEFAULT_LANGUAGE: 'SET_DEFAULT_LANGUAGE',
    SET_DAY_RANGE: 'SET_DAY_RANGE',
    ADD_RANGE: 'ADD_RANGE',
    SET_RANGE: 'SET_RANGE',
    REMOVE_RANGE: 'REMOVE_RANGE',
    ADD_RANGE_FOR_DATE: 'ADD_RANGE_FOR_DATE',
    SET_RANGE_FOR_DATE: 'SET_RANGE_FOR_DATE',
    REMOVE_RANGE_FOR_DATE: 'REMOVE_RANGE_FOR_DATE',
    SET_AVAILABILITY_STRING: 'SET_AVAILABILITY_STRING',
};


const range = (state = {}, action) => {

    switch (action.type) {
        case ActionTypes.ADD_RANGE:
        case ActionTypes.ADD_RANGE_FOR_DATE:
            return {
                id: action.id,
                ...action.range,
            }

        case ActionTypes.SET_DAY_RANGE:
        case ActionTypes.SET_RANGE:
        case ActionTypes.SET_RANGE_FOR_DATE:
            return {
                ...state,
                ...action.range
            }

        default:
            return state
    }
}

const ranges = (state = {}, action) => {
    let newState, r;

    switch (action.type) {
        case ActionTypes.ADD_RANGE:
        case ActionTypes.ADD_RANGE_FOR_DATE:
            const id = getMaxId(state) + 1;

            action.id = id;
            r = `r${action.id}`;

            return {
                ...state,
                [r]: range(undefined, action)
            }


        case ActionTypes.SET_RANGE:
        case ActionTypes.SET_RANGE_FOR_DATE:
            r = `r${action.id}`;
            return {
                ...state,
                [r]: range(state[r], action)
            }

        case ActionTypes.REMOVE_RANGE:
        case ActionTypes.REMOVE_RANGE_FOR_DATE:
            r = `r${action.id}`;
            newState = clone(state);
            delete newState[r];

            return newState;

        default:
            return state
    }
}

const day = (state = {}, action) => {

    switch (action.type) {
        case ActionTypes.ADD_RANGE_FOR_DATE:
        case ActionTypes.SET_RANGE_FOR_DATE:
        case ActionTypes.REMOVE_RANGE_FOR_DATE:
            return {
                ...state,
                [action.channel]: ranges(state[action.channel], action)
            }

        default:
            return state
    }
}

const month = (state = {}, action) => {

    let d;

    switch (action.type) {
        case ActionTypes.ADD_RANGE_FOR_DATE:
        case ActionTypes.SET_RANGE_FOR_DATE:
        case ActionTypes.REMOVE_RANGE_FOR_DATE:
            d = `d${action.day}`;
            return {
                ...state,
                [d]: day(state[d], action)
            }

        default:
            return state
    }
}

const year = (state = {}, action) => {

    let m;

    switch (action.type) {
        case ActionTypes.ADD_RANGE_FOR_DATE:
        case ActionTypes.SET_RANGE_FOR_DATE:
        case ActionTypes.REMOVE_RANGE_FOR_DATE:
            m = `m${action.month}`;
            return {
                ...state,
                [m]: month(state[m], action)
            }
        default:
            return state
    }
}

const plansByDate = (state = {}, action) => {

    let y;

    switch (action.type) {
        case ActionTypes.ADD_RANGE_FOR_DATE:
        case ActionTypes.SET_RANGE_FOR_DATE:
        case ActionTypes.REMOVE_RANGE_FOR_DATE:
            y = `y${action.year}`;
            return {
                ...state,
                [y]: year(state[y], action)
            }
        default:
            return state
    }
}

const period = (state = {}, action) => {

    switch (action.type) {
        case ActionTypes.ADD_RANGE:
        case ActionTypes.SET_RANGE:
        case ActionTypes.REMOVE_RANGE:
            return {
                ...state,
                [action.channel]: ranges(state[action.channel], action)
            }

        default:
            return state
    }
}

const plans = (state = {}, action) => {

    switch (action.type) {
        case ActionTypes.ADD_RANGE:
        case ActionTypes.SET_RANGE:
        case ActionTypes.REMOVE_RANGE:
            return {
                ...state,
                [action.period]: period(state[action.period], action)
            }
        default:
            return state
    }
}

const settings = (state = {}, action) => {

    switch (action.type) {
        case ActionTypes.SET_NAME:
            return {
                ...state,
                name: action.value
            }
        case ActionTypes.SET_DEFAULT_LANGUAGE:
            return {
                ...state,
                defaultLanguage: action.value
            }
        case ActionTypes.SET_TIMEZONE:
            return {
                ...state,
                timezone: action.value
            }
        case ActionTypes.SET_DAY_RANGE:
            return {
                ...state,
                day: range(state.day, action)
            }

        default:
            return state
    }
}

const appState = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.SET_APP_STATE:
            return action.value;

        case ActionTypes.SET_NAME:
        case ActionTypes.SET_TIMEZONE:
        case ActionTypes.SET_DEFAULT_LANGUAGE:
        case ActionTypes.SET_DAY_RANGE:
            return {
                ...state,
                settings: settings(state.settings, action)
            }

        case ActionTypes.ADD_RANGE:
        case ActionTypes.SET_RANGE:
        case ActionTypes.REMOVE_RANGE:
            return {
                ...state,
                plans: plans(state.plans, action)
            }

        case ActionTypes.ADD_RANGE_FOR_DATE:
        case ActionTypes.SET_RANGE_FOR_DATE:
        case ActionTypes.REMOVE_RANGE_FOR_DATE:
            return {
                ...state,
                plansByDate: plansByDate(state.plansByDate, action)
            }
        case ActionTypes.SET_AVAILABILITY_STRING:
            return {
                ...state,
                availabilityString: action.value
            }

        default:
            return state
    }

}

export default appState;
