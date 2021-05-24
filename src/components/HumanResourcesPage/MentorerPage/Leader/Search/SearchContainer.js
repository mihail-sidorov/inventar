import { connect } from 'react-redux';
import { changeLeaderListPaginationActionCreator, changeLeaderListSearchActionCreator, makeShortLeaderListActionCreator } from '../../../../../redux/mentorerPageReducer';
import Search from '../../../../DevicesPage/Search/Search';

let SearchContainer = connect(
    state => ({
        search: state.mentorerPageState.leaderList.search,
    }),
    dispatch => ({
        onChangeSearch: value => {
            dispatch(changeLeaderListSearchActionCreator(value));
            dispatch(changeLeaderListPaginationActionCreator(1));
            dispatch(makeShortLeaderListActionCreator());
        },
    })
)(Search);

export default SearchContainer;