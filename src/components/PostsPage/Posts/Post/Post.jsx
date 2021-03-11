import React from 'react';
import { withRouter } from 'react-router-dom';

let Post = (props) => {
    return (
        <tr onClick={() => {
            props.onGoToPostEdit(props);
        }}>
            <td>{props.post.post}</td>
        </tr>
    );
}

export default withRouter(Post);