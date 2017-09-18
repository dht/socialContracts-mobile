import { connect } from 'react-redux'
import RootModal from './RootModal'

import { closeModal } from '../../reducers/modal/modal_actions';

const mapStateToProps = (state, ownProps) => {

    const { modal } = state;

    return {
        modal
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        handleClose: (modalProps = {}) => {
            dispatch(closeModal());

            if (modalProps.handleClose) {
                modalProps.handleClose.call(this);
            }
        }
    }
}

const RootModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RootModal)

export default RootModalContainer
