import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import {Navigator} from 'react-native-deprecated-custom-components';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import ListHeader from '../ListHeader/ListHeader';
import AvailabilityHours from '../AvailabilityHours/AvailabilityHoursContainer';
import Screen from '../Screen/Screen';

import routes from '../../constants/routes';

import RangesScreen from '../RangesScreen/RangesScreenContainer';
import EditRangeScreen from '../EditRangeScreen/EditRangeScreenContainer';

export default class EditAvailabilityScreen extends Component {
    constructor(props) {
        super(props);

        this.renderAvailability = this.renderAvailability.bind(this);
        this.renderDrilldownScene = this.renderDrilldownScene.bind(this);
        this.renderDrilldown = this.renderDrilldown.bind(this);
    }

    renderDrilldownScene(route, navigator) {
        switch (route.index) {
            case routes.EDIT_AVAILABILITY.index:
                return this.renderAvailabilityScreen(navigator);
            case routes.RANGES.index:
                return <RangesScreen tabbar={true} navigator={navigator}/>
            case routes.EDIT_RANGE.index:
                return <EditRangeScreen tabbar={true}
                                        navigator={navigator}/>
        }
    }

    renderDrilldown() {
        return <Navigator
            initialRoute={routes.EDIT_AVAILABILITY}
            renderScene={this.renderDrilldownScene}
        />
    }

    renderAvailability(weekday, navigator) {
        return <AvailabilityHours
            navigator={navigator}
            tabLabel={weekday ? "Weekday" : 'Weekend'}
            hours={weekday ? "weekday" : "weekend"}/>
    }

    renderAvailabilityScreen(navigator) {
        const {weekday} = this.props,
            title = weekday ? 'Weekday availability' : 'Weekend availability';

        return <View style={styles.container}>
            <Screen
                title={title}
            >
                <ListHeader title="Click to edit:"/>
                {this.renderAvailability(weekday, navigator)}
            </Screen>
        </View>
    }

    renderAvailabilityScreenWithBoth() {
        return <View style={styles.container}>
            <Screen
                title="Edit your availability"
                leftIcon="arrow-back"
                onLeftClick={this.props.pop}
            >

                <ScrollableTabView onChangeTab={this.props.onChangeTab}
                                   tabBarActiveTextColor="#333"
                                   tabBarUnderlineStyle={{backgroundColor: '#333'}}
                >
                    {this.renderAvailability(true, this.props.navigator)}
                    {this.renderAvailability(false, this.props.navigator)}
                </ScrollableTabView>
            </Screen>
        </View>
    }

    render() {
        const {tabbar} = this.props;

        if (tabbar) {
            return this.renderDrilldown();
        }

        return this.renderAvailabilityScreenWithBoth();
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
        marginTop: 130,
    }


});

