const SET_FILTER_DEPARTMENTS_LOCATIONS_PAGE_EDIT = 'SET_FILTER_DEPARTMENTS_LOCATIONS_PAGE_EDIT';

let initialState = {
    filterDepartmentsLocations: {},
};

// Создание Action Creators
export let setFilterDepartmentsLocationsPageEditActionCreator = locationId => {
    let state = window.store.getState();
    let departmentsLocations = state.departmentsLocationsState.departmentsLocations;
    let filterDepartmentsLocations = {};

    for (let id in departmentsLocations) {
        if (departmentsLocations[id].location_id == locationId) {
            filterDepartmentsLocations[id] = departmentsLocations[id];
        }
    }

    return {
        type: SET_FILTER_DEPARTMENTS_LOCATIONS_PAGE_EDIT,
        filterDepartmentsLocations: filterDepartmentsLocations,
    };
};

export default function postDepartmentLocationPageEditReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILTER_DEPARTMENTS_LOCATIONS_PAGE_EDIT:
            return {
                ...state,
                filterDepartmentsLocations: action.filterDepartmentsLocations,
            };
        default:
            return state;
    }
}