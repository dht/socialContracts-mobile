import {defaultUIState} from '../../constants/UIState';

export const initialState = defaultUIState;

export const ActionTypes = {
    SET_CONTRACT_ID: 'SET_CONTRACT_ID',
    SET_CURRENT_PLANT_TYPE: 'SET_CURRENT_PLANT_TYPE',
    SET_CURRENT_CHANNEL: 'SET_CURRENT_CHANNEL',
    SET_CURRENT_RANGE_ID: 'SET_CURRENT_RANGE_ID',
    SET_INSTRUCTIONS: 'SET_INSTRUCTIONS',
    SET_TITLEBAR_HEADER: 'SET_TITLEBAR_HEADER',
    SET_IS_LOADING: 'SET_IS_LOADING',
}

const UIState = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.SET_CONTRACT_ID:
            return {
                ...state,
                contractId: action.value
            }

        case ActionTypes.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.value
            }

        case ActionTypes.SET_CURRENT_PLANT_TYPE:
            return {
                ...state,
                currentPlan: action.value
            }

        case ActionTypes.SET_CURRENT_CHANNEL:
            return {
                ...state,
                currentChannel: action.value
            }

        case ActionTypes.SET_CURRENT_RANGE_ID:
            return {
                ...state,
                currentRangeId: action.value
            }

        case ActionTypes.SET_INSTRUCTIONS:
            return {
                ...state,
                instructions: action.value
            }

        case ActionTypes.SET_TITLEBAR_HEADER:
            return {
                ...state,
                titleHeader: action.value
            }

        default:
            return state
    }

}

export default UIState;
