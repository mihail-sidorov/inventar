import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import { accountsSetActionCreator, serviceAddActionCreator, serviceEdit } from '../../redux/accountsReducer';
import { accountTypesSetActionCreator } from '../../redux/accountTypesReducer';
import ServicePageEdit from './ServicePageEdit';

let ServicePageEditContainer = connect(
    state => ({
        accountTypes: state.accountTypesState.accountTypes,
    }),
    dispatch => ({
        accountTypesSet: (data) => {
            dispatch(accountTypesSetActionCreator(data));
        },
        accountsSet: (data) => {
            dispatch(accountsSetActionCreator(data));
        },
        onInitialValuesSet: (serviceId, history) => {
            let state = window.store.getState();
            
            if (state.accountsState.accounts[serviceId] === undefined) {
                history.push('/services');
            }
            else {
                let initialValues = {...state.accountsState.accounts[serviceId]};
            
                for (let prop in initialValues) {
                    if (prop === 'account_type_id') {
                        initialValues[prop] = String(initialValues[prop]);
                    }
                }

                dispatch(initialize('serviceEditForm', initialValues));
            }
        },
        onSubmit: (values) => {
            if (values.account_type_id && values.login && values.password) {
                serviceEdit(values)
                    .then((data) => {
                        dispatch(serviceAddActionCreator(data.data));
                        alert('Сервис отредактирован!');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
    })
)(ServicePageEdit);

export default ServicePageEditContainer;