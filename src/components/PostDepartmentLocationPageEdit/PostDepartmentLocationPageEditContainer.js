import { connect } from 'react-redux';
import { change, initialize } from 'redux-form';
import authHOC from '../../HOC/authHOC';
import { departmentNamesGetActionCreator } from '../../redux/departmentNamesReducer';
import { departmentsLocationsSetActionCreator } from '../../redux/departmentsLocationsReducer';
import { locationsGetActionCreator } from '../../redux/locationsReducer';
import { setFilterDepartmentsLocationsPageEditActionCreator } from '../../redux/postDepartmentLocationPageEditReducer';
import { postDepartmentLocationAddActionCreator, postDepartmentLocationEdit, postsDepartmentsLocationsSetActionCreator } from '../../redux/postsDepartmentsLocationsReducer';
import { postsGetActionCreator } from '../../redux/postsReducer';
import PostDepartmentLocationPageEdit from './PostDepartmentLocationPageEdit';

let PostDepartmentLocationPageEditContainer = connect(
    state => ({
        posts: state.postsState.posts,
        departmentsLocations: state.postDepartmentLocationPageEditState.filterDepartmentsLocations,
        departments: state.departmentNamesState.departmentNames,
        locations: state.locationsState.locations,
        locationSearch: state.form?.postDepartmentLocationEditForm?.values?.location_search,
        depLocSearch: state.form?.postDepartmentLocationEditForm?.values?.dep_loc_search,
        postSearch: state.form?.postDepartmentLocationEditForm?.values?.post_search,
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
                let id = props.match.params.postDepartmentLocationId;
                let postDepartmentLocation = state.postsDepartmentsLocationsState.postsDepartmentsLocations[id];
                let location_id = state.departmentsLocationsState.departmentsLocations[postDepartmentLocation.dep_loc_id]?.location_id;
                let dep_loc_id = postDepartmentLocation.dep_loc_id;
                let post_id = postDepartmentLocation.post_id;

                dispatch(setFilterDepartmentsLocationsPageEditActionCreator(location_id));
                dispatch(initialize('postDepartmentLocationEditForm', {id, location_id, dep_loc_id, post_id}));
            }
        },
        setFilterDepartmentsLocations: locationId => {
            dispatch(setFilterDepartmentsLocationsPageEditActionCreator(locationId));
            dispatch(change('postDepartmentLocationEditForm', 'dep_loc_id', ''));
        },
        locationClear: () => {
            dispatch(change('postDepartmentLocationEditForm', 'location_id', ''));
        },
        depLocClear: () => {
            dispatch(change('postDepartmentLocationEditForm', 'dep_loc_id', ''));
        },
        postClear: () => {
            dispatch(change('postDepartmentLocationEditForm', 'post_id', ''));
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