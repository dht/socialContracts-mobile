import {connect} from 'react-redux';
import DashboardScreen from './DashboardScreen';

import {setName} from 'social-contracts/reducers/appState/appState_actions';
import {shareContract} from '../../reducers/app_thunks';

import {contractUrl} from '../../constants/Config'
import routes from '../../constants/routes'

import {showModal, closeModal, modalTypes} from '../../reducers/modal/modal_actions'

const mapStateToProps = (state, ownProps) => {
    const {uiState, appState} = state,
        {contractId, isLoading} = uiState,
        {availabilityString} = appState;

    let url = contractUrl(contractId);

    return {
        isLoading,
        availabilityString,
        url,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        share: () => {
          dispatch(shareContract());
        },
        editAvailability: () => {
            ownProps.navigator.push(routes.EDIT_AVAILABILITY);
        },
        showSettingsModal: () => {
            dispatch(showModal(modalTypes.SETTINGS_MODAL, {
                saveSettings: (settings) => {
                    dispatch(setName(settings.name))
                    dispatch(closeModal())
                }
            }))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardScreen)
