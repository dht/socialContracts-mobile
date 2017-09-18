import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import Titlebar from '../Titlebar/Titlebar';
import BigButton from '../BigButton/BigButton';

export default class Screen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Titlebar
                    title={this.props.title}
                    leftIcon={this.props.leftIcon}
                    onLeftClick={this.props.onLeftClick}
                    rightIcon={this.props.rightIcon}
                    onRightClick={this.props.onRightClick}
                />

                <View style={styles.content}>
                    {this.props.children}
                </View>

                {this.props.actionText ? <View style={styles.cta}>
                    <BigButton
                        icon={this.props.bigIcon}
                        onClick={this.props.onBigClick}
                        title={this.props.actionText}/>
                </View> : null}
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
    content: {
        flex: 1,
    },
    cta: {
        alignItems: 'stretch',
        height: 80,
        borderTopWidth: 1,
        borderTopColor: '#999',
    }


});

