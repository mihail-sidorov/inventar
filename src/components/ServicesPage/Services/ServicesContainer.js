import { connect } from 'react-redux';
import { accountsSetActionCreator } from '../../../redux/accountsReducer';
import { accountTypesSetActionCreator } from '../../../redux/accountTypesReducer';
import { makeShortServicesActionCreator } from '../../../redux/servicesPageReducer';
import Services from './Services';

let ServicesContainer = connect(
    state => ({
        services: state.servicesPageState.shortServices,
    }),
    dispatch => ({
        accountsSet: (accountsArr) => {
            dispatch(accountsSetActionCreator(accountsArr));
        },
        accountTypesSet: (accountTypesArr) => {
            dispatch(accountTypesSetActionCreator(accountTypesArr));
        },
        shortServicesSet: () => {
            dispatch(makeShortServicesActionCreator());
        },
    })
)(Services);

export default ServicesContainer;