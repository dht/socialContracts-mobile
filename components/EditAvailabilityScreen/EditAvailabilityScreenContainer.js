import {connect} from 'react-redux'
import EditAvailabilityScreen from './EditAvailabilityScreen'

import {setCurrentPlanType} from '../../reducers/UIState/UIState_actions';

const mapStateToProps = (state, ownProps) => {
    const {uiState} = state,
        {isLoading} = uiState;

    return {
        isLoading
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pop: () => {
            ownProps.navigator.pop();
        },
        onChangeTab: ({i}) => {
            dispatch(setCurrentPlanType(i === 0 ? 'weekday' : 'weekend'));
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditAvailabilityScreen)
