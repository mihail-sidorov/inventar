import { connect } from 'react-redux';
import { accountsSetActionCreator } from '../../../../redux/accountsReducer';
import { accountTypesSetActionCreator } from '../../../../redux/accountTypesReducer';
import { userServicesSetActionCreator } from '../../../../redux/servicesPageUserReducer';
import ServicesPageUser from './ServicesPageUser';

let ServicesPageUserContainer = connect(
    state => ({
        userServices: state.servicesPageUserState.userServices,
        accounts: state.accountsState.accounts,
        accountTypes: state.accountTypesState.accountTypes,
        userId: state.authState.userId,
    }),
    dispatch => ({
        userServicesSet: data => {
            dispatch(userServicesSetActionCreator(data));
        },
        accountsSet: data => {
            dispatch(accountsSetActionCreator(data));
        },
        accountTypesSet: data => {
            dispatch(accountTypesSetActionCreator(data));
        },
    })
)(ServicesPageUser);

export default ServicesPageUserContainer;