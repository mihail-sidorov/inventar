import React from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import isEmptyObject from '../../functions/isEmptyObject';
import { departmentNamesGet } from '../../redux/departmentNamesReducer';
import { departmentsLocationsGet } from '../../redux/departmentsLocationsReducer';
import { employersGet } from '../../redux/employersReducer';
import { locationsGet } from '../../redux/locationsReducer';
import { postsDepartmentsLocationsGet } from '../../redux/postsDepartmentsLocationsReducer';
import { postsGet } from '../../redux/postsReducer';
import { required } from '../../validators/validators';
import Input from '../common/FormControls/Input';
import Select from '../common/FormControls/Select';
import InnerPageContainer from '../InnerPage/InnerPageContainer';

let Form = (props) => {
    let optionsEmployers = [];
    let optionsLocations = [];
    let optionsDepsLocs = [];
    let optionsPostsDepsLocs = [];

    for (let id in props.employers) {
        optionsEmployers.push(
            <option value={id} key={id}>{props.employers[id].employer}</option>
        );
    }

    let patternLoc = props.locationSearch ? new RegExp(props.locationSearch.toLowerCase()) : '';
    for (let id in props.locations) {
        if (props.locations[id].location.toLowerCase().match(patternLoc)) {
            optionsLocations.push(
                <option value={id} key={id}>{props.locations[id].location}</option>
            );
        }
    }

    let patternDepLoc = props.depLocSearch ? new RegExp(props.depLocSearch.toLowerCase()) : '';
    for (let id in props.departmentsLocations) {
        if (props.departmentNames[props.departmentsLocations[id].department_id]?.department.toLowerCase().match(patternDepLoc)) {
            optionsDepsLocs.push(
                <option value={id} key={id}>{props.departmentNames[props.departmentsLocations[id]?.department_id]?.department}</option>
            );
        }
    }

    let patternPostDepLoc = props.postDepLocSearch ? new RegExp(props.postDepLocSearch.toLowerCase()) : '';
    for (let id in props.postsDepartmentsLocations) {
        if (props.posts[props.postsDepartmentsLocations[id].post_id]?.post.toLowerCase().match(patternPostDepLoc)) {
            optionsPostsDepsLocs.push(
                <option value={id} key={id}>{props.posts[props.postsDepartmentsLocations[id]?.post_id]?.post}</option>
            );
        }
    }

    return (
        <form className="user-page-add__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="user-page-add__form-fields form__fields">
                <Field name="login" desc="Логин" type="text" component={Input} validate={[required]} />
                <Field name="password" desc="Пароль" type="password" component={Input} validate={[required]} />
                <Field name="full_name" desc="ФИО" type="text" component={Input} validate={[required]} />
                <Field name="phone" desc="Телефон" type="text" component={Input} />
                <Field name="email" desc="EMail" type="text" component={Input} />
                <Field name="appointment_date" desc="Дата принятия" type="date" component={Input} validate={[required]} />
                <Field name="employer_id" desc="Работодатель" component={Select} validate={[required]}>
                    <option></option>
                    {optionsEmployers}
                </Field>
                <Field name="location_id" desc="Местонахождение" component={Select} validate={[required]} onChange={(e) => {
                    props.changeLocation(e.currentTarget.value);
                }}>
                    <option></option>
                    {optionsLocations}
                </Field>
                <Field name="location_search" desc="Поиск по местонахождению" component={Input} onChange={() => {
                    props.locationClear();
                    props.changeLocation('');
                    props.changeDepartment('');
                }} />
                <Field name="dep_loc_id" desc="Отдел" component={Select} validate={[required]} onChange={(e) => {
                    props.changeDepartment(e.currentTarget.value);
                }}>
                    <option></option>
                    {optionsDepsLocs}
                </Field>
                <Field name="dep_loc_search" desc="Поиск по отделу" component={Input} onChange={() => {
                    props.depLocClear();
                    props.changeDepartment('');
                }} />
                <Field name="post_dep_loc_id" desc="Должность" component={Select} validate={[required]}>
                    <option></option>
                    {optionsPostsDepsLocs}
                </Field>
                <Field name="post_dep_loc_search" desc="Поиск по должности" component={Input} onChange={() => {
                    props.postDepLocClear();
                }} />
            </div>
            <div className="user-page-add__form-btns">
                <button className="user-page-add__form-submit-btn btn">Сохранить</button>
            </div>
        </form>
    );
}

Form = reduxForm({
    form: 'userAddForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(Form);

let UserPageAdd = (props) => {
    return (
        <div className="user-page-add">
            <div className="user-page-add__wrapper section-2">
                <Route path="/:page" render={() => (
                    <InnerPageContainer>
                        <NavLink className="user-page-add__back-to-users btn" to="/users">Вернуться к списку сотрудников</NavLink>
                        <div className="user-page-add__form-container">
                            <div className="user-page-add__title">Добавление сотрудника</div>
                            <Form {...props} />
                        </div>
                    </InnerPageContainer>
                )}/>
            </div>
        </div>
    );
}

UserPageAdd = withRouter(UserPageAdd);

export let UserPageAddClassCompopnent = class extends React.Component {
    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.employersState.employers) || isEmptyObject(state.locationsState.locations)
            || isEmptyObject(state.departmentNamesState.departmentNames) || isEmptyObject(state.postsState.posts)
            || isEmptyObject(state.departmentsLocationsState.departmentsLocations) || isEmptyObject(state.postsDepartmentsLocationsState.postsDepartmentsLocations)) {
            let promiseArr = [];

            if (isEmptyObject(state.employersState.employers)) {
                promiseArr.push(employersGet());
            }
            if (isEmptyObject(state.locationsState.locations)) {
                promiseArr.push(locationsGet());
            }
            if (isEmptyObject(state.departmentNamesState.departmentNames)) {
                promiseArr.push(departmentNamesGet());
            }
            if (isEmptyObject(state.postsState.posts)) {
                promiseArr.push(postsGet());
            }
            if (isEmptyObject(state.departmentsLocationsState.departmentsLocations)) {
                promiseArr.push(departmentsLocationsGet());
            }
            if (isEmptyObject(state.postsDepartmentsLocationsState.postsDepartmentsLocations)) {
                promiseArr.push(postsDepartmentsLocationsGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'employers') this.props.onEmployersGet(value.data);
                        if (value.config.url === 'locations') this.props.onLocationsGet(value.data);
                        if (value.config.url === 'departments') this.props.onDepartmentNamesGet(value.data);
                        if (value.config.url === 'posts') this.props.onPostsGet(value.data);
                        if (value.config.url === 'dep_loc') this.props.onDepartmentsLocationsGet(value.data);
                        if (value.config.url === 'post_dep_loc') this.props.onPostsDepartmentsLocationsGet(value.data);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <UserPageAdd {...this.props} />
        );
    }
}

export default UserPageAddClassCompopnent;