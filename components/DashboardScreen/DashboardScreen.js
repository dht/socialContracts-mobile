import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ListView,
    View
} from 'react-native';


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
        this.setState({
            showSettings: false,
        });
    }


    render() {
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
                    <AvailabilityHours tabLabel="Weekday" style={styles.hours} hours="weekday" />
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
        flex:1,
    },
    hours: {
        flex:1,
    }


});

