import { connect } from 'react-redux';
import authHOC from '../../HOC/authHOC';
import MainPage from './MainPage';

let MainPageContainer = connect(
    state => ({
        role: state.authState.role,
    })
)(MainPage);

export default authHOC(MainPageContainer);