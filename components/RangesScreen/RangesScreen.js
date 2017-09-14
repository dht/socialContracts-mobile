import React, {Component} from 'react';
import {
    StyleSheet,
    ListView,
    View
} from 'react-native';


import Screen from '../Screen/Screen';
import RangeRow from "./row/RangeRow";
import ListHeader from "../ListHeader/ListHeader";

export default class RangesScreen extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows(props.ranges),
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(props) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(props.ranges)
        })
    }

    render() {
        const {currentChannel, listHeader, addVerbText, titleHeader, newId} = this.props;

        return (

            <View style={styles.container}>
                <Screen
                    title={titleHeader}
                    leftIcon="keyboard-arrow-left"
                    onLeftClick={this.props.pop}
                    rightIcon="add"
                    onRightClick={() => this.props.addRange(currentChannel, newId)}
                    actionText={addVerbText}
                >

                     <ListHeader title={listHeader} />

                    <ListView
                        enableEmptySections={true}
                        style={styles.list}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => <RangeRow
                            data={rowData}
                            onClick={() => this.props.editRange(rowData, currentChannel)}
                            onRemove={() => this.props.onRemove(rowData)}
                        />}
                    />

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

