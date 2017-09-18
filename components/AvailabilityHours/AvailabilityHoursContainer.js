import {connect} from 'react-redux'
import AvailabilityHours from './AvailabilityHours';
import {hoursToList} from '../../utils/ranges';
import {setCurrentChannel, setTitlebarHeader} from '../../reducers/UIState/UIState_actions';
import routes from '../../constants/routes';

const getHours = (state, ownProps) => {
    const {appState, uiState} = state,
        {plans} = appState,
        {isLoading} = uiState,
        {weekday, weekend} = plans;

    if (isLoading) {
        return false;
    }

    switch (ownProps.hours) {
        case 'weekday':
            return hoursToList(weekday);
        case 'weekend':
            return hoursToList(weekend);
    }
}

const mapStateToProps = (state, ownProps) => {

    let hours = getHours(state, ownProps) || [
        {channel:'phone', text:'loading...',},
        {channel:'whatsapp', text:'loading...',},
        {channel:'email', text:'loading...',},
        {channel:'facebook', text:'loading...',},
    ]

    return {
        hours,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onRowClick: (rowData) => {
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
