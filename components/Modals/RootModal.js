import React from 'react'
import {modalTypes} from '../../reducers/modal/modal_actions';

import SettingsModal from './Settings/SettingsModalContainer'
import OnboardingModal from './OnBoarding/OnboardingModal'

const MODAL_COMPONENTS = (modalType) => {

    switch (modalType) {

        case modalTypes.SETTINGS_MODAL:
            return SettingsModal;

        case modalTypes.ONBOARDING_MODAL:
            return OnboardingModal;
    }
}

export default class ModalRoot extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {modal} = this.props;
        const {modalType, modalProps} = modal;

        if (!modalType) {
            return null;
        }

        const SpecificModal = MODAL_COMPONENTS(modalType);

        return (
            <SpecificModal {...modalProps} handleClose={ () => this.props.handleClose(modalProps) }/>
        );
    }
}

