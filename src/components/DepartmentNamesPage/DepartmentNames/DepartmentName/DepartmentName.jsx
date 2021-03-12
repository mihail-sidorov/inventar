import React from 'react';
import { withRouter } from 'react-router-dom';

let DepartmentName = (props) => {
    return (
        <tr onClick={() => {
            props.onGoToDepartmentNameEdit(props);
        }}>
            <td>{props.departmentName.department}</td>
        </tr>
    );
}

export default withRouter(DepartmentName);