import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const POSTS_GET = 'POSTS_GET', POST_ADD = 'POST_ADD';

let initialState = {
    posts: {},
};

// Запросы к API
export let postsGet = () => {
    return Axios.get('posts');
}

export let postAdd = (post) => {
    return Axios.post('posts', post);
};

export let postEdit = (post) => Axios.patch('posts', post);

// Создание Action Creators
export let postsGetActionCreator = (data) => {
    return {
        type: POSTS_GET,
        data: data,
    };
}

export let postAddActionCreator = (post) => ({
    type: POST_ADD,
    post: post,
});

let postsReducer = (state = initialState, action) => {
    switch(action.type) {
        case POSTS_GET:
            return {
                ...state,
                posts: arrayToObject(action.data),
            };
        case POST_ADD:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.post.id]: action.post,
                },
            };
        default:
            return state;
    }
}

export default postsReducer;