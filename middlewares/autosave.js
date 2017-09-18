import {ActionTypes} from '../reducers/appState/appState';
import {saveContractAfterChange, refreshAvailabilityString} from '../reducers/app_thunks';

const acceptActions = Object.keys(ActionTypes);
const ignoreActions = [ActionTypes.SET_APP_STATE, ActionTypes.SET_AVAILABILITY_STRING];

const autosave = store => next => action => {

	let result = next(action);

	if (action.type &&
		acceptActions.indexOf(action.type) >= 0 &&
		ignoreActions.indexOf(action.type) === -1) {

		store.dispatch(saveContractAfterChange());
		store.dispatch(refreshAvailabilityString());
	}

	return result
}

export default autosave;
