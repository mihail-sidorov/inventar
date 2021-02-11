import isEmptyObject from "../functions/isEmptyObject";

const CHANGE_SUB_DEVICES_SEARCH = 'CHANGE_SUB_DEVICES_SEARCH', MAKE_SUB_DEVICES_SEARCH = 'MAKE_SUB_DEVICES_SEARCH', MAKE_SUB_DEVICES = 'MAKE_SUB_DEVICES';

let initialState = {
    search: '',
    subDevicesSearch: {},
    subDevices: {},
};

function makeSubDevicesSearch(device, devices, categories, brands, search) {
    let searchDevices = {};

    if (search !== '') {
        let subCategories = categories[device.category_id] && 
            categories[device.category_id].sub_devices && 
                categories[device.category_id].sub_devices.sub_cat_id ? categories[device.category_id].sub_devices.sub_cat_id : {};

        for (let id in devices) {
            if (devices[id].parent_id === null && subCategories[devices[id].category_id]) {
                let searchWords = search.split(' ');
                let wordAccord = false;

                for (let i = 0; i < searchWords.length; i++) {
                    if (searchWords[i]) {
                        let pattern = new RegExp(searchWords[i].toLowerCase());

                        for (let property in devices[id]) {
                            let propertyValue = '';

                            switch (property) {
                                case 'brand_id':
                                    if (!isEmptyObject(brands)) {
                                        let brand = brands[devices[id][property]] ? brands[devices[id][property]].brand : null;
                                        if (brand !== undefined && brand !== null && brand !== '') {
                                            propertyValue = String(brand);
                                        }
                                    }
                                    break;
                                case 'specifications':
                                    propertyValue = '';
                                    for (let specificationsProperty in devices[id][property]) {
                                        if (devices[id][property][specificationsProperty] !== undefined && devices[id][property][specificationsProperty] !== null && devices[id][property][specificationsProperty] !== '') {
                                            propertyValue += String(devices[id][property][specificationsProperty]) + ' ';
                                        }
                                    }
                                    break;
                                default:
                                    if (property === 'model') {
                                        if (devices[id][property] !== undefined && devices[id][property] !== null && devices[id][property] !== '') {
                                            propertyValue = String(devices[id][property]);
                                        }
                                    }
                                    break;
                            }

                            if (propertyValue && propertyValue.toLowerCase().match(pattern)) {
                                wordAccord = true;
                                break;
                            }
                        }

                        if (wordAccord) break;
                    }
                }

                if (wordAccord) searchDevices[id] = devices[id];
            }
        }
    }

    return searchDevices;
}

function makeSubDevices(device, devices) {
    let subDevices = {};

    for (let id in devices) {
        if (devices[id].parent_id == device.id) {
            subDevices[id] = devices[id];
        }
    }

    return subDevices;
}

// Создание запросов

// Создание Action Creators
export let changeSubDevicesSearchActionCreator = search => ({
    type: CHANGE_SUB_DEVICES_SEARCH,
    search: search,
});

export let makeSubDevicesSearchActionCreator = () => {
    let state = window.store.getState();

    let device = state.deviceSavePageState.device;
    let devices = state.devicesState.devices;
    let categories = state.categoriesState.categories;
    let brands = state.brandsState.brands;
    let search = state.subDevicesState.search;

    return {
        type: MAKE_SUB_DEVICES_SEARCH,
        device: device,
        devices: devices,
        categories: categories,
        brands, brands,
        search: search,
    };
};

export let makeSubDevicesActionCreator = () => {
    let state = window.store.getState();

    let device = state.deviceSavePageState.device;
    let devices = state.devicesState.devices;

    return {
        type: MAKE_SUB_DEVICES,
        device: device,
        devices: devices,
    };
};

let subDevicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SUB_DEVICES_SEARCH:
            return {
                ...state,
                search: action.search,
            };
        case MAKE_SUB_DEVICES_SEARCH:
            return {
                ...state,
                subDevicesSearch: makeSubDevicesSearch(action.device, action.devices, action.categories, action.brands, action.search),
            };
        case MAKE_SUB_DEVICES:
            return {
                ...state,
                subDevices: makeSubDevices(action.device, action.devices),
            };
        default:
            return state;
    }
};

export default subDevicesReducer;