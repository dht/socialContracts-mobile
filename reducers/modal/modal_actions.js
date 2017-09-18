import {ActionTypes} from './modal';

export const modalTypes = {
    SETTINGS_MODAL: 'SETTINGS_MODAL',
    ONBOARDING_MODAL: 'ONBOARDING_MODAL',
}

export const showModal = (modalType, props) => {
	return {
		type: ActionTypes.SHOW_MODAL,
		modalType,
		modalProps: props
	}
}
export const closeModal = () => {
	return {
		type: ActionTypes.CLOSE_MODAL,
	}
}

