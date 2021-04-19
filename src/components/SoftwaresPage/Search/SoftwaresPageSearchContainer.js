import { connect } from 'react-redux';
import { changePageOnSoftwaresPagePaginationActionCreator, changeSoftwaresPageSearchActionCreator, makeShortSoftwaresActionCreator } from '../../../redux/softwaresPageReducer';
import Search from '../../DevicesPage/Search/Search';

let SoftwaresPageSearchContainer = connect(
    state => ({
        search: state.softwaresPageState.search,
    }),
    dispatch => ({
        onChangeSearch: (value) => {
            dispatch(changeSoftwaresPageSearchActionCreator(value));
            dispatch(changePageOnSoftwaresPagePaginationActionCreator(1));
            dispatch(makeShortSoftwaresActionCreator());
        },
    })
)(Search);

export default SoftwaresPageSearchContainer;