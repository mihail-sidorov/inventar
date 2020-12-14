const MAKE_SHORT_USERS = 'MAKE_SHORT_USERS';

let makeShortUsers = (users) => {

    return {
        shortUsers: users,
    };
}

let initialState = {
    search: '',
    pagination: {
        count: 5,
        currentPage: 1,
        pages: 0,
    },
    shortUsers: {},
    wasAdd: false,
};

// Запросы к API

// Создание Action Creators

export let makeShortUsersActionCreator = () => {
    let usersState = window.store.getState().usersState;

    return {
        type: MAKE_SHORT_USERS,
        users: usersState.users,
    };
}

let usersPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_SHORT_USERS:
            let makeShortUsersResult = makeShortUsers(action.users);

            return {
                ...state,
                shortUsers: makeShortUsersResult.shortUsers,
                wasAdd: false,
            };
        default:
            return state;
    }
}

export default usersPageReducer;