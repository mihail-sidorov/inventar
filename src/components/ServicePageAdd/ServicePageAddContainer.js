import { connect } from 'react-redux';
import { accountTypesSetActionCreator } from '../../redux/accountTypesReducer';
import { serviceAdd } from '../../redux/accountsReducer';
import ServicePageAdd from './ServicePageAdd';

let ServicePageAddContainer = connect(
    state => ({
        accountTypes: state.accountTypesState.accountTypes,
    }),
    dispatch => ({
        accountTypesSet: (data) => {
            dispatch(accountTypesSetActionCreator(data));
        },
        onSubmit: (values) => {
            if (values.account_type_id && values.login && values.password) {
                serviceAdd(values)
                    .then((data) => {
                        console.log(data.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
    })
)(ServicePageAdd);

export default ServicePageAddContainer;