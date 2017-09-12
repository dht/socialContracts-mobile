import {ActionTypes} from './UIState';

export const setInstructions = (value) => {

    return {
        type: ActionTypes.SET_INSTRUCTIONS,
        value
    }
}

export const setTitlebarHeader = (value) => {

    return {
        type: ActionTypes.SET_TITLEBAR_HEADER,
        value
    }
}

export const setCurrentPlanType = (value) => {

    return {
        type: ActionTypes.SET_CURRENT_PLANT_TYPE,
        value
    }
}

export const setCurrentChannel = (value) => {

    return {
        type: ActionTypes.SET_CURRENT_CHANNEL,
        value
    }
}

export const setCurrentRangeId = (value) => {

    return {
        type: ActionTypes.SET_CURRENT_RANGE_ID,
        value
    }
}
