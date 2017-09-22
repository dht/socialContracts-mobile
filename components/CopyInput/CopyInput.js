import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Clipboard,
} from 'react-native';

export default class CopyInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMessage: false
        }

        this.copyToClipboard = this.copyToClipboard.bind(this);
    }

    copyToClipboard() {
        Clipboard.setString(this.props.text);
        this.setState({showMessage: true});

        setTimeout(() => {
            this.setState({showMessage: false});
        }, 3000);
    }

    render() {
        const {showMessage} = this.state;

        return (
            <View style={styles.container}>
                <TouchableHighlight
                    underlayColor="#eeeeee"
                    onPress={this.copyToClipboard}>
                    <Text style={styles.text}>{this.props.text}</Text>
                </TouchableHighlight>
                {showMessage ? <Text style={styles.clipboard}>Link copied to clipboard</Text> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    text: {
        marginTop: 5,
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderColor: '#a9a9a9',
        borderWidth: 1,
        borderRadius: 2,
    },
    clipboard: {
        marginTop: 7,
        fontSize: 12,
        color: 'gray',
    },
});

