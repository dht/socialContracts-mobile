/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {Provider} from 'react-redux'

import store from './store';

import React, {Component} from 'react';
import {
    AppRegistry,
} from 'react-native';


import DashboardScreen from './components/DashboardScreen/DashboardScreenContainer';

export default class inTouch extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Provider store={store}>
                <DashboardScreen />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('inTouch', () => inTouch);
