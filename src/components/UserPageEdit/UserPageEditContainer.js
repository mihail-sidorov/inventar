import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import { employersGetActionCreator } from '../../redux/employersReducer';
import { locationsGetActionCreator } from '../../redux/locationsReducer';
import { postDepLocsGetActionCreator } from '../../redux/postDepLocsReducer';
import { usersGetActionCreator, usersPostActionCreator, usersPatch } from '../../redux/usersReducer';
import UserPageEdit from './UserPageEdit';

let UserPageEditContainer = connect(
    state => ({
        employers: state.employersState.employers,
        locations: state.locationsState.locations,
        postDepLocs: state.postDepLocsState.postDepLocs,
    }),
    dispatch => ({
        onEmployersGet: (data) => {
            dispatch(employersGetActionCreator(data));
        },
        onLocationsGet: (data) => {
            dispatch(locationsGetActionCreator(data));
        },
        onPostDepLocsGet: (data) => {
            dispatch(postDepLocsGetActionCreator(data));
        },
        onUsersGet: (data) => {
            dispatch(usersGetActionCreator(data));
        },
        onInitialValuesSet: (userId) => {
            let state = window.store.getState();
            let initialValues = {...state.usersState.users[userId]};

            for (let prop in initialValues.contact) {
                initialValues[prop] = initialValues.contact[prop];
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
            if (sendValues.phone !== undefined) {
                sendValues.contact.phone = sendValues.phone;
                delete sendValues.phone;
            }
            if (sendValues.email !== undefined) {
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

export default UserPageEditContainer;