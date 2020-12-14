import { connect } from 'react-redux';
import { postDepLocsGetActionCreator } from '../../../redux/postDepLocsReducer';
import { makeShortUsersActionCreator } from '../../../redux/usersPageReducer';
import { usersGetActionCreator } from '../../../redux/usersReducer';
import Users from './Users';

let UsersContainer = connect(
    state => ({
        users: state.usersPageState.shortUsers,
    }),
    dispatch => ({
        onUsersGet: (data) => {
            dispatch(usersGetActionCreator(data));
        },
        onPostDepLocsGet: (data) => {
            dispatch(postDepLocsGetActionCreator(data));
        },
        onMakeShortUsers: () => {
            dispatch(makeShortUsersActionCreator());
        },
    })
)(Users);

export default UsersContainer;