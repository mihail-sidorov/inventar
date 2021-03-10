import { connect } from 'react-redux';
import { changeEmployersPageSearchActionCreator, changePageOnEmployersPagePaginationActionCreator, makeShortEmployersActionCreator } from '../../../redux/employersPageReducer';
import Search from '../../DevicesPage/Search/Search';

let EmployersPageSearchContainer = connect(
    state => ({
        search: state.employersPageState.search,
    }),
    dispatch => ({
        onChangeSearch: (value) => {
            dispatch(changeEmployersPageSearchActionCreator(value));
            dispatch(changePageOnEmployersPagePaginationActionCreator(1));
            dispatch(makeShortEmployersActionCreator());
        },
    })
)(Search);

export default EmployersPageSearchContainer;