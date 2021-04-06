import { connect } from 'react-redux';
import { searchUsersInputChangeActionCreator, setDeviceInDeviceSavePageActionCreator } from '../../../../redux/deviceSavePageReducer';
import { attachDeviceToUserActionCreator } from '../../../../redux/devicesReducer';
import { eventsGet, eventsGetActionCreator } from '../../../../redux/eventsReducer';
import { attachDeviceToUser } from '../../../../redux/userDevicesReducer';
import SearchUsersForAttach from './SearchUsersForAttach';

let SearchUsersForAttachContainer = connect(
    state => {
        let search = state.deviceSavePageState.searchUsersInput, users = state.usersState.users, device = state.deviceSavePageState.device, searchUsers = {};

        if (device.status === 'stock' && search !== '') {
            for (let id in users) {
                let searchWords = search.split(' ');
                let userAccord = true;

                for (let i = 0; i < searchWords.length; i++) {
                    let wordAccord = false;
                    let pattern = new RegExp(searchWords[i].toLowerCase());
                    let propertiesArr = [];

                    for (let property in users[id]) {
                        switch (property) {
                            case 'full_name':
                                if (users[id][property] !== undefined && users[id][property] !== null && users[id][property] !== '') {
                                    propertiesArr.push(String(users[id][property]));
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
                        userAccord = false;
                        break;
                    }
                }

                if (userAccord) {
                    searchUsers[id] = users[id];
                }
            }
        }

        return {
            searchUsersInput: search,
            searchUsers: searchUsers,
            device: device,
        };
    },
    dispatch => ({
        searchUsersInputChange: (value) => {
            dispatch(searchUsersInputChangeActionCreator(value));
        },
        attachUserToDevice: (userId, deviceId) => {
            attachDeviceToUser(userId, deviceId)
                .then((response) => {
                    dispatch(attachDeviceToUserActionCreator(response.data));
                    dispatch(setDeviceInDeviceSavePageActionCreator(deviceId));
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
)(SearchUsersForAttach);

export default SearchUsersForAttachContainer;