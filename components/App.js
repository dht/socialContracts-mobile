/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {Provider} from 'react-redux'

import store from '../store';

import React, {Component} from 'react';
import {
    AppRegistry,
} from 'react-native';

import {Navigator} from 'react-native-deprecated-custom-components';
import routes from '../constants/routes';

import DashboardScreen from '../components/DashboardScreen/DashboardScreenContainer';
import RangesScreen from '../components/RangesScreen/RangesScreenContainer';
import EditRangeScreen from '../components/EditRangeScreen/EditRangeScreenContainer';


export default class App extends Component {

    constructor() {
        super();
    }

    renderScene(route, navigator) {
        switch (route.index) {
            case 0:
                return <DashboardScreen navigator={navigator} />
            case 1:
                return <RangesScreen navigator={navigator} />
            case 2:
                return <EditRangeScreen subtitle="change the time range for facebook availability" navigator={navigator} />
        }
    }

    render() {
        return (
            <Provider store={store}>
                <Navigator
                    initialRoute={routes.DASHBOARD}
                    renderScene={this.renderScene}
                />
            </Provider>
        );
    }
}
