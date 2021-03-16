import { connect } from 'react-redux';
import authHOC from '../../HOC/authHOC';
import { departmentNamesGetActionCreator } from '../../redux/departmentNamesReducer';
import { departmentsLocationsSetActionCreator } from '../../redux/departmentsLocationsReducer';
import { locationsGetActionCreator } from '../../redux/locationsReducer';
import { makeShortPostsDepartmentsLocationsActionCreator } from '../../redux/postsDepartmentsLocationsPageReducer';
import { postDepartmentLocationAdd, postDepartmentLocationAddActionCreator, postsDepartmentsLocationsSetActionCreator } from '../../redux/postsDepartmentsLocationsReducer';
import { postsGetActionCreator } from '../../redux/postsReducer';
import PostDepartmentLocationPageAdd from './PostDepartmentLocationPageAdd';

let PostDepartmentLocationPageAddContainer = connect(
    state => ({
        posts: state.postsState.posts,
        departmentsLocations: state.departmentsLocationsState.departmentsLocations,
        departments: state.departmentNamesState.departmentNames,
        locations: state.locationsState.locations,
    }),
    dispatch => ({
        postsDepartmentsLocationsSet: data => {
            dispatch(postsDepartmentsLocationsSetActionCreator(data));
        },
        postsSet: data => {
            dispatch(postsGetActionCreator(data));
        },
        departmentsLocationsSet: data => {
            dispatch(departmentsLocationsSetActionCreator(data));
        },
        departmentNamesSet: data => {
            dispatch(departmentNamesGetActionCreator(data));
        },
        locationsSet: data => {
            dispatch(locationsGetActionCreator(data));
        },
        onSubmit: (values, props) => {
            if (values.post_id && values.dep_loc_id) {
                postDepartmentLocationAdd(values)
                    .then(res => {
                        dispatch(postDepartmentLocationAddActionCreator(res.data));
                        dispatch(makeShortPostsDepartmentsLocationsActionCreator(true));
                        props.history.push('/postsDepartmentsLocations');
                    })
                    .catch(err => console.log(err));
            }
        },
    })
)(PostDepartmentLocationPageAdd);

export default authHOC(PostDepartmentLocationPageAddContainer);