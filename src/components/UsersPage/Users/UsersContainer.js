import { connect } from 'react-redux';
import { departmentNamesGetActionCreator } from '../../../redux/departmentNamesReducer';
import { departmentsLocationsSetActionCreator } from '../../../redux/departmentsLocationsReducer';
import { locationsGetActionCreator } from '../../../redux/locationsReducer';
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
        onLocationsGet: (data) => {
            dispatch(locationsGetActionCreator(data));
        },
        onDepartmentsLocationsGet: (data) => {
            dispatch(departmentsLocationsSetActionCreator(data));
        },
        onDepartmentNamesGet: (data) => {
            dispatch(departmentNamesGetActionCreator(data));
        },
    })
)(Users);

export default UsersContainer;