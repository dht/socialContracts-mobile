import React, {Component} from 'react';
import {
    StyleSheet,
    ListView,
    View,
} from 'react-native';

import ChannelRow from './row/ChannelRow';

export default class AvailabilityHours extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows(props.hours),
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(props.hours)
        })
    }

    render() {
        return <ListView
            style={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <ChannelRow
                data={rowData}
                onClick={() => this.props.onRowClick(rowData)}
            />}
        />;

    }
}

const styles = StyleSheet.create({
    list: {
        flex:1,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
    cancel: {
        color: '#333',
    }

});

