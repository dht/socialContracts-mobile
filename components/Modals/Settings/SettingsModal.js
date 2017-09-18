import React, {Component} from 'react';
import Screen from '../../Screen/Screen';

import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Modal,
} from 'react-native';

export default class SettingsModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.name
        };

        this.saveSettings = this.saveSettings.bind(this);
    }

    componentWillReceiveProps(props) {
        const {name} = props;

        if (name !== this.state.name) {
            this.setState({
                name,
            })
        }
    }
    saveSettings() {
        const {name} = this.state;

        this.props.saveSettings({name});
    }

    render() {
        return (
            <Modal animationType={"slide"}
                   transparent={false}
                   visible={this.props.visible}>
                <Screen
                    title="Settings"
                    leftIcon="keyboard-arrow-left"
                    onLeftClick={this.props.handleClose}
                    rightIcon="done"
                    onRightClick={this.saveSettings}
                    bigIcon="done"
                    onBigClick={this.saveSettings}
                    actionText="Save settings"
                >
                    <View style={styles.innerContainer}>
                    <Text style={styles.label}>Your name:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
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
        marginTop:5,
        height: 40,
        paddingVertical:3,
        paddingHorizontal:8,
        borderColor: 'gray',
        borderWidth: 1
    },
    innerContainer: {
        padding:30,
    }
});

