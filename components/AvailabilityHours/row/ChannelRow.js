import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const ICONS = {
    phone:'phone',
    whatsapp:'whatsapp',
    facebook:'facebook',
    email:'envelope',
}

const ICON_SIZES = {
    phone:30,
    whatsapp:30,
    facebook:30,
    email:27,
}
export default class ChannelRow extends Component {

    render() {
        const {data} = this.props,
            {channel, text,} = data;

        const icon = ICONS[channel],
            icon_size = ICON_SIZES[channel];

        console.log('icon -> ', icon);

        return (
            <TouchableHighlight
                underlayColor="#eeeeee"
                onPress={this.props.onClick}>
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <Icon.Button size={icon_size} name={icon} color="#333" backgroundColor="transparent">
                        </Icon.Button>
                    </View>
                    <Text style={styles.hours}>{text || 'not available'}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingBottom: 5,
        paddingTop:5,
        display: 'flex',
        paddingHorizontal: 10,
    },
    iconContainer: {
        width: 55,
        alignItems:'center',
        justifyContent:'center',
    },
    hours: {
        flex:1,
    }
});

