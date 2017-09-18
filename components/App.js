import React, {Component} from 'react';

import {Navigator} from 'react-native-deprecated-custom-components';
import routes from '../constants/routes';

import DashboardScreen from '../components/DashboardScreen/DashboardScreenContainer';
import EditAvailabilityScreen from '../components/EditAvailabilityScreen/EditAvailabilityScreenContainer';
import RangesScreen from '../components/RangesScreen/RangesScreenContainer';
import EditRangeScreen from '../components/EditRangeScreen/EditRangeScreenContainer';

export default class App extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this.props.loadApp();
    }

    renderScene(route, navigator) {
        switch (route.index) {
            case routes.DASHBOARD.index:
                return <DashboardScreen navigator={navigator} />
            case routes.EDIT_AVAILABILITY.index:
                return <EditAvailabilityScreen navigator={navigator} />
            case routes.RANGES.index:
                return <RangesScreen navigator={navigator} />
            case routes.EDIT_RANGE.index:
                return <EditRangeScreen subtitle="change the time range for facebook availability" navigator={navigator} />
        }
    }

    render() {
        return (
                <Navigator
                    initialRoute={routes.DASHBOARD}
                    renderScene={this.renderScene}
                />

        );
    }
}
