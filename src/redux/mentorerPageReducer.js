import Axios from "../config/axiosConfig";
import { countPages } from "../config/globals";
import isEmptyObject from "../functions/isEmptyObject";

const SHOW_COMPONENT_CHANGE = 'SHOW_COMPONENT_CHANGE', MENTORING_SET = 'MENTORING_SET', SHOW_COMPONENTS_SET = 'SHOW_COMPONENTS_SET', MENTOR_SEARCH_SET = 'MENTOR_SEARCH_SET', PROTEGE_SEARCH_SET = 'PROTEGE_SEARCH_SET', MENTOR_ID_SET = 'MENTOR_ID_SET', PROTEGE_ID_SET = 'PROTEGE_ID_SET', RESET_MENTORER_PAGE_STATE = 'RESET_MENTORER_PAGE_STATE', MAKE_SHORT_HR_LIST = 'MAKE_SHORT_HR_LIST', CHANGE_HR_LIST_SEARCH = 'CHANGE_HR_LIST_SEARCH', CHANGE_HR_LIST_PAGINATION = 'CHANGE_HR_LIST_PAGINATION', SET_HR_LIST_IS_LAST_PAGE = 'SET_HR_LIST_IS_LAST_PAGE', MAKE_SHORT_MENTOR_LIST = 'MAKE_SHORT_MENTOR_LIST', CHANGE_MENTOR_LIST_SEARCH = 'CHANGE_MENTOR_LIST_SEARCH', CHANGE_MENTOR_LIST_PAGINATION = 'CHANGE_MENTOR_LIST_PAGINATION', MAKE_SHORT_PROTEGE_LIST = 'MAKE_SHORT_PROTEGE_LIST', CHANGE_PROTEGE_LIST_SEARCH = 'CHANGE_PROTEGE_LIST_SEARCH', CHANGE_PROTEGE_LIST_PAGINATION = 'CHANGE_PROTEGE_LIST_PAGINATION';

