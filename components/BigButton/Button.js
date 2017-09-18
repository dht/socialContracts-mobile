import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor="#eeeeee"
                onPress={this.props.onClick}>
                <View style={styles.container}>
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
        height: 60,
        width: 180,
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 5,
    },
    title: {
        flex: 1,
        fontSize: 22,
        textAlign: 'center',
    }
});

