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
export default class RangeRow extends Component {

    render() {
        const {data} = this.props,
            {channel, text,} = data;

        const icon = 'remove',
            icon_size = ICON_SIZES[channel];

        return (
            <TouchableHighlight
                underlayColor="#999"
                onPress={this.props.onClick}>
                <View style={styles.container}>
                    <Text style={styles.hours}>{text || 'not available'}</Text>
                    <View style={styles.iconContainer}>
                        <Icon.Button onPress={this.props.onRemove} size={icon_size} name={icon} color="#555" backgroundColor="transparent">
                        </Icon.Button>
                    </View>
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
        borderRadius:8,
        borderColor:'#e9e9e9',
        backgroundColor:'#e9e9e9',
        width: 55,
        borderWidth:1,
        paddingLeft:9,
        alignItems:'center',
        justifyContent:'center',
    },
    hours: {
        flex:1,
    }
});

