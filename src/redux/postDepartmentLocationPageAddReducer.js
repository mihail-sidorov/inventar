const SET_FILTER_DEPARTMENTS_LOCATIONS = 'SET_FILTER_DEPARTMENTS_LOCATIONS';

let initialState = {
    filterDepartmentsLocations: {},
};

// Создание Action Creators
export let setFilterDepartmentsLocationsActionCreator = locationId => {
    let state = window.store.getState();
    let departmentsLocations = state.departmentsLocationsState.departmentsLocations;
    let filterDepartmentsLocations = {};

    for (let id in departmentsLocations) {
        if (departmentsLocations[id].location_id == locationId) {
            filterDepartmentsLocations[id] = departmentsLocations[id];
        }
    }

    return {
        type: SET_FILTER_DEPARTMENTS_LOCATIONS,
        filterDepartmentsLocations: filterDepartmentsLocations,
    };
};

export default function postDepartmentLocationPageAddReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILTER_DEPARTMENTS_LOCATIONS:
            return {
                ...state,
                filterDepartmentsLocations: action.filterDepartmentsLocations,
            };
        default:
            return state;
    }
}