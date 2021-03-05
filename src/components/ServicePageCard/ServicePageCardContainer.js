import { connect } from 'react-redux';
import { accountsSetActionCreator } from '../../redux/accountsReducer';
import { accountTypesSetActionCreator } from '../../redux/accountTypesReducer';
import { departmentsSetActionCreator } from '../../redux/departmentsReducer';
import { setServiceAttachedActionCreator } from '../../redux/servicePageEditReducer';
import { usersGetActionCreator } from '../../redux/usersReducer';
import ServicePageCard from './ServicePageCard';

let ServicePageCardContainer = connect(
    state => ({
        services: state.accountsState.accounts,
        serviceTypes: state.accountTypesState.accountTypes,
        departments: state.departmentsState.departments,
        users: state.usersState.users,
        serviceAttached: state.servicePageEditState.serviceAttached,
    }),
    dispatch => ({
        editService: (props) => {
            props.history.push(`/services/${props.match.params.serviceId}`);
        },
        accountsSet: (data) => {
            dispatch(accountsSetActionCreator(data));
        },
        accountTypesSet: (data) => {
            dispatch(accountTypesSetActionCreator(data));
        },
        departmentsSet: (data) => {
            dispatch(departmentsSetActionCreator(data));
        },
        usersSet: (data) => {
            dispatch(usersGetActionCreator(data));
        },
        setServiceAttached: (data) => {
            dispatch(setServiceAttachedActionCreator(data));
        },
    })
)(ServicePageCard);

export default ServicePageCardContainer;