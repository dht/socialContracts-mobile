import {connect} from 'react-redux'
import SettingsDialog from './SettingsDialog'

import {loadApp} from '../../reducers/app_thunks';

const mapStateToProps = (state, ownProps) => {
    const {appState} = state,
        {settings} = appState,
        {name} = settings;

    return {
        name,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsDialog)
