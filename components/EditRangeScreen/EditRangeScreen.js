import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';


import Screen from '../Screen/Screen';
import ListHeader from "../ListHeader/ListHeader";
import TimePicker from "../TimePicker/TimePicker";
import {lowerOrEqualTimeString, higherOrEqualTimeString} from "../../utils/ranges";

export default class EditRangeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            start: props.start,
            end: props.end,
            isRange: !!props.end,
            isAdd: true,
        }

        this._setStart = this._setStart.bind(this);
        this._setEnd = this._setEnd.bind(this);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(props) {
        const {id, start, end} = props;

        if (id !== this.state.id) {
            this.setState({
                id,
                start,
                end,
                isRange: !!end
            });
        }
    }

    _setStart(value) {
        let {end} = this.state;

        if (end) {
            end = higherOrEqualTimeString(end, value);
        }

        this.setState({
            start: value,
            end
        });
    }

    _setEnd(value) {
        let {start} = this.state;

        start = lowerOrEqualTimeString(start, value);

        this.setState({
            start,
            end: value
        });
    }

    render() {
        const {titleHeader, instructions, tabbar} = this.props;
        const {id, start, end, isRange} = this.state;
        const noun = isRange ? 'time range' : 'time',
            action = `Save ${noun}`,
            fromLabel = isRange ? 'From' : 'At';

        let props = {};

        if (!tabbar) {
            props = {
                bigIcon: "done",
                onBigClick: () => this.props.saveRange({id, start, end}),
                actionText: action
            }
        }

        return (

            <View style={styles.container}>
                <Screen
                    title={titleHeader}
                    leftIcon="arrow-back"
                    onLeftClick={this.props.navigator.pop}
                    rightIcon="done"
                    onRightClick={() => this.props.saveRange({id, start, end})}
                    {...props}
                >

                    <ListHeader title={instructions}/>

                    <View style={styles.row}>
                        <Text style={styles.text}>{fromLabel}</Text>
                        <TimePicker value={start} onChange={this._setStart}/>
                        {isRange ? <Text style={styles.text}>To</Text> : null}
                        {isRange ? <TimePicker value={end} onChange={this._setEnd}/> : null}
                    </View>

                </Screen>
            </View>
        );
    }
}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'stretch',
            backgroundColor: '#F5FCFF',
        },
        row: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        text: {
            fontSize: 22,
            paddingHorizontal: 6,
        }


    });

