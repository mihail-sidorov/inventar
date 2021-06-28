import { connect } from 'react-redux';
import User from './User';

let UserContainer = (id) => {
    return connect(
        state => ({
            user: state.usersPageState.shortUsers[id],
            post: state.postDepLocsState.postDepLocs[state.usersPageState.shortUsers[id].post_dep_loc_id],
            loc: state.locationsState.locations[state.usersPageState.shortUsers[id].location_id],
            department: state.departmentNamesState.departmentNames[state.departmentsLocationsState.departmentsLocations[state.usersPageState.shortUsers[id].dep_loc_id].department_id],
        }),
        dispatch => ({
            onGoToUserCard: (props) => {
                props.history.push(`/users/card/${props.user.id}`);
            },
        })
    )(User);
}

export default UserContainer;