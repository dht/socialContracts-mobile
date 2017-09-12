import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class BigButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor="#eeeeee"
                onPress={this.props.onClick}>
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <Icon.Button size={30} name={this.props.icon} color="#333" backgroundColor="transparent">
                        </Icon.Button>
                    </View>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 10,
        height:80,
    },
    iconContainer: {
        width: 55,
        alignItems:'center',
        justifyContent:'center',
    },
    title: {
        flex:1,
        fontSize:22,
        textAlign:'center',
        paddingRight:20,
    }
});

