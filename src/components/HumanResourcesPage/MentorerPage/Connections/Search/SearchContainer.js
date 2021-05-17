import { connect } from 'react-redux';
import { changeHrListPaginationActionCreator, changeHrListSearchActionCreator, makeShortHrListActionCreator } from '../../../../../redux/mentorerPageReducer';
import Search from '../../../../DevicesPage/Search/Search';

let SearchContainer = connect(
    state => ({
        search: state.mentorerPageState.hrList.search,
    }),
    dispatch => ({
        onChangeSearch: value => {
            dispatch(changeHrListSearchActionCreator(value));
            dispatch(changeHrListPaginationActionCreator(1));
            dispatch(makeShortHrListActionCreator());
        },
    })
)(Search);

export default SearchContainer;