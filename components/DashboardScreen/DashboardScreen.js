import React, {Component} from 'react';
import {
    StyleSheet,
    ListView,
    View
} from 'react-native';

import SettingsDialog from '../SettingsDialog/SettingsDialogContainer';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import AvailabilityHours from '../AvailabilityHours/AvailabilityHoursContainer';
import Screen from '../Screen/Screen';

export default class DashboardScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSettings: false,
        };

        this.showSettingsModal = this.showSettingsModal.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.props.loadApp();
    }

    showSettingsModal() {
        this.setState({
            showSettings: true
        });
    }

    closeModal() {
        this.setState({
            showSettings: false,
        });
    }

    saveSettings(settings) {
        this.closeModal();
        this.props.saveSettings(settings);
    }

    render() {
        const {isLoading} = this.props;
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

                    <ScrollableTabView onChangeTab={this.props.onChangeTab}
                                       tabBarActiveTextColor="#333"
                                       tabBarUnderlineStyle={{backgroundColor:'#333'}}
                    >
                        <AvailabilityHours
                            navigator={this.props.navigator}
                            tabLabel="Weekday"
                            style={styles.hours}
                            hours="weekday"/>
                        <AvailabilityHours
                            navigator={this.props.navigator}
                            tabLabel="Weekend"
                            style={styles.hours}
                            hours="weekend"/>
                    </ScrollableTabView>

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

