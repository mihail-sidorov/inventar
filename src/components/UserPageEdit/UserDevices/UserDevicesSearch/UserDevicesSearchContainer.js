import { connect } from 'react-redux';
import isEmptyObject from '../../../../functions/isEmptyObject';
import { attachDeviceToUserActionCreator } from '../../../../redux/devicesReducer';
import { eventsGet, eventsGetActionCreator } from '../../../../redux/eventsReducer';
import { attachDeviceToUser, userDevicesChangeSearchActionCreator } from '../../../../redux/userDevicesReducer';
import UserDevicesSearch from './UserDevicesSearch';

let UserDevicesSearchContainer = connect(
    state => {
        let devices = state.devicesState.devices, brands = state.brandsState.brands, categories = state.categoriesState.categories, search = state.userDevicesState.search, userId = state.userDevicesState.userId, searchDevices = {};

        if (search !== '' && userId !== null) {
            for (let id in devices) {
                if (devices[id].status === 'stock') {
                    let searchWords = search.split(' ');
                    let deviceAccord = true;

                    for (let i = 0; i < searchWords.length; i++) {
                        let wordAccord = false;
                        let pattern = new RegExp(searchWords[i].toLowerCase());
                        let propertiesArr = [];

                        for (let property in devices[id]) {
                            switch (property) {
                                case 'brand_id':
                                    if (!isEmptyObject(brands)) {
                                        let brand = brands[devices[id][property]]?.brand;
                                        if (brand !== undefined && brand !== null && brand !== '') {
                                            propertiesArr.push(String(brand));
                                        }
                                    }
                                    break;
                                case 'category_id':
                                    if (!isEmptyObject(categories)) {
                                        let category = categories[devices[id][property]]?.category;
                                        console.log(category);
                                        if (category !== undefined && category !== null && category !== '') {
                                            propertiesArr.push(String(category));
                                        }
                                    }
                                    break;
                                case 'specifications':
                                    for (let specificationsProperty in devices[id][property]) {
                                        if (devices[id][property][specificationsProperty] !== undefined && devices[id][property][specificationsProperty] !== null && devices[id][property][specificationsProperty] !== '') {
                                            propertiesArr.push(String(devices[id][property][specificationsProperty]));
                                        }
                                    }
                                    break;
                                default:
                                    if (property === 'model' || property === 'inv_number') {
                                        if (devices[id][property] !== undefined && devices[id][property] !== null && devices[id][property] !== '') {
                                            propertiesArr.push(String(devices[id][property]));
                                        }
                                    }
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
                            deviceAccord = false;
                            break;
                        }
                    }

                    if (deviceAccord) {
                        searchDevices[id] = devices[id];
                    }
                }
            }
        }

        return {
            search: state.userDevicesState.search,
            searchDevices: searchDevices,
            userId: userId,
            brands: state.brandsState.brands,
            categories: state.categoriesState.categories,
        };
    },
    dispatch => ({
        onUserDevicesChangeSearch: (search) => {
            dispatch(userDevicesChangeSearchActionCreator(search));
        },
        onAttachDeviceToUser: (userId, deviceId) => {
            attachDeviceToUser(userId, deviceId)
                .then((response) => {
                    dispatch(attachDeviceToUserActionCreator(response.data));
                    return eventsGet();
                })
                .then(res => {
                    dispatch(eventsGetActionCreator(res.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    })
)(UserDevicesSearch);

export default UserDevicesSearchContainer;