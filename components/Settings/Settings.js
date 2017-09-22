import React, {Component} from 'react';
import Screen from '../Screen/Screen';

import {
    StyleSheet,
    View,
    Text,
    Keyboard,
    TextInput,
} from 'react-native';

export default class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            showMessage: false,
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

        this.setState({showMessage: true});
        Keyboard.dismiss();

        setTimeout(() => {
            this.setState({showMessage: false});
        }, 3000);

        this.props.saveSettings({name});
    }

    render() {
        const {tabbar} = this.props;
        const {showMessage} = this.state;

        let props = {};

        if (!tabbar) {
            props = {
                leftIcon: "arrow-back",
                onLeftClick: this.props.handleClose,

                bigIcon: "done",
                onBigClick: this.saveSettings,
                actionText: "Save settings"
            }
        }

        return (
            <Screen
                title="Settings"
                rightIcon="done"
                onRightClick={this.saveSettings}
                {...props}
            >
                <View style={styles.innerContainer}>
                    <Text style={styles.label}>Your name:</Text>
                    <TextInput
                        onSubmit={Keyboard.dismiss}
                        placeholder="Your first name"
                        style={styles.input}
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                    />
                    {showMessage ? <Text style={styles.message}>settings saved</Text> : null}
                </View>

            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    label: {},
    input: {
        marginTop: 8,
        height: 40,
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderColor: '#e3e3e3',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#f9f9f9',
    },
    innerContainer: {
        padding: 30,
    },
    message: {
        marginTop: 7,
        fontSize: 12,
        color: 'gray',
    }
});

