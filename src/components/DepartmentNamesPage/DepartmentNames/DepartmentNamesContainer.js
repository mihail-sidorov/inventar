import { connect } from 'react-redux';
import { makeShortDepartmentNamesActionCreator } from '../../../redux/departmentNamesPageReducer';
import { departmentNamesGetActionCreator } from '../../../redux/departmentNamesReducer';
import DepartmentNames from './DepartmentNames';

let DepartmentNamesContainer = connect(
    state => ({
        departmentNames: state.departmentNamesPageState.shortDepartmentNames,
    }),
    dispatch => ({
        departmentNamesSet: (departmentNamesArr) => {
            dispatch(departmentNamesGetActionCreator(departmentNamesArr));
        },
        shortDepartmentNamesSet: () => {
            dispatch(makeShortDepartmentNamesActionCreator());
        },
    })
)(DepartmentNames);

export default DepartmentNamesContainer;