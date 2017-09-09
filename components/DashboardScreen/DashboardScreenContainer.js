import {connect} from 'react-redux'
import {Linking} from 'react-native'
import DashboardScreen from './DashboardScreen'

import {loadApp} from '../../reducers/app_thunks';

const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadApp: () => {
            dispatch(loadApp());
        },
        openLink: () => {

        },

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardScreen)
