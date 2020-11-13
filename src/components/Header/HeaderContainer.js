import { connect } from 'react-redux';
import authHOC from '../../HOC/authHOC';
import { loginDelete, setAuthDataActionCreator } from '../../redux/authReducer';
import Header from './Header';

let HeaderContainer = connect(
    state => ({

    }),
    dispatch => ({
        onLogout: () => {
            loginDelete()
                .then((response) => {
                    dispatch(setAuthDataActionCreator(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    })
)(Header);

HeaderContainer = authHOC(HeaderContainer);

export default HeaderContainer;