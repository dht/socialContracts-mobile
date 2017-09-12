import {connect} from 'react-redux'
import AvailabilityHours from './AvailabilityHours';
import {hoursToList} from '../../utils/ranges';
import {setCurrentChannel, setTitlebarHeader} from '../../reducers/UIState/UIState_actions';
import routes from '../../constants/routes';

const mapStateToProps = (state, ownProps) => {

    const {appState} = state,
        {plans} = appState,
        {weekday, weekend} = plans;

    let hours;

    switch (ownProps.hours) {
        case 'weekday':
            hours = hoursToList(weekday);
            break;
        case 'weekend':
            hours = hoursToList(weekend);
            break;
    }

    console.log('hours -> ', hours);

    return {
        hours: hours
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onRowClick: (rowData) => {
            console.log('rowData -> ', rowData, ownProps);
            dispatch(setTitlebarHeader(`${rowData.channel} (${ownProps.hours})`));
            dispatch(setCurrentChannel(rowData.channel));
            ownProps.navigator.push(routes.RANGES);
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AvailabilityHours)
