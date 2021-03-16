import { connect } from 'react-redux';
import { departmentNamesGetActionCreator } from '../../../redux/departmentNamesReducer';
import { departmentsLocationsSetActionCreator } from '../../../redux/departmentsLocationsReducer';
import { locationsGetActionCreator } from '../../../redux/locationsReducer';
import { makeShortPostsDepartmentsLocationsActionCreator } from '../../../redux/postsDepartmentsLocationsPageReducer';
import { postsDepartmentsLocationsSetActionCreator } from '../../../redux/postsDepartmentsLocationsReducer';
import { postsGetActionCreator } from '../../../redux/postsReducer';
import PostsDepartmentsLocations from './PostsDepartmentsLocations';

let PostsDepartmentsLocationsContainer = connect(
    state => ({
        postsDepartmentsLocations: state.postsDepartmentsLocationsPageState.shortPostsDepartmentsLocations,
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
        departmentsSet: data => {
            dispatch(departmentNamesGetActionCreator(data));
        },
        locationsSet: data => {
            dispatch(locationsGetActionCreator(data));
        },
        makeShortPostsDepartmentsLocations: data => {
            dispatch(makeShortPostsDepartmentsLocationsActionCreator());
        },
    })
)(PostsDepartmentsLocations);

export default PostsDepartmentsLocationsContainer;