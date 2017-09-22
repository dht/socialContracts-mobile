import React, {Component} from 'react';

import Navbar from './Navbar';
import Tabbar from './Tabbar';

export default class App extends Component {
    componentDidMount() {
        this.props.loadApp();
    }

    render() {
        return (this.props.tabbar ?
                <Tabbar {...this.props} /> :
                < Navbar {...this.props} />
        );
    }
}


