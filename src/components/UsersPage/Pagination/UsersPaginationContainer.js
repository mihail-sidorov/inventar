import { connect } from 'react-redux';
import { changeUsersPageActionCreator, makeShortUsersActionCreator } from '../../../redux/usersPageReducer';
import Pagination from '../../DevicesPage/Pagination/Pagination';

let mapStateToProps = (state) => {
    return {
        currentPage: state.usersPageState.pagination.currentPage,
        pages: state.usersPageState.pagination.pages,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => {
            dispatch(changeUsersPageActionCreator(page));
            dispatch(makeShortUsersActionCreator());
        },
    };
}

let UsersPaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Pagination);

export default UsersPaginationContainer;