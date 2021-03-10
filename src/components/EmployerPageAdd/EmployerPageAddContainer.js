import { connect } from 'react-redux';
import authHOC from '../../HOC/authHOC';
import { makeShortEmployersActionCreator } from '../../redux/employersPageReducer';
import { employerAddActionCreator, employerAdd, employersGetActionCreator } from '../../redux/employersReducer';
import EmployerPageAdd from './EmployerPageAdd';

let EmployerPageAddContainer = connect(
    state => ({

    }),
    dispatch => ({
        onSubmit: (values, props) => {
            if (values.employer) {
                employerAdd(values)
                    .then((res) => {
                        dispatch(employerAddActionCreator(res.data));
                        dispatch(makeShortEmployersActionCreator(true));
                        props.history.push('/employers');
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

export default authHOC(EmployerPageAddContainer);