import {connect} from 'react-redux'
import {Linking} from 'react-native'
import DashboardScreen from './DashboardScreen'

import {loadApp} from '../../reducers/app_thunks';
import {setName} from '../../reducers/appState/appState_actions';

const mapStateToProps = (state, ownProps) => {
    return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadApp: () => {
            dispatch(loadApp());
        },
        openLink:()=> {

        },
        saveSettings: (settings) => {
            dispatch(setName(settings.name))
        },

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardScreen)