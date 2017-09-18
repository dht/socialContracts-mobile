import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
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
export default class BoxRow extends Component {

    render() {
        const {channel, text} = this.props;

        const icon = ICONS[channel],
            icon_size = ICON_SIZES[channel];

        return (
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <Icon.Button size={icon_size} name={icon} color="#333" backgroundColor="transparent">
                        </Icon.Button>
                    </View>
                    <Text style={styles.hours}>{text || 'loading...'}</Text>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
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

