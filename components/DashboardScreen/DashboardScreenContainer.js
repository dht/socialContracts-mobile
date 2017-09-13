import {connect} from 'react-redux'
import DashboardScreen from './DashboardScreen'

import {loadApp, openContractInBrowser} from '../../reducers/app_thunks';
import {setName} from '../../reducers/appState/appState_actions';
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
        loadApp: () => {
            dispatch(loadApp());
        },
        openLink:()=> {
            dispatch(openContractInBrowser());
        },
        saveSettings: (settings) => {
            dispatch(setName(settings.name))
        },
        onChangeTab: ({i}) => {
            dispatch(setCurrentPlanType(i === 0 ? 'weekday' : 'weekend'));
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardScreen)
