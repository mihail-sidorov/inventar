import { connect } from 'react-redux';
import authHOC from '../../HOC/authHOC';
import { departmentNamesGetActionCreator } from '../../redux/departmentNamesReducer';
import { departmentsLocationsSetActionCreator } from '../../redux/departmentsLocationsReducer';
import { employersGetActionCreator } from '../../redux/employersReducer';
import { locationsGetActionCreator } from '../../redux/locationsReducer';
import { postsDepartmentsLocationsSetActionCreator } from '../../redux/postsDepartmentsLocationsReducer';
import { postsGetActionCreator } from '../../redux/postsReducer';
import { wasAddUserActionCreator } from '../../redux/usersPageReducer';
import { changeDepartmentOnUserPageAddActionCreator, changeLocationOnUserPageAddActionCreator } from '../../redux/userPageAddReducer';
import { usersPost, usersPostActionCreator } from '../../redux/usersReducer';
import UserPageAdd from './UserPageAdd';
import { change } from 'redux-form';

let UserPageAddContainer = connect(
    state => ({
        employers: state.employersState.employers,
        locations: state.locationsState.locations,
        departmentNames: state.departmentNamesState.departmentNames,
        posts: state.postsState.posts,
        departmentsLocations: state.userPageAddState.filterDepartmentsLocations,
        postsDepartmentsLocations: state.userPageAddState.filterPostsDepartmentsLocations,
        locationSearch: state.form?.userAddForm?.values?.location_search,
        depLocSearch: state.form?.userAddForm?.values?.dep_loc_search,
        postDepLocSearch: state.form?.userAddForm?.values?.post_dep_loc_search,
    }),
    dispatch => ({
        onEmployersGet: (data) => {
            dispatch(employersGetActionCreator(data));
        },
        onLocationsGet: (data) => {
            dispatch(locationsGetActionCreator(data));
        },
        onDepartmentNamesGet: (data) => {
            dispatch(departmentNamesGetActionCreator(data));
        },
        onPostsGet: (data) => {
            dispatch(postsGetActionCreator(data));
        },
        onDepartmentsLocationsGet : data => {
            dispatch(departmentsLocationsSetActionCreator(data));
        },
        onPostsDepartmentsLocationsGet : data => {
            dispatch(postsDepartmentsLocationsSetActionCreator(data));
        },
        changeLocation: locationId => {
            dispatch(changeLocationOnUserPageAddActionCreator(locationId));
            dispatch(change('userAddForm', 'dep_loc_id', ''));
            dispatch(change('userAddForm', 'post_dep_loc_id', ''));
        },
        changeDepartment: departmentId => {
            dispatch(changeDepartmentOnUserPageAddActionCreator(departmentId));
            dispatch(change('userAddForm', 'post_dep_loc_id', ''));
        },
        locationClear: () => {
            dispatch(change('userAddForm', 'location_id', ''));
        },
        depLocClear: () => {
            dispatch(change('userAddForm', 'dep_loc_id', ''));
        },
        postDepLocClear: () => {
            dispatch(change('userAddForm', 'post_dep_loc_id', ''));
        },
        onSubmit: (values, props) => {
            let sendValues = {...values};

            sendValues.contact = {};
            if (sendValues.phone !== undefined) {
                sendValues.contact.phone = sendValues.phone;
                delete sendValues.phone;
            }
            if (sendValues.email !== undefined) {
                sendValues.contact.email = sendValues.email;
                delete sendValues.email;
            }

            usersPost(sendValues)
                .then((response) => {
                    dispatch(usersPostActionCreator(response.data));
                    dispatch(wasAddUserActionCreator());
                    props.history.push('/users');
                })
                .catch((error) => {
                    dispatch({
                        type: 'USER_ADD_FORM_VALIDATE',
                        errors: error.response.data.message,
                    });
                });
        },
    })
)(UserPageAdd);

export default authHOC(UserPageAddContainer);