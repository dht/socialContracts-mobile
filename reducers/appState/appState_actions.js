import {ActionTypes} from './appState';

export const setSearchText= (value) => {

    return {
        type: ActionTypes.SET_SEARCH_TEXT,
        value
    }
}
