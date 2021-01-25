import { connect } from 'react-redux';
import User from './User';

let UserContainer = (id) => {
    return connect(
        state => ({
            user: state.usersPageState.shortUsers[id],
            post: state.postDepLocsState.postDepLocs[state.usersPageState.shortUsers[id].post_dep_loc_id],
        }),
        dispatch => ({
            onGoToUserCard: (props) => {
                props.history.push(`/users/card/${props.user.id}`);
            },
        })
    )(User);
}

export default UserContainer;