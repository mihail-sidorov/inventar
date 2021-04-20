import Axios from "../config/axiosConfig";
import zeroField from "../functions/zeroField";

const SUB_SOFTWARES_SET = 'SUB_SOFTWARES_SET', SUB_SOFTWARES_SEARCH_SET = 'SUB_SOFTWARES_SEARCH_SET';

let initialState = {
    subSoftwaresSearch: {},
    subSoftwares: {},
};

// Запросы к API
export let subSoftwaresGet = id => Axios.get(`software_owners?device_id=${id}`);

export let attachSoftwareToDevice = (software_id, device_id) => Axios.post('softwareAction?action=bind', {software_id, device_id});

export let unAttachSoftwareFromDevice = (software_id, device_id) => Axios.post('softwareAction?action=unbind', {software_id, device_id});

// Создание Action Creators
export let subSoftWaresSetActionCreator = data => {
    let state = window.store.getState();
    let softwares = state.softwaresState.softwares;
    let subSoftwares = {};

    for (let el of data) {
        if (softwares[el.software_id] !== null) {
            subSoftwares[el.software_id] = softwares[el.software_id];
        }
    }

    return {
        type: SUB_SOFTWARES_SET,
        subSoftwares,
    };
};

export let  subSoftwaresSearchSetActionCreator = search => {
    let state = window.store.getState();
    let softwares = state.softwaresState.softwares;
    let categories = state.softwareCategoriesState.softwareCategories;
    let subSoftwares = state.subSoftwaresState.subSoftwares;
    let subSoftwaresSearch = {};
    let pattern = new RegExp(search.toLowerCase());

    for (let id in softwares) {
        if (search !== '' && subSoftwares[id] === undefined && !zeroField(softwares[id].bindInfo) && softwares[id].bindInfo.deviceAttached === 1
        && categories[softwares[id].software_category_id]?.name.toLowerCase().match(pattern)) {
            subSoftwaresSearch[id] = softwares[id];
        }
    }

    return {
        type: SUB_SOFTWARES_SEARCH_SET,
        subSoftwaresSearch,
    };
};

let subSoftwaresReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUB_SOFTWARES_SET:
            return {
                ...state,
                subSoftwares: action.subSoftwares,
            };
        case SUB_SOFTWARES_SEARCH_SET:
            return {
                ...state,
                subSoftwaresSearch: action.subSoftwaresSearch,
            };
        default:
            return state;
    }
};

export default subSoftwaresReducer;