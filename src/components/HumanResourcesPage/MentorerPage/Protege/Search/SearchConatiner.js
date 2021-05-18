import { connect } from 'react-redux';
import { changeProtegeListPaginationActionCreator, changeProtegeListSearchActionCreator, makeShortProtegeListActionCreator } from '../../../../../redux/mentorerPageReducer';
import Search from '../../../../DevicesPage/Search/Search';

let SearchContainer = connect(
    state => ({
        search: state.mentorerPageState.protegeList.search,
    }),
    dispatch => ({
        onChangeSearch: value => {
            dispatch(changeProtegeListSearchActionCreator(value));
            dispatch(changeProtegeListPaginationActionCreator(1));
            dispatch(makeShortProtegeListActionCreator());
        },
    })
)(Search);

export default SearchContainer;