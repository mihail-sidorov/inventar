import { connect } from 'react-redux';
import { change } from 'redux-form';
import authHOC from '../../HOC/authHOC';
import { departmentNamesGetActionCreator } from '../../redux/departmentNamesReducer';
import { departmentsLocationsSetActionCreator } from '../../redux/departmentsLocationsReducer';
import { locationsGetActionCreator } from '../../redux/locationsReducer';
import { setFilterDepartmentsLocationsActionCreator } from '../../redux/postDepartmentLocationPageAddReducer';
import { makeShortPostsDepartmentsLocationsActionCreator } from '../../redux/postsDepartmentsLocationsPageReducer';
import { postDepartmentLocationAdd, postDepartmentLocationAddActionCreator, postsDepartmentsLocationsSetActionCreator } from '../../redux/postsDepartmentsLocationsReducer';
import { postsGetActionCreator } from '../../redux/postsReducer';
import PostDepartmentLocationPageAdd from './PostDepartmentLocationPageAdd';

let PostDepartmentLocationPageAddContainer = connect(
    state => ({
        posts: state.postsState.posts,
        departmentsLocations: state.postDepartmentLocationPageAddState.filterDepartmentsLocations,
        departments: state.departmentNamesState.departmentNames,
        locations: state.locationsState.locations,
        locationSearch: state.form?.postDepartmentLocationAddForm?.values?.location_search,
        depLocSearch: state.form?.postDepartmentLocationAddForm?.values?.dep_loc_search,
        postSearch: state.form?.postDepartmentLocationAddForm?.values?.post_search,
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
        setFilterDepartmentsLocations: locationId => {
            dispatch(setFilterDepartmentsLocationsActionCreator(locationId));
            dispatch(change('postDepartmentLocationAddForm', 'dep_loc_id', ''));
        },
        locationClear: () => {
            dispatch(change('postDepartmentLocationAddForm', 'location_id', ''));
        },
        depLocClear: () => {
            dispatch(change('postDepartmentLocationAddForm', 'dep_loc_id', ''));
        },
        postClear: () => {
            dispatch(change('postDepartmentLocationAddForm', 'post_id', ''));
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