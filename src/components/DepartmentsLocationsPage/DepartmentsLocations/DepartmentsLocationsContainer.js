import { connect } from 'react-redux';
import { departmentNamesGetActionCreator } from '../../../redux/departmentNamesReducer';
import { makeShortDepartmentsLocationsActionCreator } from '../../../redux/departmentsLocationsPageReducer';
import { departmentsLocationsSetActionCreator } from '../../../redux/departmentsLocationsReducer';
import { locationsGetActionCreator } from '../../../redux/locationsReducer';
import DepartmentsLocations from './DepartmentsLocations';

let DepartmentsLocationsContainer = connect(
    state => ({
        departmentsLocations: state.departmentsLocationsPageState.shortDepartmentsLocations,
    }),
    dispatch => ({
        departmentsLocationsSet: data => {
            dispatch(departmentsLocationsSetActionCreator(data));
        },
        departmentsSet: data => {
            dispatch(departmentNamesGetActionCreator(data));
        },
        locationsSet: data => {
            dispatch(locationsGetActionCreator(data));
        },
        makeShortDepartmentsLocations: () => {
            dispatch(makeShortDepartmentsLocationsActionCreator());
        },
    })
)(DepartmentsLocations);

export default DepartmentsLocationsContainer;