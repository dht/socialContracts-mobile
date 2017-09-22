import {connect} from 'react-redux'
import Settings from './Settings'

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
)(Settings)
