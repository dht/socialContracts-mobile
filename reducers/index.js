import {combineReducers} from 'redux'

import appState from './appState/appState'
import uiState from './UIState/UIState'

export default combineReducers({
    appState,
    uiState,
})