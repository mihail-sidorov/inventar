import { connect } from 'react-redux';
import Post from './Post';

let PostContainer = (id) => {
    return connect(
        state => ({
            post: state.postsState.posts[id],
        }),
        dispatch => ({
            onGoToPostEdit: (props) => {
                props.history.push(`/posts/${props.post.id}`);
            },
        })
    )(Post);
}

export default PostContainer;