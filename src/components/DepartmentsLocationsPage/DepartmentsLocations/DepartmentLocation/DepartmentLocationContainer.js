import { connect } from 'react-redux';
import DepartmentLocation from './DepartmentLocation';

let DepartmentLocationContainer = (id) => {
    return connect(
        state => ({
            departmentLocation: state.departmentsLocationsState.departmentsLocations[id],
            departments: state.departmentNamesState.departmentNames,
            locations: state.locationsState.locations,
        }),
        dispatch => ({
            onGoToDepartmentLocationEdit: (props) => {
                props.history.push(`/departmentsLocations/${props.departmentLocation.id}`);
            },
        })
    )(DepartmentLocation);
}

export default DepartmentLocationContainer;