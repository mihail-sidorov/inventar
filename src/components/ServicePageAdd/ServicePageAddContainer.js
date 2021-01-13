import { connect } from 'react-redux';
import { accountTypesSetActionCreator } from '../../redux/accountTypesReducer';
import { serviceAdd, serviceAddActionCreator } from '../../redux/accountsReducer';
import ServicePageAdd from './ServicePageAdd';
import { makeShortServicesActionCreator } from '../../redux/servicesPageReducer';

let ServicePageAddContainer = connect(
    state => ({
        accountTypes: state.accountTypesState.accountTypes,
    }),
    dispatch => ({
        accountTypesSet: (data) => {
            dispatch(accountTypesSetActionCreator(data));
        },
        onSubmit: (values, props) => {
            if (values.account_type_id && values.login && values.password) {
                serviceAdd(values)
                    .then((data) => {
                        dispatch(serviceAddActionCreator(data.data));
                        dispatch(makeShortServicesActionCreator(true));
                        props.history.push('/services');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
    })
)(ServicePageAdd);

export default ServicePageAddContainer;