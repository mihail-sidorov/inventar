import { connect } from 'react-redux';
import { changePageOnPostsPagePaginationActionCreator, changePostsPageSearchActionCreator, makeShortPostsActionCreator } from '../../../redux/postsPageReducer';
import Search from '../../DevicesPage/Search/Search';

let PostsPageSearchContainer = connect(
    state => ({
        search: state.postsPageState.search,
    }),
    dispatch => ({
        onChangeSearch: (value) => {
            dispatch(changePostsPageSearchActionCreator(value));
            dispatch(changePageOnPostsPagePaginationActionCreator(1));
            dispatch(makeShortPostsActionCreator());
        },
    })
)(Search);

export default PostsPageSearchContainer;