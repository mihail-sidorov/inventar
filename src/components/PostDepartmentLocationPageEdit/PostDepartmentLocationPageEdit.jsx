import React from 'react';
import { Route, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import isEmptyObject from '../../functions/isEmptyObject';
import { departmentNamesGet } from '../../redux/departmentNamesReducer';
import { departmentsLocationsGet } from '../../redux/departmentsLocationsReducer';
import { locationsGet } from '../../redux/locationsReducer';
import { postsDepartmentsLocationsGet } from '../../redux/postsDepartmentsLocationsReducer';
import { postsGet } from '../../redux/postsReducer';
import InnerPage from '../InnerPage/InnerPage';

let Form = (props) => {
    let postsArr = [];
    for (let id in props.posts) {
        postsArr.push(
            <option value={id} key={id}>{props.posts[id].post}</option>
        );
    }

    let departmentsLocationsArr = [];
    for (let id in props.departmentsLocations) {
        departmentsLocationsArr.push(
            <option value={id} key={id}>Отдел: {props.departments[props.departmentsLocations[id].department_id]?.department}, Местонахождение: {props.locations[props.departmentsLocations[id].location_id]?.location}</option>
        );
    }

    return (
        <form className="postDepartmentLocation-page-edit__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="postDepartmentLocation-page-edit__form-fields form__fields">
                <div className="postDepartmentLocation-page-edit__form-field form__field">
                    <label>
                        <span><span>Должность</span></span>
                        <Field name="post_id" component="select">
                            <option></option>
                            {postsArr}
                        </Field>
                    </label>
                </div>
                <div className="postDepartmentLocation-page-edit__form-field form__field">
                    <label>
                        <span><span>Отдел-местонахождение</span></span>
                        <Field name="dep_loc_id" component="select">
                            <option></option>
                            {departmentsLocationsArr}
                        </Field>
                    </label>
                </div>
            </div>
            <div className="postDepartmentLocation-page-edit__form-btns">
                <button className="postDepartmentLocation-page-edit__form-submit-btn btn">Сохранить</button>
            </div>
        </form>
    );
}

Form = reduxForm({
    form: 'postDepartmentLocationEditForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(Form);

let PostDepartmentLocationPageEdit = (props) => {
    return(
        <div className="postDepartmentLocation-page-edit">
            <div className="postDepartmentLocation-page-edit__wrapper section-2">
                <Route path="/:page" render={() => 
                    <InnerPage>
                        <NavLink className="postDepartmentLocation-page-edit__back-to-postsDepartmentsLocations btn" to="/postsDepartmentsLocations">Вернуться к списку должностей-отделов-местонахождений</NavLink>
                        <div className="postDepartmentLocation-page-edit__form-container">
                            <div className="postDepartmentLocation-page-edit__title">Редактирование должности-отдела-местонахождения</div>
                            <Form {...props} />
                        </div>
                    </InnerPage>
                } />
            </div>
        </div>
    );
}

let PostDepartmentLocationPageEditClassComponent = class extends React.Component {
    render() {
        return <PostDepartmentLocationPageEdit {...this.props} />
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.postsDepartmentsLocationsState.postsDepartmentsLocations) || isEmptyObject(state.postsState.posts)
        || isEmptyObject(state.departmentsLocationsState.departmentsLocations) || isEmptyObject(state.departmentNamesState.departmentNames)
        || isEmptyObject(state.locationsState.locations)) {
            let promiseArr = [];

            if (isEmptyObject(state.postsDepartmentsLocationsState.postsDepartmentsLocations)) {
                promiseArr.push(postsDepartmentsLocationsGet());
            }
            if (isEmptyObject(state.postsState.posts)) {
                promiseArr.push(postsGet());
            }
            if (isEmptyObject(state.departmentsLocationsState.departmentsLocations)) {
                promiseArr.push(departmentsLocationsGet());
            }
            if (isEmptyObject(state.departmentNamesState.departmentNames)) {
                promiseArr.push(departmentNamesGet());
            }
            if (isEmptyObject(state.locationsState.locations)) {
                promiseArr.push(locationsGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'post_dep_loc') this.props.postsDepartmentsLocationsSet(value.data);
                        if (value.config.url === 'posts') this.props.postsSet(value.data);
                        if (value.config.url === 'dep_loc') this.props.departmentsLocationsSet(value.data);
                        if (value.config.url === 'departments') this.props.departmentNamesSet(value.data);
                        if (value.config.url === 'locations') this.props.locationsSet(value.data);
                    });
                    this.props.setInitialValues(this.props);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            this.props.setInitialValues(this.props);
        }
    }
}

export default withRouter(PostDepartmentLocationPageEditClassComponent);