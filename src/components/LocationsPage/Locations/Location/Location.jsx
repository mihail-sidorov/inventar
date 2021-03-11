import React from 'react';
import { withRouter } from 'react-router-dom';

let Location = (props) => {
    return (
        <tr onClick={() => {
            props.onGoToLocationEdit(props);
        }}>
            <td>{props.loc.location}</td>
        </tr>
    );
}

export default withRouter(Location);