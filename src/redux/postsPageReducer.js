const MAKE_SHORT_POSTS = 'MAKE_SHORT_POSTS', CHANGE_PAGE_ON_POSTS_PAGE_PAGINATION = 'CHANGE_PAGE_ON_POSTS_PAGE_PAGINATION', CHANGE_POSTS_PAGE_SEARCH = 'CHANGE_POSTS_PAGE_SEARCH';

let makeShortPosts = (posts, pagination, search, isLastPage) => {
    let searchPosts = {}, shortPosts = {};

    if (search !== '') {
        for (let id in posts) {
            let searchWords = search.split(' ');
            let postAccord = true;

            for (let i = 0; i < searchWords.length; i++) {
                let wordAccord = false;
                let pattern = new RegExp(searchWords[i].toLowerCase());
                let propertiesArr = [];

                for (let property in posts[id]) {
                    switch (property) {
                        case 'post':
                            if (posts[id][property] !== undefined && posts[id][property] !== null && posts[id][property] !== '') {
                                propertiesArr.push(String(posts[id][property]));
                            }
                            break;
                        default:
                            break;
                    }
                }

                for (let i = 0; i < propertiesArr.length; i++) {
                    if (propertiesArr[i].toLowerCase().match(pattern)) {
                        wordAccord = true;
                        break;
                    }
                }

                if (!wordAccord) {
                    postAccord = false;
                    break;
                }
            }

            if (postAccord) {
                searchPosts[id] = posts[id];
            }
        }
    }
    else {
        searchPosts = posts;
    }

    let paginationCount = pagination.count;
    let currentPage = pagination.currentPage;
    
    let pages = Math.floor(Object.keys(searchPosts).length / paginationCount);
    if (Object.keys(searchPosts).length % paginationCount > 0) {
        pages++;
    }
    if (currentPage > pages || isLastPage) {
        currentPage = pages;
    }

    if (currentPage === 0) currentPage = 1;

    let left = (currentPage - 1) * paginationCount + 1;
    let right = left + paginationCount - 1;
    let i = 1;

    for (let id in searchPosts) {
        if (i >= left && i <= right) {
            shortPosts[id] = searchPosts[id];
        }
        i++;
    }

    return {
        shortPosts: shortPosts,
        currentPage: currentPage,
        pages: pages,
    };
}

let initialState = {
    shortPosts: {},
    pagination: {
        count: 5,
        currentPage: 1,
        pages: 0,
    },
    search: '',
};

// Создание Action Creators
export let makeShortPostsActionCreator = (isLastPage = false) => {
    let state = window.store.getState();
    let posts = state.postsState.posts;
    let pagination = state.postsPageState.pagination;
    let search = state.postsPageState.search;

    return {
        type: MAKE_SHORT_POSTS,
        posts: posts,
        pagination: pagination,
        search: search,
        isLastPage: isLastPage,
    };
}

export let changePageOnPostsPagePaginationActionCreator = (page) => {
    return {
        type: CHANGE_PAGE_ON_POSTS_PAGE_PAGINATION,
        page: page,
    };
}

export let changePostsPageSearchActionCreator = (search) => {
    return {
        type: CHANGE_POSTS_PAGE_SEARCH,
        search: search,
    };
}

let postsPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_SHORT_POSTS:
            let makeShortPostsResult = makeShortPosts(action.posts, action.pagination, action.search, action.isLastPage);

            return {
                ...state,
                shortPosts: makeShortPostsResult.shortPosts,
                pagination: {
                    ...state.pagination,
                    currentPage: makeShortPostsResult.currentPage,
                    pages: makeShortPostsResult.pages,
                },
            };
        case CHANGE_PAGE_ON_POSTS_PAGE_PAGINATION:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.page,
                },
            };
        case CHANGE_POSTS_PAGE_SEARCH:
            return {
                ...state,
                search: action.search,
            };
        default:
            return state;
    }
}

export default postsPageReducer;