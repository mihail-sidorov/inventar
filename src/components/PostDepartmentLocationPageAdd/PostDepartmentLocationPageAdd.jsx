import React from 'react';
import { Route, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import isEmptyObject from '../../functions/isEmptyObject';
import { departmentNamesGet } from '../../redux/departmentNamesReducer';
import { departmentsLocationsGet } from '../../redux/departmentsLocationsReducer';
import { locationsGet } from '../../redux/locationsReducer';
import { postsGet } from '../../redux/postsReducer';
import InnerPageContainer from '../InnerPage/InnerPageContainer';
import $ from 'jquery';

let Form = (props) => {
    let locationsArr = [];
    let patternLoc = props.locationSearch ? new RegExp(props.locationSearch.toLowerCase()) : '';
    for (let id in props.locations) {
        if (props.locations[id].location.toLowerCase().match(patternLoc)) {
            locationsArr.push(
                <option value={id} key={id}>{props.locations[id].location}</option>
            );
        }
    }

    let departmentsLocationsArr = [];
    let patternDepLoc = props.depLocSearch ? new RegExp(props.depLocSearch.toLowerCase()) : '';
    for (let id in props.departmentsLocations) {
        if (props.departments[props.departmentsLocations[id].department_id]?.department.toLowerCase().match(patternDepLoc)) {
            departmentsLocationsArr.push(
                <option value={id} key={id}>{props.departments[props.departmentsLocations[id].department_id]?.department}</option>
            );
        }
    }

    let postsArr = [];
    let patternPost = props.postSearch ? new RegExp(props.postSearch.toLowerCase()) : '';
    for (let id in props.posts) {
        if (props.posts[id].post.toLowerCase().match(patternPost)) {
            postsArr.push(
                <option value={id} key={id}>{props.posts[id].post}</option>
            );
        }
    }

    return (
        <form className="postDepartmentLocation-page-add__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="postDepartmentLocation-page-add__form-fields form__fields">
                <div className="postDepartmentLocation-page-add__form-field form__field">
                    <label>
                        <span><span>Местонахождение</span></span>
                        <Field name="location_id" component="select" onChange={(e) => {
                            props.setFilterDepartmentsLocations(e.currentTarget.value);
                        }} >
                            <option></option>
                            {locationsArr}
                        </Field>
                        <Field className="postDepartmentLocation-page-add__search" name="location_search" component="input" placeholder="Поиск по местонахождению" onChange={() => {
                            props.locationClear();
                            props.setFilterDepartmentsLocations('');
                        }} />
                    </label>
                </div>
                <div className="postDepartmentLocation-page-add__form-field form__field">
                    <label>
                        <span><span>Отдел</span></span>
                        <Field name="dep_loc_id" component="select">
                            <option></option>
                            {departmentsLocationsArr}
                        </Field>
                        <Field className="postDepartmentLocation-page-add__search" name="dep_loc_search" component="input" placeholder="Поиск по отделу" onChange={() => {
                            props.depLocClear();
                        }} />
                    </label>
                </div>
                <div className="postDepartmentLocation-page-add__form-field form__field">
                    <label>
                        <span><span>Должность</span></span>
                        <Field name="post_id" component="select">
                            <option></option>
                            {postsArr}
                        </Field>
                        <Field className="postDepartmentLocation-page-add__search" name="post_search" component="input" placeholder="Поиск по должности" onChange={() => {
                            props.postClear();
                        }} />
                    </label>
                </div>
            </div>
            <div className="postDepartmentLocation-page-add__form-btns">
                <button className="postDepartmentLocation-page-add__form-submit-btn btn">Сохранить</button>
            </div>
        </form>
    );
}

Form = reduxForm({
    form: 'postDepartmentLocationAddForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(Form);

let PostDepartmentLocationPageAdd = (props) => {
    return(
        <div className="postDepartmentLocation-page-add">
            <div className="postDepartmentLocation-page-add__wrapper section-2">
                <Route path="/:page" render={() => 
                    <InnerPageContainer>
                        <NavLink className="postDepartmentLocation-page-add__back-to-postsDepartmentsLocations btn" to="/postsDepartmentsLocations">Вернуться к списку должностей-отделов-местонахождений</NavLink>
                        <div className="postDepartmentLocation-page-add__form-container">
                            <div className="postDepartmentLocation-page-add__title">Добавление должности-отдела-местонахождения</div>
                            <Form {...props} />
                        </div>
                    </InnerPageContainer>
                } />
            </div>
        </div>
    );
}

let PostDepartmentLocationPageAddClassComponent = class extends React.Component {
    render() {
        return <PostDepartmentLocationPageAdd {...this.props} />
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.postsState.posts) || isEmptyObject(state.departmentsLocationsState.departmentsLocations)
        || isEmptyObject(state.departmentNamesState.departmentNames) || isEmptyObject(state.locationsState.locations)) {
            let promiseArr = [];

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
                        if (value.config.url === 'posts') this.props.postsSet(value.data);
                        if (value.config.url === 'dep_loc') this.props.departmentsLocationsSet(value.data);
                        if (value.config.url === 'departments') this.props.departmentNamesSet(value.data);
                        if (value.config.url === 'locations') this.props.locationsSet(value.data);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}

export default withRouter(PostDepartmentLocationPageAddClassComponent);