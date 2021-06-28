import React from 'react';
import { withRouter } from 'react-router-dom';

let User = (props) => {
    return (
        <tr onClick={() => {
            props.onGoToUserCard(props);
        }}>
            <td>{props.user.full_name}</td>
            <td>{props.post.post}</td>
            <td>{props.loc.location}</td>
            <td>{props.department.department}</td>
        </tr>
    );
}

export default withRouter(User);