import { connect } from 'react-redux';
import { employerAddActionCreator, employerEdit, employersGetActionCreator } from '../../redux/employersReducer';
import EmployerPageEdit from './EmployerPageEdit';
import { initialize } from 'redux-form';

let EmployerPageEditContainer = connect(
    state => ({

    }),
    dispatch => ({
        onSubmit: (values) => {
            if (values.employer) {
                employerEdit(values)
                    .then((res) => {
                        dispatch(employerAddActionCreator(res.data));
                        alert('Работодатель отредактирован!');
                    })
                    .catch((error) => console.log(error));
            }
        },
        employersSet: (data) => {
            dispatch(employersGetActionCreator(data));
        },
        onInitialValuesSet: (employerId, history) => {
            let state = window.store.getState();
            
            if (state.employersState.employers[employerId] === undefined) {
                history.push('/employers');
            }
            else {
                let initialValues = {...state.employersState.employers[employerId]};
                dispatch(initialize('employerEditForm', initialValues));
            }
        },
    })
)(EmployerPageEdit);

export default EmployerPageEditContainer;