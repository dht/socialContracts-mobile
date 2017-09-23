import {connect} from 'react-redux';
import App from './App';

import {loadApp} from '../reducers/app_thunks';
import {setName} from 'social-contracts/reducers/appState/appState_actions';
import {setCurrentPlanType} from '../reducers/UIState/UIState_actions';

const mapStateToProps = (state, ownProps) => {
    return {
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadApp: () => {
            dispatch(loadApp());
        },
        saveSettings: (settings) => {
            dispatch(setName(settings.name))
        },
        onChangeTab: (weekday) => {
            dispatch(setCurrentPlanType(weekday ? 'weekday' : 'weekend'));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
