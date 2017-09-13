import {connect} from 'react-redux'
import AvailabilityHours from './AvailabilityHours';
import {hoursToList} from '../../utils/ranges';
import {setCurrentChannel, setTitlebarHeader} from '../../reducers/UIState/UIState_actions';
import routes from '../../constants/routes';

const mapStateToProps = (state, ownProps) => {

    console.log('true5 -> ', true);

    const {appState, uiState} = state,
        {plans} = appState,
        {isLoading} = uiState,
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

    if (isLoading) {
        hours = [
            {channel:'phone', text:'loading...',},
            {channel:'whatsapp', text:'loading...',},
            {channel:'email', text:'loading...',},
            {channel:'facebook', text:'loading...',},
        ]
    }

    return {
        hours,
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
