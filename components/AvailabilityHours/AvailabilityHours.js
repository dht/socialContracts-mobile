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

        // const isEmpty = this.state.dataSource.getRowCount() === 0;

        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    style={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <ChannelRow
                        data={rowData}
                        onClick={() => this.props.onRowClick(rowData)}
                    />}
                />

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
        borderColor:'green',
    },
    list: {
        flex: 1,
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
    cancel: {
        color:'#333',
    }

});

