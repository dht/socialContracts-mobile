import React, {Component} from 'react';
import {
    StyleSheet,
    ListView,
    View
} from 'react-native';

import SettingsDialog from '../SettingsDialog/SettingsDialogContainer';

// import ScrollableTabView from 'react-native-scrollable-tab-view';

import AvailabilityHours from '../AvailabilityHours/AvailabilityHoursContainer';
import Screen from '../Screen/Screen';

export default class ContactScreen extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows([]),
            showSettings: false,
        };

        this.showSettingsModal = this.showSettingsModal.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.props.loadApp();
    }

    componentWillReceiveProps(props) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(props.contacts)
        })
    }

    showSettingsModal() {
        this.setState({
            showSettings: true
        });
    }

    closeModal() {
        console.log('closeModal -> ', true);
        this.setState({
            showSettings: false,
        });
    }

    saveSettings(settings) {
        console.log('settings -> ', settings);
        this.closeModal();
        this.props.saveSettings(settings);
    }

    render() {
        const {showSettings} = this.state;

        return (

            <View style={styles.container}>
                <Screen
                    title="Your availability"
                    leftIcon="settings"
                    onLeftClick={this.showSettingsModal}
                    rightIcon="share"
                    onRightClick={this.props.openLink}
                    actionText="Share your availability"
                >
                    <AvailabilityHours
                        navigator={this.props.navigator}
                        tabLabel="Weekday"
                        style={styles.hours}
                        hours="weekday"/>

                    {showSettings ? <SettingsDialog
                        saveSettings={this.saveSettings}
                        closeModal={this.closeModal}
                    /> : null}

                </Screen>
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
    tabs: {
        flex: 1,
    },
    hours: {
        flex: 1,
    }


});

