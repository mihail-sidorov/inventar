import { connect } from 'react-redux';
import { resetDeviceActionCreator } from '../../redux/deviceSavePageReducer';
import InnerPage from './InnerPage';

let InnerPageContainer = connect(
    state => ({

    }),
    dispatch => ({
        onResetDevice: () => {
            dispatch(resetDeviceActionCreator());
        },
    })
)(InnerPage);

export default InnerPageContainer;