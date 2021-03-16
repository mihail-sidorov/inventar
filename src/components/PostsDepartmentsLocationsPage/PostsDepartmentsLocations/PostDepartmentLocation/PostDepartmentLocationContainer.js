import { connect } from 'react-redux';
import PostDepartmentLocation from './PostDepartmentLocation';

let PostDepartmentLocationContainer = (id) => {
    return connect(
        state => ({
            postDepartmentLocation: state.postsDepartmentsLocationsState.postsDepartmentsLocations[id],
            posts: state.postsState.posts,
            departmentsLocations: state.departmentsLocationsState.departmentsLocations,
            departments: state.departmentNamesState.departmentNames,
            locations: state.locationsState.locations,
        }),
        dispatch => ({
            onGoToPostDepartmentLocationEdit: (props) => {
                props.history.push(`/postsDepartmentsLocations/${props.postDepartmentLocation.id}`);
            },
        })
    )(PostDepartmentLocation);
}

export default PostDepartmentLocationContainer;