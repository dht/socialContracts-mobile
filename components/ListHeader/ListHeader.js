import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';


export default class RangesScreen extends Component {
    render() {
        return (

            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop:3,
        height:30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        borderBottomWidth:1,
        borderBottomColor:'#999',
    },
    title: {
        flex:1,
        color:'#373F42',
    },
});

