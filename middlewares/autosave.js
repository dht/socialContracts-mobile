import {ActionTypes} from '../reducers/appState/appState';
import {saveContractAfterChange} from '../reducers/app_thunks';

const acceptActions = Object.keys(ActionTypes);
const ignoreActions = [ActionTypes.SET_APP_STATE, ];

const autosave = store => next => action => {

	let result = next(action);

	if (action.type &&
		acceptActions.indexOf(action.type) >= 0 &&
		ignoreActions.indexOf(action.type) === -1) {

		store.dispatch(saveContractAfterChange());
	}

	return result
}

export default autosave;
