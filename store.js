import {createStore, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import autosave from './middlewares/autosave'

import holoApp from './reducers';

export default createStore(holoApp, applyMiddleware(ReduxThunk, autosave));

