import { connect } from 'react-redux';
import { change, initialize } from 'redux-form';
import authHOC from '../../HOC/authHOC';
import { departmentNamesGetActionCreator } from '../../redux/departmentNamesReducer';
import { departmentLocationEdit, departmentLocationAddActionCreator, departmentsLocationsSetActionCreator } from '../../redux/departmentsLocationsReducer';
import { locationsGetActionCreator } from '../../redux/locationsReducer';
import DepartmentLocationPageEdit from './DepartmentLocationPageEdit';

let DepartmentLocationPageEditContainer = connect(
    state => ({
        departmentsLocations: state.departmentsLocationsState.departmentsLocations,
        departments: state.departmentNamesState.departmentNames,
        locations: state.locationsState.locations,
        departmentSearch: state.form?.departmentLocationEditForm?.values?.department_search,
        locationSearch: state.form?.departmentLocationEditForm?.values?.location_search,
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
            dispatch(change('departmentLocationEditForm', 'department_id', ''));
        },
        locationClear: () => {
            dispatch(change('departmentLocationEditForm', 'location_id', ''));
        },
        setInitialValues: props => {
            let state = window.store.getState();
            
            if (state.departmentsLocationsState.departmentsLocations[props.match.params.departmentLocationId] === undefined) {
                props.history.push('/departmentsLocations');
            }
            else {
                let initialValues = {...state.departmentsLocationsState.departmentsLocations[props.match.params.departmentLocationId]};
                dispatch(initialize('departmentLocationEditForm', initialValues));
            }
        },
        onSubmit: values => {
            if (values.department_id && values.location_id) {
                departmentLocationEdit(values)
                    .then(res => {
                        dispatch(departmentLocationAddActionCreator(res.data));
                        alert('Отдел-местонахождение отредактирован!');
                    })
                    .catch(err => console.log(err));
            }
        },
    })
)(DepartmentLocationPageEdit);

export default authHOC(DepartmentLocationPageEditContainer);