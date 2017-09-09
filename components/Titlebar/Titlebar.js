import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Titlebar extends Component {

    renderIcon(options) {
        const action = options.left ? this.props.onLeftClick : this.props.onRightClick,
            icon = options.left ? this.props.leftIcon : this.props.rightIcon;

        if (!icon) {
            return null;
        }

        return <Icon.Button onPress={action} name={icon} underlayColor="#eeeeee" color="#333" backgroundColor="transparent">
        </Icon.Button>

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.action}>
                    {this.renderIcon({left: true})}
                </View>
                <Text style={styles.header}>
                    {this.props.title}
                </Text>
                <View style={styles.action}>
                    {this.renderIcon({left: false})}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
        height: 50,
        marginTop:20,
        marginBottom:5,
        borderBottomColor:'#999',
        borderBottomWidth:1,
    },
    action: {
        width: 50,
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

});

