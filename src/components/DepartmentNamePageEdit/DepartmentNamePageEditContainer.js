import { connect } from 'react-redux';
import { departmentNameAddActionCreator, departmentNameEdit, departmentNamesGetActionCreator } from '../../redux/departmentNamesReducer';
import DepartmentNamePageEdit from './DepartmentNamePageEdit';
import { initialize } from 'redux-form';
import authHOC from '../../HOC/authHOC';

let DepartmentNamePageEditContainer = connect(
    state => ({

    }),
    dispatch => ({
        onSubmit: (values) => {
            if (values.department) {
                departmentNameEdit(values)
                    .then((res) => {
                        dispatch(departmentNameAddActionCreator(res.data));
                        alert('Отдел отредактирован!');
                    })
                    .catch((error) => console.log(error));
            }
        },
        departmentNamesSet: (data) => {
            dispatch(departmentNamesGetActionCreator(data));
        },
        onInitialValuesSet: (departmentNameId, history) => {
            let state = window.store.getState();
            
            if (state.departmentNamesState.departmentNames[departmentNameId] === undefined) {
                history.push('/departmentNames');
            }
            else {
                let initialValues = {...state.departmentNamesState.departmentNames[departmentNameId]};
                dispatch(initialize('departmentNameEditForm', initialValues));
            }
        },
    })
)(DepartmentNamePageEdit);

export default authHOC(DepartmentNamePageEditContainer);