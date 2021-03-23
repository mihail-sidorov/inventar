const CHANGE_LOCATION_ON_USER_PAGE_EDIT = 'CHANGE_LOCATION_ON_USER_PAGE_EDIT', CHANGE_DEPARTMENT_ON_USER_PAGE_EDIT = 'CHANGE_DEPARTMENT_ON_USER_PAGE_EDIT';

let initialState = {
    filterDepartmentsLocations: {},
    filterPostsDepartmentsLocations: {},
};

// Создание Action Creators
export let changeLocationOnUserPageEditActionCreator = locationId => {
    let state = window.store.getState();
    let filterDepartmentsLocations = {};
    
    for (let id in state.departmentsLocationsState.departmentsLocations) {
        if (state.departmentsLocationsState.departmentsLocations[id]?.location_id == locationId) {
            filterDepartmentsLocations[id] = state.departmentsLocationsState.departmentsLocations[id];
        }
    }

    return {
        type: CHANGE_LOCATION_ON_USER_PAGE_EDIT,
        filterDepartmentsLocations: filterDepartmentsLocations,
    };
};

export let changeDepartmentOnUserPageEditActionCreator = departmentId => {
    let state = window.store.getState();
    let filterPostsDepartmentsLocations = {};

    for (let id in state.postsDepartmentsLocationsState.postsDepartmentsLocations) {
        if (state.postsDepartmentsLocationsState.postsDepartmentsLocations[id]?.dep_loc_id == departmentId) {
            filterPostsDepartmentsLocations[id] = state.postsDepartmentsLocationsState.postsDepartmentsLocations[id];
        }
    }

    return {
        type: CHANGE_DEPARTMENT_ON_USER_PAGE_EDIT,
        filterPostsDepartmentsLocations: filterPostsDepartmentsLocations,
    };
};

let  userPageEditReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LOCATION_ON_USER_PAGE_EDIT:
            return {
                ...state,
                filterDepartmentsLocations: action.filterDepartmentsLocations,
                filterPostsDepartmentsLocations: {},
            };
        case CHANGE_DEPARTMENT_ON_USER_PAGE_EDIT:
            return {
                ...state,
                filterPostsDepartmentsLocations: action.filterPostsDepartmentsLocations,
            };
        default:
            return state;
    }
}

export default userPageEditReducer;