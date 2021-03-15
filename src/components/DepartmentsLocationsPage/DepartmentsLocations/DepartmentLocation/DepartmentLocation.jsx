import React from 'react';
import { withRouter } from 'react-router-dom';

let DepartmentLocation = (props) => {
    return (
        <tr onClick={() => {
            props.onGoToDepartmentLocationEdit(props);
        }}>
            <td>{props.departments[props.departmentLocation.department_id]?.department}</td>
            <td>{props.locations[props.departmentLocation.location_id]?.location}</td>
        </tr>
    );
}

export default withRouter(DepartmentLocation);