import { connect } from 'react-redux';
import { changeDepartmentNamesPageSearchActionCreator, changePageOnDepartmentNamesPagePaginationActionCreator, makeShortDepartmentNamesActionCreator } from '../../../redux/departmentNamesPageReducer';
import Search from '../../DevicesPage/Search/Search';

let DepartmentNamesPageSearchContainer = connect(
    state => ({
        search: state.departmentNamesPageState.search,
    }),
    dispatch => ({
        onChangeSearch: (value) => {
            dispatch(changeDepartmentNamesPageSearchActionCreator(value));
            dispatch(changePageOnDepartmentNamesPagePaginationActionCreator(1));
            dispatch(makeShortDepartmentNamesActionCreator());
        },
    })
)(Search);

export default DepartmentNamesPageSearchContainer;