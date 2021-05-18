import { connect } from 'react-redux';
import { changeProtegeListPaginationActionCreator, makeShortProtegeListActionCreator } from '../../../../../redux/mentorerPageReducer';
import Pagination from '../../../../DevicesPage/Pagination/Pagination';

let mapStateToProps = (state) => {
    return {
        currentPage: state.mentorerPageState.protegeList.pagination.currentPage,
        pages: state.mentorerPageState.protegeList.pagination.pages,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => {
            dispatch(changeProtegeListPaginationActionCreator(page));
            dispatch(makeShortProtegeListActionCreator());
        },
    };
}

let PaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Pagination);

export default PaginationContainer;