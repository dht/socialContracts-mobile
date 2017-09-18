import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import AvailabilityHours from '../AvailabilityHours/AvailabilityHoursContainer';
import Screen from '../Screen/Screen';

export default class EditAvailabilityScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <View style={styles.container}>
                <Screen
                    title="Edit your availability"
                    leftIcon="keyboard-arrow-left"
                    onLeftClick={this.props.pop}
                >

                    <ScrollableTabView onChangeTab={this.props.onChangeTab}
                                       tabBarActiveTextColor="#333"
                                       tabBarUnderlineStyle={{backgroundColor: '#333'}}
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

