import {combineReducers} from 'redux'

import appState from 'social-contracts/reducers/appState/appState'
import uiState from './UIState/UIState'
import modal from './modal/modal'

export default combineReducers({
    appState,
    uiState,
    modal,
})