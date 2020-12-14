import { connect } from 'react-redux';
import { changeUsersSearchActionCreator, makeShortUsersActionCreator } from '../../../redux/usersPageReducer';
import Search from '../../DevicesPage/Search/Search';

let UsersSearchContainer = connect(
    state => ({
        search: state.usersPageState.search,
    }),
    dispatch => ({
        onChangeSearch: (value) => {
            dispatch(changeUsersSearchActionCreator(value));
            dispatch(makeShortUsersActionCreator());
        },
    })
)(Search);

export default UsersSearchContainer;