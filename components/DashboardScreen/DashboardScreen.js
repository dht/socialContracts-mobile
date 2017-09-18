import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';

import RootModal from '../Modals/RootModalContainer';

import Box from '../Box/Box';

import Screen from '../Screen/Screen';

export default class DashboardScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {url, availabilityString} = this.props;

        return (

            <View style={styles.container}>
                <Screen
                    title="Your availability"
                    leftIcon="settings"
                    onLeftClick={this.props.showSettingsModal}
                    rightIcon="share"
                    onRightClick={this.props.share}
                    bigIcon="edit"
                    actionText="Edit your availability"
                    onBigClick={this.props.editAvailability}
                >
                    <View style={styles.content}>
                        <Text style={styles.topText}>What your contacts see right now:</Text>
                        <Box availability={availabilityString}/>
                        <Text style={styles.linkLabel}>Your unique link:</Text>
                        <TextInput
                            style={styles.input}
                            value={url}
                        />
                    </View>
                </Screen>

                <RootModal />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    content: {
        margin: 20,
    },
    topText: {
        marginBottom: 12,
    },
    linkLabel: {
        marginTop: 20,
        marginBottom: 5,
    },
    input: {
        marginTop: 5,
        height: 40,
        fontSize: 14,
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderColor: 'gray',
        borderWidth: 1
    },
});

