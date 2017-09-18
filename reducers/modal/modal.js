const initialState = {
	modalType: null,
	modalProps: {}
}

export const ActionTypes = {
    SHOW_MODAL: 'SHOW_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
};

export const modal = (state = initialState, action) => {

	switch (action.type) {
		case ActionTypes.SHOW_MODAL:
			return {
				modalType: action.modalType,
				modalProps: action.modalProps
			}
		case ActionTypes.CLOSE_MODAL:
			return initialState
		default:
			return state
	}
}

export default modal
