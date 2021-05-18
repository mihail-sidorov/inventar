import { connect } from 'react-redux';
import { changeMentorListPaginationActionCreator, changeMentorListSearchActionCreator, makeShortMentorListActionCreator } from '../../../../../redux/mentorerPageReducer';
import Search from '../../../../DevicesPage/Search/Search';

let SearchContainer = connect(
    state => ({
        search: state.mentorerPageState.mentorList.search,
    }),
    dispatch => ({
        onChangeSearch: value => {
            dispatch(changeMentorListSearchActionCreator(value));
            dispatch(changeMentorListPaginationActionCreator(1));
            dispatch(makeShortMentorListActionCreator());
        },
    })
)(Search);

export default SearchContainer;