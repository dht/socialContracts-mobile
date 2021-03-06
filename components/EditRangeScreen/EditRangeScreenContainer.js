import {connect} from 'react-redux'
import EditRangeScreen from './EditRangeScreen'

import {getRange} from 'social-contracts/utils/ranges';
import {saveRangeForCurrent} from 'social-contracts/reducers/appState/appState_actions';

const mapStateToProps = (state, ownProps) => {

    const {uiState} = state,
        {titleHeader, instructions} = uiState,
        range = getRange(state);

    return {
        titleHeader,
        instructions,
        ...range,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        saveRange: (range) => {
            dispatch(saveRangeForCurrent(range));
            ownProps.navigator.pop();
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditRangeScreen)
