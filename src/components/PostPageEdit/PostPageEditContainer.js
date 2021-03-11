import { connect } from 'react-redux';
import { postAddActionCreator, postEdit, postsGetActionCreator } from '../../redux/postsReducer';
import PostPageEdit from './PostPageEdit';
import { initialize } from 'redux-form';
import authHOC from '../../HOC/authHOC';

let PostPageEditContainer = connect(
    state => ({

    }),
    dispatch => ({
        onSubmit: (values) => {
            if (values.post) {
                postEdit(values)
                    .then((res) => {
                        dispatch(postAddActionCreator(res.data));
                        alert('Должность отредактирована!');
                    })
                    .catch((error) => console.log(error));
            }
        },
        postsSet: (data) => {
            dispatch(postsGetActionCreator(data));
        },
        onInitialValuesSet: (postId, history) => {
            let state = window.store.getState();
            
            if (state.postsState.posts[postId] === undefined) {
                history.push('/posts');
            }
            else {
                let initialValues = {...state.postsState.posts[postId]};
                dispatch(initialize('postEditForm', initialValues));
            }
        },
    })
)(PostPageEdit);

export default authHOC(PostPageEditContainer);