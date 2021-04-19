import React from 'react';
import { withRouter } from 'react-router-dom';

let Software = (props) => {
    return (
        <tr onClick={() => {
            props.onGoToSoftwareCard(props);
        }}>
            <td>{props.categories[props.software.software_category_id]?.name}</td>
        </tr>
    );
}

export default withRouter(Software);