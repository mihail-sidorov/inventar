import { connect } from 'react-redux';
import { makeShortPostsActionCreator } from '../../../redux/postsPageReducer';
import { postsGetActionCreator } from '../../../redux/postsReducer';
import Posts from './Posts';

let PostsContainer = connect(
    state => ({
        posts: state.postsPageState.shortPosts,
    }),
    dispatch => ({
        postsSet: (postsArr) => {
            dispatch(postsGetActionCreator(postsArr));
        },
        shortPostsSet: () => {
            dispatch(makeShortPostsActionCreator());
        },
    })
)(Posts);

export default PostsContainer;