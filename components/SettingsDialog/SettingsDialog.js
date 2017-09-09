import React, {Component} from 'react';
import Screen from '../Screen/Screen';

import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Modal,
} from 'react-native';

export default class SettingsDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };

        this.saveSettings = this.saveSettings.bind(this);
    }

    saveSettings() {

    }

    render() {
        return (
            <Modal animationType={"fade"}
                   transparent={true}
                   visible={this.props.visible}>
                <Screen
                    title="Settings"
                    leftIcon="keyboard-arrow-left"
                    onLeftClick={this.props.closeModal}
                    rightIcon="done"
                    onRightClick={this.saveSettings}
                    actionText="Save settings"
                >
                    <View style={styles.innerContainer}>
                    <Text style={styles.label}>Your name:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                    />
                    </View>

                </Screen>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    label: {},
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    innerContainer: {

    }
});

