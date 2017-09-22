import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import BoxRow from './row/BoxRow';

export default class Box extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const {availability} = this.props;

        return (

            <View style={styles.container}>
                <BoxRow channel="phone" text={availability['phone']} />
                <BoxRow channel="whatsapp" text={availability['whatsapp']} />
                <BoxRow channel="email" text={availability['email']} />
                <BoxRow channel="facebook" text={availability['facebook']} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:200,
        borderWidth:1,
        borderColor:'#999',
        borderRadius:10,
        backgroundColor:'#f9f9f9',
        width:280,
        alignSelf:'center',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    tabs: {
        flex: 1,
    },
    hours: {
        flex: 1,
    }


});

