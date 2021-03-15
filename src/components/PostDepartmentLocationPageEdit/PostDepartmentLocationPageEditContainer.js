import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import authHOC from '../../HOC/authHOC';
import { departmentNamesGetActionCreator } from '../../redux/departmentNamesReducer';
import { departmentsLocationsSetActionCreator } from '../../redux/departmentsLocationsReducer';
import { locationsGetActionCreator } from '../../redux/locationsReducer';
import { postDepartmentLocationAddActionCreator, postDepartmentLocationEdit, postsDepartmentsLocationsSetActionCreator } from '../../redux/postsDepartmentsLocationsReducer';
import { postsGetActionCreator } from '../../redux/postsReducer';
import PostDepartmentLocationPageEdit from './PostDepartmentLocationPageEdit';

let PostDepartmentLocationPageEditContainer = connect(
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
        setInitialValues: props => {
            let state = window.store.getState();
            
            if (state.postsDepartmentsLocationsState.postsDepartmentsLocations[props.match.params.postDepartmentLocationId] === undefined) {
                props.history.push('/postsDepartmentsLocations');
            }
            else {
                let initialValues = {...state.postsDepartmentsLocationsState.postsDepartmentsLocations[props.match.params.postDepartmentLocationId]};
                dispatch(initialize('postDepartmentLocationEditForm', initialValues));
            }
        },
        onSubmit: (values, props) => {
            if (values.post_id && values.dep_loc_id) {
                postDepartmentLocationEdit(values)
                    .then(res => {
                        dispatch(postDepartmentLocationAddActionCreator(res.data));
                        alert('Должность-отдел-местонахождение отредактирована!');
                    })
                    .catch(err => console.log(err));
            }
        },
    })
)(PostDepartmentLocationPageEdit);

export default authHOC(PostDepartmentLocationPageEditContainer);