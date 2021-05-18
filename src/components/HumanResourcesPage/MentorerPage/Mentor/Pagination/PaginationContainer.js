import { connect } from 'react-redux';
import { changeMentorListPaginationActionCreator, makeShortMentorListActionCreator } from '../../../../../redux/mentorerPageReducer';
import Pagination from '../../../../DevicesPage/Pagination/Pagination';

let mapStateToProps = (state) => {
    return {
        currentPage: state.mentorerPageState.mentorList.pagination.currentPage,
        pages: state.mentorerPageState.mentorList.pagination.pages,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => {
            dispatch(changeMentorListPaginationActionCreator(page));
            dispatch(makeShortMentorListActionCreator());
        },
    };
}

let PaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Pagination);

export default PaginationContainer;