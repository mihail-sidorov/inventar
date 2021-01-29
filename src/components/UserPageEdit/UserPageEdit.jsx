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
import Input from '../common/FormControls/Input';
import Select from '../common/FormControls/Select';
import { required } from '../../validators/validators';

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
                <Field name="full_name" desc="ФИО" type="text" component={Input} validate={[required]} />
                <Field name="phone" desc="Телефон" type="text" component={Input} validate={[required]} />
                <Field name="email" desc="EMail" type="text" component={Input} validate={[required]} />
                <Field name="appointment_date" desc="Дата принятия" type="date" component={Input} validate={[required]} />
                <Field name="employer_id" desc="Работодатель" component={Select} validate={[required]}>
                    <option></option>
                    {optionsEmployers}
                </Field>
                <Field name="location_id" desc="Местонахождение" component={Select} validate={[required]}>
                    <option></option>
                    {optionsLocations}
                </Field>
                <Field name="post_dep_loc_id" desc="Должность" component={Select} validate={[required]}>
                    <option></option>
                    {optionsPostDepLocs}
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