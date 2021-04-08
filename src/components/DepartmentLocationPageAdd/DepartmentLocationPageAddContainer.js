import { connect } from 'react-redux';
import { change } from 'redux-form';
import authHOC from '../../HOC/authHOC';
import { departmentNamesGetActionCreator } from '../../redux/departmentNamesReducer';
import { makeShortDepartmentsLocationsActionCreator } from '../../redux/departmentsLocationsPageReducer';
import { departmentLocationAdd, departmentLocationAddActionCreator, departmentsLocationsSetActionCreator } from '../../redux/departmentsLocationsReducer';
import { locationsGetActionCreator } from '../../redux/locationsReducer';
import DepartmentLocationPageAdd from './DepartmentLocationPageAdd';

let DepartmentLocationPageAddContainer = connect(
    state => ({
        departments: state.departmentNamesState.departmentNames,
        locations: state.locationsState.locations,
        departmentSearch: state.form?.departmentLocationAddForm?.values?.department_search,
        locationSearch: state.form?.departmentLocationAddForm?.values?.location_search,
    }),
    dispatch => ({
        departmentNamesSet: data => {
            dispatch(departmentNamesGetActionCreator(data));
        },
        locationsSet: data => {
            dispatch(locationsGetActionCreator(data));
        },
        departmentsLocationsSet: data => {
            dispatch(departmentsLocationsSetActionCreator(data));
        },
        departmentClear: () => {
            dispatch(change('departmentLocationAddForm', 'department_id', ''));
        },
        locationClear: () => {
            dispatch(change('departmentLocationAddForm', 'location_id', ''));
        },
        onSubmit: (values, props) => {
            if (values.department_id && values.location_id) {
                departmentLocationAdd(values)
                    .then(res => {
                        dispatch(departmentLocationAddActionCreator(res.data));
                        dispatch(makeShortDepartmentsLocationsActionCreator(true));
                        props.history.push('/departmentsLocations');
                    })
                    .catch(err => console.log(err));
            }
        },
    })
)(DepartmentLocationPageAdd);

export default authHOC(DepartmentLocationPageAddContainer);