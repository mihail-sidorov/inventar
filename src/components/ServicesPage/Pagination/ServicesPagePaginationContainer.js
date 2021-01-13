import { connect } from 'react-redux';
import { changePageOnServicesPagePaginationActionCreator, makeShortServicesActionCreator } from '../../../redux/servicesPageReducer';
import Pagination from '../../DevicesPage/Pagination/Pagination';

let mapStateToProps = (state) => {
    return {
        currentPage: state.servicesPageState.pagination.currentPage,
        pages: state.servicesPageState.pagination.pages,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => {
            dispatch(changePageOnServicesPagePaginationActionCreator(page));
            dispatch(makeShortServicesActionCreator());
        },
    };
}

let ServicesPagePaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Pagination);

export default ServicesPagePaginationContainer;