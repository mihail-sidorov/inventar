import { connect } from 'react-redux';
import { changeDevicesPageActionCreator, makeShortDevicesActionCreator } from '../../../redux/devicesPageReducer';
import Pagination from './Pagination';

let mapStateToProps = (state) => {
    return {
        currentPage: state.devicesPageState.pagination.currentPage,
        pages: state.devicesPageState.pagination.pages,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => {
            dispatch(changeDevicesPageActionCreator(page));
            dispatch(makeShortDevicesActionCreator());
        },
    };
}

let DevicesPaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Pagination);

export default DevicesPaginationContainer;