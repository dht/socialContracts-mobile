import React, {Component} from 'react';

import {StyleSheet, TabBarIOS, View} from 'react-native';

import DashboardScreen from '../components/DashboardScreen/DashboardScreenContainer';
import EditAvailabilityScreen from '../components/EditAvailabilityScreen/EditAvailabilityScreenContainer';
import Settings from '../components/Settings/SettingsContainer';

export default class Tabbar extends Component {

    constructor() {
        super();

        this.state = {
            selectedTab: 'dashboard',
        }
    }

    render() {
        return (
            <TabBarIOS
                unselectedTintColor="#A1A1A1"
                tintColor="#FF2D55"
                barTintColor="rgba(249,249,249,0.9)">
                <TabBarIOS.Item
                    title="Dashboard"
                    icon={require('../images/ic_dashboard.png')}
                    selected={this.state.selectedTab === 'dashboard'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'dashboard',
                        });
                    }}>
                    <View style={styles.content}>
                    <DashboardScreen tabbar={true} />
                    </View>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Weekday"
                    icon={require('../images/ic_view_week.png')}
                    selected={this.state.selectedTab === 'weekday'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'weekday',
                        });
                        this.props.onChangeTab(true);
                    }}>
                    <View style={styles.content}>
                    <EditAvailabilityScreen weekday={true} tabbar={true}/>
                    </View>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Weekend"
                    icon={require('../images/ic_weekend.png')}
                    selected={this.state.selectedTab === 'weekend'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'weekend',
                        });

                        this.props.onChangeTab(false);
                    }}>
                    <View style={styles.content}>
                    <EditAvailabilityScreen weekday={false} tabbar={true}/>
                    </View>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Settings"
                    icon={require('../images/ic_settings.png')}
                    selected={this.state.selectedTab === 'settings'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'settings',
                        });
                    }}>
                    <View style={styles.content}>
                    <Settings tabbar={true} saveSettings={this.props.saveSettings}  />
                    </View>
                </TabBarIOS.Item>


            </TabBarIOS>

        );
    }
}


const styles = StyleSheet.create({
    container: {},
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
    content: {
        paddingBottom:50,
        flex:1,
    }
});

