import {ActionTypes} from './appState';

export const setRange = (channel, period, id, range) => {

    return {
        type: ActionTypes.SET_RANGE,
        channel, period, id, range
    }
}

export const removeRange = (channel, period, id) => {

    return {
        type: ActionTypes.REMOVE_RANGE,
        channel, period, id
    }
}

export const setName = (value) => {

    return {
        type: ActionTypes.SET_NAME,
        value,
    }
}

export const setTimezone = (value) => {

    return {
        type: ActionTypes.SET_TIMEZONE,
        value,
    }
}

export const setDefaultLanguage = (value) => {

    return {
        type: ActionTypes.SET_DEFAULT_LANGUAGE,
        value,
    }
}

export const setDayRange = (range) => {

    return {
        type: ActionTypes.SET_DAY_RANGE,
        range,
    }
}

export const addRangeForDate = (year, month, day, channel) => {

    return {
        type: ActionTypes.ADD_RANGE_FOR_DATE,
        year, month, day, channel
    }
}

export const removeRangeForDate = (year, month, day, channel, id) => {

    return {
        type: ActionTypes.REMOVE_RANGE_FOR_DATE,
        year, month, day, channel, id
    }
}

export const setRangeForDate = (year, month, day, channel, id, range) => {

    return {
        type: ActionTypes.SET_RANGE_FOR_DATE,
        year, month, day, channel, id, range
    }
}

export const addRange = (channel, period, range) => {

    return {
        type: ActionTypes.ADD_RANGE,
        channel, period, range
    }
}

export const setAppState = (value) => {
    return {
        type: ActionTypes.SET_APP_STATE,
        value,
    }
}

export const setAvailabilityString = (value) => {
    return {
        type: ActionTypes.SET_AVAILABILITY_STRING,
        value,
    }
}

export const deleteRangeById = (id) => {
    return (dispatch, getState) => {
        const {uiState} = getState(),
            {currentPlan, currentChannel} = uiState;

        dispatch(removeRange(currentChannel, currentPlan, id));
    }
}

export const addRangeForCurrent = (range) => {
    return (dispatch, getState) => {
        const {uiState} = getState(),
            {currentPlan, currentChannel} = uiState;

        dispatch(addRange(currentChannel, currentPlan, range));
    }
}

export const saveRangeForCurrent = (range) => {
    return (dispatch, getState) => {
        const {uiState} = getState(),
            {currentPlan, currentChannel} = uiState;

        if (!range.end) {
            delete range.end;
        }

        dispatch(setRange(currentChannel, currentPlan, range.id, range));
    }
}




