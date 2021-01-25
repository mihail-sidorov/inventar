import React from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import isEmptyObject from '../../functions/isEmptyObject';
import { employersGet } from '../../redux/employersReducer';
import { locationsGet } from '../../redux/locationsReducer';
import { postDepLocsGet } from '../../redux/postDepLocsReducer';
import { usersGet } from '../../redux/usersReducer';
import InnerPage from '../InnerPage/InnerPage';
import { Field, reduxForm } from 'redux-form';
import UserDevicesContainer from './UserDevices/UserDevicesContainer';

let Form = (props) => {
    let optionsEmployers = [];
    let optionsLocations = [];
    let optionsPostDepLocs = [];

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

    for (let id in props.postDepLocs) {
        optionsPostDepLocs.push(
            <option value={id} key={id}>{`Должность: ${props.postDepLocs[id].post}, Отдел: ${props.postDepLocs[id].department}, Местонахождение: ${props.postDepLocs[id].location}`}</option>
        );
    }

    return (
        <form className="user-page-edit__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="user-page-edit__form-fields form__fields">
                <div className="user-page-edit__form-field form__field">
                    <label><span><span>ФИО</span></span><Field name="full_name" component="input" type="text" /></label>
                </div>
                <div className="user-page-edit__form-field form__field">
                    <label><span><span>Телефон</span></span><Field name="phone" component="input" type="text" /></label>
                </div>
                <div className="user-page-edit__form-field form__field">
                    <label><span><span>EMail</span></span><Field name="email" component="input" type="text" /></label>
                </div>
                <div className="user-page-edit__form-field form__field">
                    <label><span><span>Дата принятия</span></span><Field name="appointment_date" component="input" type="date" /></label>
                </div>
                <div className="user-page-edit__form-field form__field">
                    <label>
                        <span><span>Работодатель</span></span>
                        <Field name="employer_id" component="select">
                            <option></option>
                            {optionsEmployers}
                        </Field>
                    </label>
                </div>
                <div className="user-page-edit__form-field form__field">
                    <label>
                        <span><span>Местонахождение</span></span>
                        <Field name="location_id" component="select">
                            <option></option>
                            {optionsLocations}
                        </Field>
                    </label>
                </div>
                <div className="user-page-edit__form-field form__field">
                    <label>
                        <span><span>Должность</span></span>
                        <Field name="post_dep_loc_id" component="select">
                            <option></option>
                            {optionsPostDepLocs}
                        </Field>
                    </label>
                </div>
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
                    <InnerPage>
                        <NavLink className="user-page-edit__back-to-users btn" to={`/users/card/${props.match.params.userId}`}>Вернуться в карточку сотрудника</NavLink>
                        <div className="user-page-edit__form-container">
                            <Form {...props} />
                        </div>
                        <Route path="/users/:userId" render={() => <UserDevicesContainer /> } />
                    </InnerPage>
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

    loadUserData() {
        let state = window.store.getState();

        if (isEmptyObject(state.employersState.employers) || isEmptyObject(state.locationsState.locations)
            || isEmptyObject(state.postDepLocsState.postDepLocs) || isEmptyObject(state.usersState.users)) {
            let promiseArr = [];

            if (isEmptyObject(state.employersState.employers)) {
                promiseArr.push(employersGet());
            }

            if (isEmptyObject(state.locationsState.locations)) {
                promiseArr.push(locationsGet());
            }

            if (isEmptyObject(state.postDepLocsState.postDepLocs)) {
                promiseArr.push(postDepLocsGet());
            }

            if (isEmptyObject(state.usersState.users)) {
                promiseArr.push(usersGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'employers') this.props.onEmployersGet(value.data);
                        if (value.config.url === 'locations') this.props.onLocationsGet(value.data);
                        if (value.config.url === 'post_dep_loc_united?status=free') this.props.onPostDepLocsGet(value.data);
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

    componentDidMount() {
        this.loadUserData();
    }

    componentDidUpdate() {
        this.loadUserData();
    }
}

let userPageEditWithRouter = withRouter(UserPageEditClassComponent);

export default userPageEditWithRouter;