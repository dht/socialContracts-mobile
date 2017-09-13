import {connect} from 'react-redux'
import RangesScreen from './RangesScreen'

import {rangesToList, getRanges, newValueForChannel, nextId } from '../../utils/ranges';
import routes from '../../constants/routes';
import {listHeaderForChannel, addVerbTextForChannel, instructionsForChannel} from '../../constants/texts';
import {addRangeForCurrent, deleteRangeById,} from '../../reducers/appState/appState_actions';
import {setInstructions, setCurrentRangeId,} from '../../reducers/UIState/UIState_actions';

const mapStateToProps = (state, ownProps) => {

    console.log('true3 -> ', true);

    const {uiState} = state,
        {currentChannel, titleHeader} = uiState,
        ranges = getRanges(state) || {},
        listHeader = listHeaderForChannel(currentChannel, ranges.length > 0),
        addVerbText = addVerbTextForChannel(currentChannel),
        newId = nextId(state);

    return {
        titleHeader,
        currentChannel,
        listHeader,
        addVerbText,
        ranges: rangesToList(ranges),
        newId,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onRemove: (rowData) => {
            dispatch(deleteRangeById(rowData.id));
        },
        addRange: (channel, newId) => {
            dispatch(setInstructions(instructionsForChannel(channel, true)));
            dispatch(addRangeForCurrent(newValueForChannel(channel)));
            dispatch(setCurrentRangeId(newId));
            ownProps.navigator.push(routes.EDIT_RANGE)
        },
        pop: () => {
            ownProps.navigator.pop();
        },
        editRange: (rowData, channel) => {
            dispatch(setInstructions(instructionsForChannel(channel, false)));
            dispatch(setCurrentRangeId(rowData.id));
            ownProps.navigator.push(routes.EDIT_RANGE)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RangesScreen)
