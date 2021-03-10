import { connect } from 'react-redux';
import authHOC from '../../HOC/authHOC';
import { loginDelete, setAuthDataActionCreator } from '../../redux/authReducer';
import { usersGetActionCreator } from '../../redux/usersReducer';
import Header from './Header';

let HeaderContainer = connect(
    state => {
        let userId = state.authState.userId;
        let fio = '';

        if (userId !== null && state.usersState.users[userId] !== undefined) {
            fio = state.usersState.users[userId].full_name;
        }

        return {
            fio: fio,
        };
    },
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
        onUsersGet: (data) => {
            dispatch(usersGetActionCreator(data));
        },
    })
)(Header);

export default authHOC(HeaderContainer);