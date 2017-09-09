
const acceptActions = [];
const ignoreActions = [];

const autosave = store => next => action => {

	let result = next(action);

	if (action.type &&
		acceptActions.indexOf(action.type) >= 0 &&
		ignoreActions.indexOf(action.type) === -1) {

	}

	return result
}

export default autosave;
