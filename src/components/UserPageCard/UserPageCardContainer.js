import { connect } from 'react-redux';
import authHOC from '../../HOC/authHOC';
import { accountsSetActionCreator } from '../../redux/accountsReducer';
import { accountTypesSetActionCreator } from '../../redux/accountTypesReducer';
import { brandsGetActionCreator } from '../../redux/brandsReducer';
import { devicesGetActionCreator } from '../../redux/devicesReducer';
import { employersGetActionCreator } from '../../redux/employersReducer';
import { locationsGetActionCreator } from '../../redux/locationsReducer';
import { postDepLocsGetActionCreator } from '../../redux/postDepLocsReducer';
import { getAttachedForUser } from '../../redux/servicePageEditReducer';
import { usersGetActionCreator, usersServicesSetActionCreator } from '../../redux/usersReducer';
import UserPageCard from './UserPageCard';

let UserPageCardContainer = connect(
    state => ({
        employers: state.employersState.employers,
        locations: state.locationsState.locations,
        postDepLocs: state.postDepLocsState.postDepLocs,
        devices: state.devicesState.devices,
        brands: state.brandsState.brands,
        users: state.usersState.users,
        usersServices: state.usersState.usersServices,
        services: state.accountsState.accounts,
        serviceTypes: state.accountTypesState.accountTypes,
    }),
    dispatch => ({
        editUser: (props) => {
            props.history.push(`/users/${props.match.params.userId}`);
        },
        onEmployersGet: (data) => {
            dispatch(employersGetActionCreator(data));
        },
        onLocationsGet: (data) => {
            dispatch(locationsGetActionCreator(data));
        },
        onPostDepLocsGet: (data) => {
            dispatch(postDepLocsGetActionCreator(data));
        },
        onDevicesGet: (data) => {
            dispatch(devicesGetActionCreator(data));
        },
        onBrandsGet: (data) => {
            dispatch(brandsGetActionCreator(data));
        },
        onUsersGet: (data) => {
            dispatch(usersGetActionCreator(data));
        },
        onAccountsGet: (data) => {
            dispatch(accountsSetActionCreator(data));
        },
        onAccountTypesGet: (data) => {
            dispatch(accountTypesSetActionCreator(data));
        },
        deviceCardShow: (deviceId, history) => {
            history.push(`/devices/card/${deviceId}`);
        },
        serviceCardShow: (serviceId, history) => {
            history.push(`/services/${serviceId}`);
        },
        onUsersServicesSet: (users) => {
            let promiseArr = [];
            for (let id in users) {
                promiseArr.push(getAttachedForUser(id));
            }
            Promise.all(promiseArr)
                .then((response) => {
                    let usersServices = {};
                    response.forEach((value) => {
                        if (value.data.length)  {
                            let obj = {
                                services: [],
                            };
                            value.data.forEach((el) => {
                                obj.services.push(el.account_id);
                            });
                            usersServices[value.data[0].user_id] = obj;
                        }
                    });
                    dispatch(usersServicesSetActionCreator(usersServices));
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    })
)(UserPageCard);

export default authHOC(UserPageCardContainer);