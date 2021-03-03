import { connect } from 'react-redux';
import { accountsSetActionCreator } from '../../../redux/accountsReducer';
import { accountTypesSetActionCreator } from '../../../redux/accountTypesReducer';
import { departmentsSetActionCreator } from '../../../redux/departmentsReducer';
import { getAttached } from '../../../redux/servicePageEditReducer';
import { makeShortServicesActionCreator, setAttachedForServicesActionCreator } from '../../../redux/servicesPageReducer';
import { usersGetActionCreator } from '../../../redux/usersReducer';
import Services from './Services';

let ServicesContainer = connect(
    state => ({
        services: state.servicesPageState.shortServices,
    }),
    dispatch => ({
        accountsSet: (accountsArr) => {
            dispatch(accountsSetActionCreator(accountsArr));
        },
        attachedSet: (accounts) => {
            let promiseArr = [];
            for (let id in accounts) {
                promiseArr.push(getAttached(id));
            }
            Promise.all(promiseArr)
                .then((response) => {
                    let attachedArr = [];
                    response.forEach((value) => {
                        attachedArr.push(value.data);
                    });
                    dispatch(setAttachedForServicesActionCreator(attachedArr));
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        accountTypesSet: (accountTypesArr) => {
            dispatch(accountTypesSetActionCreator(accountTypesArr));
        },
        shortServicesSet: () => {
            dispatch(makeShortServicesActionCreator());
        },
        departmentsSet: (departmentsArr) => {
            dispatch(departmentsSetActionCreator(departmentsArr));
        },
        usersSet: (usersArr) => {
            dispatch(usersGetActionCreator(usersArr));
        },
    })
)(Services);

export default ServicesContainer;