let makeShort = (entitys, pagination, search, users) => {
    let searchEntitys = [], shortEntitys = [];

    if (search !== '') {
        for (let entity of entitys) {
            let searchWords = search.split(' ');
            let entityAccord = true;

            for (let i = 0; i < searchWords.length; i++) {
                let wordAccord = false;
                let pattern = new RegExp(searchWords[i].toLowerCase());
                let propertiesArr = [];

                for (let property in entity) {
                    switch (property) {
                        case 'mentor_id':
                            if (!isEmptyObject(users)) {
                                let mentorName = users[entity.mentor_id]?.full_name;
                                if (mentorName !== undefined && mentorName !== null && mentorName !== '') {
                                    propertiesArr.push(String(mentorName));
                                }
                            }
                            break;
                        case 'protege_id':
                            if (!isEmptyObject(users)) {
                                let protegeName = users[entity.protege_id]?.full_name;
                                if (protegeName !== undefined && protegeName !== null && protegeName !== '') {
                                    propertiesArr.push(String(protegeName));
                                }
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
                    entityAccord = false;
                    break;
                }
            }

            if (entityAccord) {
                searchEntitys.push(entity);
            }
        }
    }
    else {
        searchEntitys = entitys;
    }

    let paginationCount = pagination.count;
    let currentPage = pagination.currentPage;
    let isLastPage = pagination.isLastPage;
    
    let pages = Math.floor(Object.keys(searchEntitys).length / paginationCount);
    if (Object.keys(searchEntitys).length % paginationCount > 0) {
        pages++;
    }
    if (currentPage > pages || isLastPage) {
        currentPage = pages;
    }

    if (currentPage === 0) currentPage = 1;

    let left = (currentPage - 1) * paginationCount + 1;
    let right = left + paginationCount - 1;
    let i = 1;

    for (let searchEntity of searchEntitys) {
        if (i >= left && i <= right) {
            shortEntitys.push(searchEntity);
        }
        i++;
    }

    return {
        shortEntitys,
        currentPage,
        pages,
    };
}

let initialState = {
    showComponents: {},
    mentoringHr: [],
    mentoringMentor: [],
    mentoringProtege: [],
    mentorSearch: {},
    protegeSearch: {},
    mentorId: null,
    protegeId: null,
    hrList: {
        shortEntitys: [],
        search: '',
        pagination: {
            count: countPages,
            currentPage: 1,
            pages: 0,
            isLastPage: false,
        },
    },
    mentorList: {
        shortEntitys: [],
        search: '',
        pagination: {
            count: countPages,
            currentPage: 1,
            pages: 0,
            isLastPage: false,
        },
    },
    protegeList: {
        shortEntitys: [],
        search: '',
        pagination: {
            count: countPages,
            currentPage: 1,
            pages: 0,
            isLastPage: false,
        },
    },
};

// Запросы к API

export let mentoringGet = () => Axios.get('/mentoring');

export let mentoringPost = (mentorId, protegeId) => Axios.post('/mentoring', {mentor_id: mentorId, protege_id: protegeId});

// Создание Action Creators

export let showComponentsChangeActionCreator = component => ({
    type: SHOW_COMPONENT_CHANGE,
    component,
});

export let mentoringSetActionCreator = (mentoringHr, mentoringMentor, mentoringProtege) => ({
    type: MENTORING_SET,
    mentoringHr,
    mentoringMentor,
    mentoringProtege,
});

export let showComponentsSetActionCreator = obj => ({
    type: SHOW_COMPONENTS_SET,
    obj,
});

export let mentorSearchSetActionCreator = search => {
    let state = window.store.getState();
    let users = state.usersState.users;
    let mentorId = state.mentorerPageState.mentorId;
    let protegeId = state.mentorerPageState.protegeId;
    let mentorSearch = {};
    let pattern = new RegExp(search.toLowerCase());

    if(search !== '') {
        for (let id in users) {
            if (id != mentorId && id != protegeId && users[id].full_name.toLowerCase().match(pattern)) {
                mentorSearch[id] = users[id];
            }
        }
    }

    return {
        type: MENTOR_SEARCH_SET,
        mentorSearch,
    }
};

export let protegeSearchSetActionCreator = search => {
    let state = window.store.getState();
    let users = state.usersState.users;
    let mentorId = state.mentorerPageState.mentorId;
    let protegeId = state.mentorerPageState.protegeId;
    let protegeSearch = {};
    let pattern = new RegExp(search.toLowerCase());

    if(search !== '') {
        for (let id in users) {
            if (id != mentorId && id != protegeId && users[id].full_name.toLowerCase().match(pattern)) {
                protegeSearch[id] = users[id];
            }
        }
    }

    return {
        type: PROTEGE_SEARCH_SET,
        protegeSearch,
    }
};

export let mentorIdSetActionCreator = id => ({
    type: MENTOR_ID_SET,
    id,
});

export let protegeIdSetActionCreator = id => ({
    type: PROTEGE_ID_SET,
    id,
});

export let resetMentorerPageStateActionCreator = () => ({
    type: RESET_MENTORER_PAGE_STATE,
});

export let makeShortHrListActionCreator = () => {
    let state = window.store.getState();
    let entitys = state.mentorerPageState.mentoringHr;
    let pagination = state.mentorerPageState.hrList.pagination;
    let search = state.mentorerPageState.hrList.search;
    let users = state.usersState.users;
    let makeShortHrListResult = makeShort(entitys, pagination, search, users);

    return {
        type: MAKE_SHORT_HR_LIST,
        makeShortHrListResult,
    };
};

export let makeShortMentorListActionCreator = () => {
    let state = window.store.getState();
    let entitys = state.mentorerPageState.mentoringMentor;
    let pagination = state.mentorerPageState.mentorList.pagination;
    let search = state.mentorerPageState.mentorList.search;
    let users = state.usersState.users;
    let makeShortMentorListResult = makeShort(entitys, pagination, search, users);

    return {
        type: MAKE_SHORT_MENTOR_LIST,
        makeShortMentorListResult,
    };
};

export let makeShortProtegeListActionCreator = () => {
    let state = window.store.getState();
    let entitys = state.mentorerPageState.mentoringProtege;
    let pagination = state.mentorerPageState.protegeList.pagination;
    let search = state.mentorerPageState.protegeList.search;
    let users = state.usersState.users;
    let makeShortProtegeListResult = makeShort(entitys, pagination, search, users);

    return {
        type: MAKE_SHORT_PROTEGE_LIST,
        makeShortProtegeListResult,
    };
};

export let changeHrListSearchActionCreator = search => ({
    type: CHANGE_HR_LIST_SEARCH,
    search,
});

export let changeHrListPaginationActionCreator = page => ({
    type: CHANGE_HR_LIST_PAGINATION,
    page,
});

export let setHrListIsLastPageActionCreator = () => ({
    type: SET_HR_LIST_IS_LAST_PAGE,
});

export let changeMentorListSearchActionCreator = search => ({
    type: CHANGE_MENTOR_LIST_SEARCH,
    search,
});

export let changeMentorListPaginationActionCreator = page => ({
    type: CHANGE_MENTOR_LIST_PAGINATION,
    page,
});

export let changeProtegeListSearchActionCreator = search => ({
    type: CHANGE_PROTEGE_LIST_SEARCH,
    search,
});

export let changeProtegeListPaginationActionCreator = page => ({
    type: CHANGE_PROTEGE_LIST_PAGINATION,
    page,
});

// Редуктор

let mentorerPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_COMPONENT_CHANGE:
            let showComponents = {...state.showComponents};
            for (let component in showComponents) {
                showComponents[component] = false;
            }
            showComponents[action.component] = true;

            return {
                ...state,
                showComponents,
            };
        case MENTORING_SET:
            return {
                ...state,
                mentoringHr: action.mentoringHr,
                mentoringMentor: action.mentoringMentor,
                mentoringProtege: action.mentoringProtege,
            };
        case SHOW_COMPONENTS_SET:
            return {
                ...state,
                showComponents: action.obj,
            };
        case MENTOR_SEARCH_SET:
            return {
                ...state,
                mentorSearch: action.mentorSearch,
            };
        case PROTEGE_SEARCH_SET:
            return {
                ...state,
                protegeSearch: action.protegeSearch,
            };
        case MENTOR_ID_SET:
            return {
                ...state,
                mentorId: action.id,
            };
        case PROTEGE_ID_SET:
            return {
                ...state,
                protegeId: action.id,
            };
        case RESET_MENTORER_PAGE_STATE:
            return {
                ...initialState,
            };
        case MAKE_SHORT_HR_LIST:
            return {
                ...state,
                hrList: {
                    ...state.hrList,
                    shortEntitys: action.makeShortHrListResult.shortEntitys,
                    pagination: {
                        ...state.hrList.pagination,
                        currentPage: action.makeShortHrListResult.currentPage,
                        pages: action.makeShortHrListResult.pages,
                        isLastPage: false,
                    },
                },
            };
        case MAKE_SHORT_MENTOR_LIST:
            return {
                ...state,
                mentorList: {
                    ...state.mentorList,
                    shortEntitys: action.makeShortMentorListResult.shortEntitys,
                    pagination: {
                        ...state.mentorList.pagination,
                        currentPage: action.makeShortMentorListResult.currentPage,
                        pages: action.makeShortMentorListResult.pages,
                    },
                },
            };
        case MAKE_SHORT_PROTEGE_LIST:
            return {
                ...state,
                protegeList: {
                    ...state.protegeList,
                    shortEntitys: action.makeShortProtegeListResult.shortEntitys,
                    pagination: {
                        ...state.protegeList.pagination,
                        currentPage: action.makeShortProtegeListResult.currentPage,
                        pages: action.makeShortProtegeListResult.pages,
                    },
                },
            };
        case CHANGE_HR_LIST_SEARCH:
            return {
                ...state,
                hrList: {
                    ...state.hrList,
                    search: action.search,
                },
            };
        case CHANGE_HR_LIST_PAGINATION:
            return {
                ...state,
                hrList: {
                    ...state.hrList,
                    pagination: {
                        ...state.hrList.pagination,
                        currentPage: action.page,
                    },
                },
            };
        case CHANGE_MENTOR_LIST_SEARCH:
            return {
                ...state,
                mentorList: {
                    ...state.mentorList,
                    search: action.search,
                },
            };
        case CHANGE_MENTOR_LIST_PAGINATION:
            return {
                ...state,
                mentorList: {
                    ...state.mentorList,
                    pagination: {
                        ...state.mentorList.pagination,
                        currentPage: action.page,
                    },
                },
            };
        case CHANGE_PROTEGE_LIST_SEARCH:
            return {
                ...state,
                protegeList: {
                    ...state.protegeList,
                    search: action.search,
                },
            };
        case CHANGE_PROTEGE_LIST_PAGINATION:
            return {
                ...state,
                protegeList: {
                    ...state.protegeList,
                    pagination: {
                        ...state.protegeList.pagination,
                        currentPage: action.page,
                    },
                },
            };
        case SET_HR_LIST_IS_LAST_PAGE:
            return {
                ...state,
                hrList: {
                    ...state.hrList,
                    pagination: {
                        ...state.hrList.pagination,
                        isLastPage: true,
                    },
                },
            };
        default:
            return state;
    }
};

export default mentorerPageReducer;