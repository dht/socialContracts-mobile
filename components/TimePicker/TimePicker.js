import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';


import DateTimePicker from 'react-native-modal-datetime-picker';
import {timeStringToDate, dateToTimeString} from '../../utils/ranges';

export default class TimePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(props) {
        const {value} = props;

        console.log('componentWillReceiveProps value -> ', value);

        if (value !== this.state.value) {
            this.setState({
                value,
            });
        }
    }

    _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    _handleDatePicked = date => {
        const value = dateToTimeString(date);
        this.props.onChange(value);
        this._hideDateTimePicker();
    };

    render() {
        const {value} = this.state;

        const date = timeStringToDate(value);

        console.log('value, data -> ', value, date);

        return (
            <TouchableOpacity onPress={this._showDateTimePicker}>
                <View style={styles.container}>

                    <Text style={styles.text}>{value}</Text>

                    <DateTimePicker
                        mode={"time"}
                        date={date}
                        is24Hour={true}
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 2,
    },
    text: {
        fontSize: 22,
        textAlign: 'center',
        lineHeight: 22,
        paddingVertical: 10,
        color: '#373F42',
    }


});

