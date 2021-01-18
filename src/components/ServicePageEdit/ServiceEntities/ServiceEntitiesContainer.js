import { connect } from 'react-redux';
import isEmptyObject from '../../../functions/isEmptyObject';
import { departmentsSetActionCreator } from '../../../redux/departmentsReducer';
import { attachDepartment, attachDepartmentToServiceActionCreator, attachUser, attachUserToServiceActionCreator, changeServiceEntitiesSearchActionCreator, setAttachedActionCreator, unAttachDepartment, unAttachDepartmentFromServiceActionCreator, unAttachUser, unAttachUserFromServiceActionCreator } from '../../../redux/servicePageEditReducer';
import { usersGetActionCreator } from '../../../redux/usersReducer';
import ServiceEntities from './ServiceEntities';

let ServiceEntitiesContainer = connect(
    state => {
        let search = state.servicePageEditState.search;
        let attachedDepartments = state.servicePageEditState.attachedDepartments;
        let attachedUsers = state.servicePageEditState.attachedUsers;
        let noAttachedDepartments = {};
        let noAttachedUsers = {};

        if (search !== '') {
            let pattern = new RegExp(search.toLowerCase());

            for (let id in state.departmentsState.departments) {
                if (attachedDepartments[id] === undefined && state.departmentsState.departments[id].department.toLowerCase().match(pattern)) {
                    noAttachedDepartments[id] = state.departmentsState.departments[id];
                }
            }

            for (let id in state.usersState.users) {
                if (attachedUsers[id] === undefined && state.usersState.users[id].full_name.toLowerCase().match(pattern)) {
                    noAttachedUsers[id] = state.usersState.users[id];
                }
            }
        }

        return {
            search: search,
            attachedDepartments: attachedDepartments,
            attachedUsers: attachedUsers,
            noAttachedDepartments: noAttachedDepartments,
            noAttachedUsers: noAttachedUsers,
        };
    },
    dispatch => ({
        changeSearch: (search) => {
            dispatch(changeServiceEntitiesSearchActionCreator(search));
        },
        departmentsSet: (data) => {
            dispatch(departmentsSetActionCreator(data));
        },
        usersSet: (data) => {
            dispatch(usersGetActionCreator(data));
        },
        setAttached: (data) => {
            dispatch(setAttachedActionCreator(data));
        },
        attachDepartment: (serviceId, departmentId) => {
            attachDepartment(serviceId, departmentId)
                .then((response) => {
                    dispatch(attachDepartmentToServiceActionCreator(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        attachUser: (serviceId, userId) => {
            attachUser(serviceId, userId)
                .then((response) => {
                    dispatch(attachUserToServiceActionCreator(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        unAttachDepartment: (serviceId, departmentId) => {
            unAttachDepartment(serviceId, departmentId)
                .then((response) => {
                    dispatch(unAttachDepartmentFromServiceActionCreator(response.data));
                });
        },
        unAttachUser: (serviceId, userId) => {
            unAttachUser(serviceId, userId)
                .then((response) => {
                    dispatch(unAttachUserFromServiceActionCreator(response.data));
                });
        },
    })
)(ServiceEntities);

export default ServiceEntitiesContainer;