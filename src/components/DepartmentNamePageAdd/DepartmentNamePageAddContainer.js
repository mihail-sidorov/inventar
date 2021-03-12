import { connect } from 'react-redux';
import authHOC from '../../HOC/authHOC';
import { makeShortDepartmentNamesActionCreator } from '../../redux/departmentNamesPageReducer';
import { departmentNameAdd, departmentNameAddActionCreator, departmentNamesGetActionCreator } from '../../redux/departmentNamesReducer';
import DepartmentNamePageAdd from './DepartmentNamePageAdd';

let DepartmentNamePageAddContainer = connect(
    state => ({

    }),
    dispatch => ({
        onSubmit: (values, props) => {
            if (values.department) {
                departmentNameAdd(values)
                    .then(res => {
                        dispatch(departmentNameAddActionCreator(res.data));
                        dispatch(makeShortDepartmentNamesActionCreator(true));
                        props.history.push('/departmentNames');
                    })
                    .catch(err => console.log(err));
            }
        },
        departmentNamesSet: data => {
            dispatch(departmentNamesGetActionCreator(data));
        },
    })
)(DepartmentNamePageAdd);

export default authHOC(DepartmentNamePageAddContainer);