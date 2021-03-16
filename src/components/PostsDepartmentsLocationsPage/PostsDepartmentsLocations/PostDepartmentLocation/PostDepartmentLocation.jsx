import React from 'react';
import { withRouter } from 'react-router-dom';

let PostDepartmentLocation = (props) => {
    return (
        <tr onClick={() => {
            props.onGoToPostDepartmentLocationEdit(props);
        }}>
            <td>{props.posts[props.postDepartmentLocation.post_id]?.post}</td>
            <td>{props.departments[props.departmentsLocations[props.postDepartmentLocation.dep_loc_id]?.department_id]?.department}</td>
            <td>{props.locations[props.departmentsLocations[props.postDepartmentLocation.dep_loc_id]?.location_id]?.location}</td>
        </tr>
    );
}

export default withRouter(PostDepartmentLocation);