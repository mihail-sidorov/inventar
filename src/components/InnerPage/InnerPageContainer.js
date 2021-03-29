import { connect } from 'react-redux';
import InnerPage from './InnerPage';

let InnerPageContainer = connect(
    state => ({
        role: state.authState.role,
    }),
    dispatch => ({

    })
)(InnerPage);

export default InnerPageContainer;