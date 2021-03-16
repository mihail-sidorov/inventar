import { connect } from 'react-redux';
import { changePageOnPostsDepartmentsLocationsPagePaginationActionCreator, changePostsDepartmentsLocationsPageSearchActionCreator, makeShortPostsDepartmentsLocationsActionCreator } from '../../../redux/postsDepartmentsLocationsPageReducer';
import Search from '../../DevicesPage/Search/Search';

let PostsDepartmentsLocationsPageSearchContainer = connect(
    state => ({
        search: state.postsDepartmentsLocationsPageState.search,
    }),
    dispatch => ({
        onChangeSearch: (value) => {
            dispatch(changePostsDepartmentsLocationsPageSearchActionCreator(value));
            dispatch(changePageOnPostsDepartmentsLocationsPagePaginationActionCreator(1));
            dispatch(makeShortPostsDepartmentsLocationsActionCreator());
        },
    })
)(Search);

export default PostsDepartmentsLocationsPageSearchContainer;