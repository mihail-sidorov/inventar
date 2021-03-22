const CHANGE_LOCATION_ON_USER_PAGE_ADD = 'CHANGE_LOCATION_ON_USER_PAGE_ADD', CHANGE_DEPARTMENT_ON_USER_PAGE_ADD = 'CHANGE_DEPARTMENT_ON_USER_PAGE_ADD';

let initialState = {
    filterDepartmentsLocations: {},
    filterPostsDepartmentsLocations: {},
};

// Создание Action Creators
export let changeLocationOnUserPageAddActionCreator = locationId => {
    let state = window.store.getState();
    let filterDepartmentsLocations = {};
    
    for (let id in state.departmentsLocationsState.departmentsLocations) {
        if (state.departmentsLocationsState.departmentsLocations[id]?.location_id == locationId) {
            filterDepartmentsLocations[id] = state.departmentsLocationsState.departmentsLocations[id];
        }
    }

    return {
        type: CHANGE_LOCATION_ON_USER_PAGE_ADD,
        filterDepartmentsLocations: filterDepartmentsLocations,
    };
};

export let changeDepartmentOnUserPageAddActionCreator = departmentId => {
    let state = window.store.getState();
    let filterPostsDepartmentsLocations = {};

    for (let id in state.postsDepartmentsLocationsState.postsDepartmentsLocations) {
        if (state.postsDepartmentsLocationsState.postsDepartmentsLocations[id]?.dep_loc_id == departmentId) {
            filterPostsDepartmentsLocations[id] = state.postsDepartmentsLocationsState.postsDepartmentsLocations[id];
        }
    }

    return {
        type: CHANGE_DEPARTMENT_ON_USER_PAGE_ADD,
        filterPostsDepartmentsLocations: filterPostsDepartmentsLocations,
    };
};

let  userPageAddReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LOCATION_ON_USER_PAGE_ADD:
            return {
                ...state,
                filterDepartmentsLocations: action.filterDepartmentsLocations,
                filterPostsDepartmentsLocations: {},
            };
        case CHANGE_DEPARTMENT_ON_USER_PAGE_ADD:
            return {
                ...state,
                filterPostsDepartmentsLocations: action.filterPostsDepartmentsLocations,
            };
        default:
            return state;
    }
}

export default userPageAddReducer;