import { connect } from 'react-redux';
import authHOC from '../../HOC/authHOC';
import { makeShortPostsActionCreator } from '../../redux/postsPageReducer';
import { postAdd, postAddActionCreator, postsGetActionCreator } from '../../redux/postsReducer';
import PostPageAdd from './PostPageAdd';

let PostPageAddContainer = connect(
    state => ({

    }),
    dispatch => ({
        onSubmit: (values, props) => {
            if (values.post) {
                postAdd(values)
                    .then(res => {
                        dispatch(postAddActionCreator(res.data));
                        dispatch(makeShortPostsActionCreator(true));
                        props.history.push('/posts');
                    })
                    .catch(err => console.log(err));
            }
        },
        postsSet: (data) => {
            dispatch(postsGetActionCreator(data));
        },
    })
)(PostPageAdd);

export default authHOC(PostPageAddContainer);