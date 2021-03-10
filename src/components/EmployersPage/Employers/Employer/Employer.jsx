import React from 'react';
import { withRouter } from 'react-router-dom';

let Employer = (props) => {
    return (
        <tr onClick={() => {
            props.onGoToEmployerEdit(props);
        }}>
            <td>{props.employer.employer}</td>
        </tr>
    );
}

export default withRouter(Employer);