import {connect} from 'react-redux';
import App from './App';

import {loadApp} from '../reducers/app_thunks';

const mapStateToProps = (state, ownProps) => {
    return {
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadApp: () => {
            dispatch(loadApp());
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
