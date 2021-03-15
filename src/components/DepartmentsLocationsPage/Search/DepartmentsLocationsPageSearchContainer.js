import { connect } from 'react-redux';
import { changeDepartmentsLocationsPageSearchActionCreator, changePageOnDepartmentsLocationsPagePaginationActionCreator, makeShortDepartmentsLocationsActionCreator } from '../../../redux/departmentsLocationsPageReducer';
import Search from '../../DevicesPage/Search/Search';

let DepartmentsLocationsPageSearchContainer = connect(
    state => ({
        search: state.departmentsLocationsPageState.search,
    }),
    dispatch => ({
        onChangeSearch: (value) => {
            dispatch(changeDepartmentsLocationsPageSearchActionCreator(value));
            dispatch(changePageOnDepartmentsLocationsPagePaginationActionCreator(1));
            dispatch(makeShortDepartmentsLocationsActionCreator());
        },
    })
)(Search);

export default DepartmentsLocationsPageSearchContainer;