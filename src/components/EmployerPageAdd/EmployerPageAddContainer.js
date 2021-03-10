import { connect } from 'react-redux';
import { employerAddActionCreator, employerAdd, employersGetActionCreator } from '../../redux/employersReducer';
import EmployerPageAdd from './EmployerPageAdd';

let EmployerPageAddContainer = connect(
    state => ({

    }),
    dispatch => ({
        onSubmit: (values) => {
            if (values.employer) {
                employerAdd(values)
                    .then((res) => {
                        dispatch(employerAddActionCreator(res.data));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        employersSet: (data) => {
            dispatch(employersGetActionCreator(data));
        },
    })
)(EmployerPageAdd);

export default EmployerPageAddContainer;