import { connect } from 'react-redux';
import { change, initialize } from 'redux-form';
import authHOC from '../../HOC/authHOC';
import { departmentNamesGetActionCreator } from '../../redux/departmentNamesReducer';
import { departmentsLocationsSetActionCreator } from '../../redux/departmentsLocationsReducer';
import { employersGetActionCreator } from '../../redux/employersReducer';
import { locationsGetActionCreator } from '../../redux/locationsReducer';
import { postDepLocsGetActionCreator } from '../../redux/postDepLocsReducer';
import { postsDepartmentsLocationsSetActionCreator } from '../../redux/postsDepartmentsLocationsReducer';
import { postsGetActionCreator } from '../../redux/postsReducer';
import { changeDepartmentOnUserPageEditActionCreator, changeLocationOnUserPageEditActionCreator } from '../../redux/userPageEditReducer';
import { usersGetActionCreator, usersPostActionCreator, usersPatch } from '../../redux/usersReducer';
import UserPageEdit from './UserPageEdit';

let UserPageEditContainer = connect(
    state => ({
        employers: state.employersState.employers,
        locations: state.locationsState.locations,
        departmentNames: state.departmentNamesState.departmentNames,
        posts: state.postsState.posts,
        departmentsLocations: state.userPageEditState.filterDepartmentsLocations,
        postsDepartmentsLocations: state.userPageEditState.filterPostsDepartmentsLocations,
        locationSearch: state.form?.userEditForm?.values?.location_search,
        depLocSearch: state.form?.userEditForm?.values?.dep_loc_search,
        postDepLocSearch: state.form?.userEditForm?.values?.post_dep_loc_search,
    }),
    dispatch => ({
        onEmployersGet: (data) => {
            dispatch(employersGetActionCreator(data));
        },
        onLocationsGet: (data) => {
            dispatch(locationsGetActionCreator(data));
        },
        onDepartmentNamesGet: (data) => {
            dispatch(departmentNamesGetActionCreator(data));
        },
        onPostsGet: (data) => {
            dispatch(postsGetActionCreator(data));
        },
        onDepartmentsLocationsGet : data => {
            dispatch(departmentsLocationsSetActionCreator(data));
        },
        onPostsDepartmentsLocationsGet : data => {
            dispatch(postsDepartmentsLocationsSetActionCreator(data));
        },
        onUsersGet: (data) => {
            dispatch(usersGetActionCreator(data));
        },
        changeLocation: locationId => {
            dispatch(changeLocationOnUserPageEditActionCreator(locationId));
            dispatch(change('userEditForm', 'dep_loc_id', ''));
            dispatch(change('userEditForm', 'post_dep_loc_id', ''));
        },
        changeDepartment: departmentId => {
            dispatch(changeDepartmentOnUserPageEditActionCreator(departmentId));
            dispatch(change('userEditForm', 'post_dep_loc_id', ''));
        },
        locationClear: () => {
            dispatch(change('userEditForm', 'location_id', ''));
        },
        depLocClear: () => {
            dispatch(change('userEditForm', 'dep_loc_id', ''));
        },
        postDepLocClear: () => {
            dispatch(change('userEditForm', 'post_dep_loc_id', ''));
        },
        onInitialValuesSet: (userId) => {
            let state = window.store.getState();
            let locationId = state.departmentsLocationsState.departmentsLocations[state.postsDepartmentsLocationsState.postsDepartmentsLocations[state.usersState.users[userId]?.post_dep_loc_id]?.dep_loc_id]?.location_id;
            let departmentId = state.postsDepartmentsLocationsState.postsDepartmentsLocations[state.usersState.users[userId]?.post_dep_loc_id]?.dep_loc_id;
            
            dispatch(changeLocationOnUserPageEditActionCreator(locationId));
            dispatch(changeDepartmentOnUserPageEditActionCreator(departmentId));

            let initialValues = {...state.usersState.users[userId]};
            initialValues['dep_loc_id'] = departmentId;
            initialValues['location_id'] = locationId;

            if (initialValues.contact !== null) {
                for (let prop in initialValues.contact) {
                    initialValues[prop] = initialValues.contact[prop];
                }
            }

            for (let prop in initialValues) {
                if (initialValues[prop] !== null && initialValues[prop] !== undefined) {
                    if (prop === 'appointment_date') {
                        let date = new Date(initialValues[prop]);
    
                        let month = Number(date.getUTCMonth()) + 1;
                        if (month < 10) {
                            month = '0' + String(month);
                        }
                        else {
                            month = String(month);
                        }
    
                        let day = Number(date.getUTCDate());
                        if (day < 10) {
                            day = '0' + String(day);
                        }
                        else {
                            day = String(day);
                        }
    
                        initialValues[prop] = date.getUTCFullYear() + '-' + month + '-' + day;
                    }
                    else {
                        if (prop !== 'contact') {
                            initialValues[prop] = String(initialValues[prop]);
                        }
                    }
                }
            }

            dispatch(initialize('userEditForm', initialValues));
        },
        onSubmit: (values) => {
            let sendValues = {...values};

            sendValues.contact = {};
            if (sendValues.phone) {
                sendValues.contact.phone = sendValues.phone;
                delete sendValues.phone;
            }
            if (sendValues.email) {
                sendValues.contact.email = sendValues.email;
                delete sendValues.email;
            }

            usersPatch(sendValues)
                .then((response) => {
                    dispatch(usersPostActionCreator(response.data));
                    alert('Пользователь отредактирован!');
                })
                .catch((error) => {
                    dispatch({
                        type: 'USER_EDIT_FORM_VALIDATE',
                        errors: error.response.data.message,
                    });
                });
        },
    })
)(UserPageEdit);

export default authHOC(UserPageEditContainer);