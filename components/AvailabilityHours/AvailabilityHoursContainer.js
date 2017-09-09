import {connect} from 'react-redux'
import AvailabilityHours from './AvailabilityHours';
import {hoursToList} from '../../utils/ranges';

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
        setPlan: (id, plan) => {
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AvailabilityHours)
