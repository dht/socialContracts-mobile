import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    Modal,
} from 'react-native';

import Button from '../../BigButton/Button';
import Swiper from 'react-native-swiper';

export default class OnboardingModal extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Modal animationType={"slide"}
                   transparent={false}
                   visible={this.props.visible}>
                <Swiper style={styles.wrapper} index={0} showsButtons={true}
                        activeDotColor="#333"
                        loop={false}
                >
                    <View style={styles.slide1}>
                        <Text style={styles.text}>Social Contract</Text>
                        <Text style={styles.subtext}>Set your availability hours</Text>
                    </View>
                    <View style={styles.slide1}>
                        <Text style={styles.text}>Step 1</Text>
                        <Text style={styles.subtext}>Set availability hours</Text>
                        <Image style={styles.image1} source={require('../../../images/hours.jpg')}/>
                    </View>
                    <View style={styles.slide1}>
                        <Text style={styles.text}>Step 2</Text>
                        <Text style={styles.subtext}>Generate a unique link</Text>
                        <Image style={styles.image2} source={require('../../../images/chrome.jpg')}/>
                    </View>
                    <View style={styles.slide1}>
                        <Text style={styles.text}>Step 3</Text>
                        <Text style={styles.subtext}>Share your link with others</Text>
                        <Image style={styles.image3} source={require('../../../images/signature.jpg')}/>
                        <Button title="Start" onClick={this.props.handleClose}/>
                    </View>
                </Swiper>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fefefe',
    },
    text: {
        marginTop: 100,
        color: '#333',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtext: {
        color: '#333',
        fontSize: 18,
    },
    image1: {
        marginTop: 160,
        resizeMode: 'contain',
        width: 300,
        height: 200,
    },
    image2: {
        marginTop: 160,
        resizeMode: 'contain',
        width: 300,
        height: 200,
    },
    image3: {
        marginTop: 120,
        resizeMode: 'contain',
        width: 220,
        height: 100,
        marginBottom: 30,
    },
});

