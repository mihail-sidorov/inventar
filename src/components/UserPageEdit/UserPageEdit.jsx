import React from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import isEmptyObject from '../../functions/isEmptyObject';
import { employersGet } from '../../redux/employersReducer';
import { locationsGet } from '../../redux/locationsReducer';
import { usersGet } from '../../redux/usersReducer';
import { Field, reduxForm } from 'redux-form';
import UserDevicesContainer from './UserDevices/UserDevicesContainer';
import Input from '../common/FormControls/Input';
import Select from '../common/FormControls/Select';
import { required } from '../../validators/validators';
import { departmentNamesGet } from '../../redux/departmentNamesReducer';
import { postsGet } from '../../redux/postsReducer';
import { departmentsLocationsGet } from '../../redux/departmentsLocationsReducer';
import { postsDepartmentsLocationsGet } from '../../redux/postsDepartmentsLocationsReducer';
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

    for (let id in props.locations) {
        optionsLocations.push(
            <option value={id} key={id}>{props.locations[id].location}</option>
        );
    }

    for (let id in props.departmentsLocations) {
        optionsDepsLocs.push(
            <option value={id} key={id}>{props.departmentNames[props.departmentsLocations[id]?.department_id]?.department}</option>
        );
    }

    for (let id in props.postsDepartmentsLocations) {
        optionsPostsDepsLocs.push(
            <option value={id} key={id}>{props.posts[props.postsDepartmentsLocations[id]?.post_id]?.post}</option>
        );
    }

    return (
        <form className="user-page-edit__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="user-page-edit__form-fields form__fields">
                <Field name="login" desc="Логин" type="text" component={Input} validate={[required]} />
                <Field name="password" desc="Пароль" type="password" component={Input} />
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
                <Field name="dep_loc_id" desc="Отдел" component={Select} validate={[required]} onChange={(e) => {
                    props.changeDepartment(e.currentTarget.value);
                }}>
                    <option></option>
                    {optionsDepsLocs}
                </Field>
                <Field name="post_dep_loc_id" desc="Должность" component={Select} validate={[required]}>
                    <option></option>
                    {optionsPostsDepsLocs}
                </Field>
            </div>
            <div className="user-page-edit__form-btns">
                <button className="user-page-edit__form-submit-btn btn">Сохранить</button>
            </div>
        </form>
    );
}

Form = reduxForm({
    form: 'userEditForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(Form);

let UserPageEdit = (props) => {
    return (
        <div className="user-page-edit">
            <div className="user-page-edit__wrapper section-2">
                <Route path="/:page" render={() => (
                    <InnerPageContainer>
                        <NavLink className="user-page-edit__back-to-users btn" to={`/users/card/${props.match.params.userId}`}>Вернуться в карточку сотрудника</NavLink>
                        <div className="user-page-edit__form-container">
                            <Form {...props} />
                        </div>
                        <Route path="/users/:userId" render={() => <UserDevicesContainer /> } />
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

let UserPageEditClassComponent = class extends React.Component {
    render() {
        return (
            <UserPageEdit {...this.props} />
        );
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.employersState.employers) || isEmptyObject(state.locationsState.locations)
        || isEmptyObject(state.departmentNamesState.departmentNames) || isEmptyObject(state.postsState.posts)
        || isEmptyObject(state.departmentsLocationsState.departmentsLocations) || isEmptyObject(state.postsDepartmentsLocationsState.postsDepartmentsLocations)
        || isEmptyObject(state.usersState.users)) {
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

            if (isEmptyObject(state.usersState.users)) {
                promiseArr.push(usersGet());
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
                        if (value.config.url === 'users') this.props.onUsersGet(value.data);
                    });

                    this.props.onInitialValuesSet(this.props.match.params.userId);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            this.props.onInitialValuesSet(this.props.match.params.userId);
        }
    }
}

let userPageEditWithRouter = withRouter(UserPageEditClassComponent);

export default userPageEditWithRouter;