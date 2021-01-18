import Axios from "../config/axiosConfig";

const CHANGE_SERVICE_ENTITIES_SEARCH = 'CHANGE_SERVICE_ENTITIES_SEARCH', SET_ATTACHED = 'SET_ATTACHED', ATTACH_DEPARTMENT_TO_SERVICE = 'ATTACH_DEPARTMENT_TO_SERVICE', ATTACH_USER_TO_SERVICE = 'ATTACH_USER_TO_SERVICE', UN_ATTACH_DEPARTMENT_FROM_SERVICE = 'UN_ATTACH_DEPARTMENT_FROM_SERVICE', UN_ATTACH_USER_FROM_SERVICE = 'UN_ATTACH_USER_FROM_SERVICE';

let initialState = {
    attachedDepartments: {},
    attachedUsers: {},
    search: '',
};

// Запросы к API
export let getAttached = (serviceId) => {
    return Axios.get(`account_owners?accountId=${serviceId}`);
}

export let attachDepartment = (serviceId, departmentId) => {
    return Axios.post('account_owners', {account_id: serviceId, dep_loc_id: departmentId});
}

export let attachUser = (serviceId, userId) => {
    return Axios.post('account_owners', {account_id: serviceId, user_id: userId});
}

export let unAttachDepartment = (serviceId, departmentId) => {
    return Axios.delete('account_owners', {data: {account_id: serviceId, dep_loc_id: departmentId}});
}

export let unAttachUser = (serviceId, userId) => {
    return Axios.delete('account_owners', {data: {account_id: serviceId, user_id: userId}});
}

// Создание Action Creators
export let changeServiceEntitiesSearchActionCreator = (search) => {
    return {
        type: CHANGE_SERVICE_ENTITIES_SEARCH,
        search: search,
    };
}

export let setAttachedActionCreator = (data) => {
    let state = window.store.getState();
    let departments = state.departmentsState.departments, users = state.usersState.users;

    return {
        type: SET_ATTACHED,
        data: data,
        departments: departments,
        users: users,
    };
}

export let attachDepartmentToServiceActionCreator = (data) => {
    let state = window.store.getState();
    let department = state.departmentsState.departments[data.dep_loc_id];

    return {
        type: ATTACH_DEPARTMENT_TO_SERVICE,
        department: department,
    };
}

export let attachUserToServiceActionCreator = (data) => {
    let state = window.store.getState();
    let user = state.usersState.users[data.user_id];

    return {
        type: ATTACH_USER_TO_SERVICE,
        user: user,
    };
}

export let unAttachDepartmentFromServiceActionCreator = (data) => {
    return {
        type: UN_ATTACH_DEPARTMENT_FROM_SERVICE,
        departmentId: data[0].dep_loc_id,
    };
}

export let unAttachUserFromServiceActionCreator = (data) => {
    return {
        type: UN_ATTACH_USER_FROM_SERVICE,
        userId: data[0].user_id,
    };
}

let servicePageEditReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case CHANGE_SERVICE_ENTITIES_SEARCH:
            return {
                ...state,
                search: action.search,
            };
        case SET_ATTACHED:
            let attachedDepartments = {}, attachedUsers = {};

            action.data.forEach(element => {
                if (element.dep_loc_id !== null && action.departments[element.dep_loc_id] !== undefined) {
                    attachedDepartments[element.dep_loc_id] = action.departments[element.dep_loc_id];
                }
                if (element.user_id !== null && action.users[element.user_id] !== undefined) {
                    attachedUsers[element.user_id] = action.users[element.user_id];
                }
            });

            return {
                ...state,
                attachedDepartments: attachedDepartments,
                attachedUsers: attachedUsers,
            };
        case ATTACH_DEPARTMENT_TO_SERVICE:
            newState = {...state};
            newState.attachedDepartments = {...newState.attachedDepartments};
            newState.attachedDepartments[action.department.id] = action.department;

            return newState;
        case ATTACH_USER_TO_SERVICE:
            newState = {...state};
            newState.attachedUsers = {...newState.attachedUsers};
            newState.attachedUsers[action.user.id] = action.user;

            return newState;
        case UN_ATTACH_DEPARTMENT_FROM_SERVICE:
            newState = {...state};
            newState.attachedDepartments = {...newState.attachedDepartments};
            delete newState.attachedDepartments[action.departmentId];

            return newState;
        case UN_ATTACH_USER_FROM_SERVICE:
            newState = {...state};
            newState.attachedUsers = {...newState.attachedUsers};
            delete newState.attachedUsers[action.userId];

            return newState;
        default:
            return state;
    }
}

export default servicePageEditReducer;