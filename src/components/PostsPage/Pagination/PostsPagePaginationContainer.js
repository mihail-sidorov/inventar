import { connect } from 'react-redux';
import { changePageOnPostsPagePaginationActionCreator, makeShortPostsActionCreator } from '../../../redux/postsPageReducer';
import Pagination from '../../DevicesPage/Pagination/Pagination';

let mapStateToProps = (state) => {
    return {
        currentPage: state.postsPageState.pagination.currentPage,
        pages: state.postsPageState.pagination.pages,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => {
            dispatch(changePageOnPostsPagePaginationActionCreator(page));
            dispatch(makeShortPostsActionCreator());
        },
    };
}

let PostsPagePaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Pagination);

export default PostsPagePaginationContainer;