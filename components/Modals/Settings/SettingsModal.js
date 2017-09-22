import React, {Component} from 'react';
import Settings from '../../Settings/SettingsContainer';

import {
    Modal,
} from 'react-native';

export default class SettingsModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal animationType={"slide"}
                   transparent={false}
                   visible={this.props.visible}>
               <Settings {...this.props} />
            </Modal>
        );
    }
}
