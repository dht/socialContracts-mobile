import React, {Component} from 'react';
import {
    AppRegistry,
} from 'react-native';

import store from './store';
import {Provider} from 'react-redux'

import App from './components/AppContainer';

export default class inTouch extends Component {

    render() {
        return (
            <Provider store={store}>
                <App tabbar={true} />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('inTouch', () => inTouch);
