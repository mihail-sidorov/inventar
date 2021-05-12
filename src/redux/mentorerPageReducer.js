const SHOW_COMPONENT_CHANGE = 'SHOW_COMPONENT_CHANGE';

let initialState = {
    showComponents: {},
};

// Запросы к API

// Создание Action Creators

export let showComponentsChangeActionCreator = component => ({
    type: SHOW_COMPONENT_CHANGE,
    component,
});

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
        default:
            return state;
    }
};

export default mentorerPageReducer;