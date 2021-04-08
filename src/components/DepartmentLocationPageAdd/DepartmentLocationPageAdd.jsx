import React from 'react';
import { Route, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import isEmptyObject from '../../functions/isEmptyObject';
import { departmentNamesGet } from '../../redux/departmentNamesReducer';
import { departmentsLocationsGet } from '../../redux/departmentsLocationsReducer';
import { locationsGet } from '../../redux/locationsReducer';
import InnerPageContainer from '../InnerPage/InnerPageContainer';

let Form = (props) => {
    let departmentsArr = [];
    let patternDep = props.departmentSearch ? new RegExp(props.departmentSearch.toLowerCase()) : '';
    for (let id in props.departments) {
        if (props.departments[id].department.toLowerCase().match(patternDep)) {
            departmentsArr.push(
                <option value={id} key={id}>{props.departments[id].department}</option>
            );
        }
    }

    let locationsArr = [];
    let patternLoc = props.locationSearch ? new RegExp(props.locationSearch.toLowerCase()) : '';
    for (let id in props.locations) {
        if (props.locations[id].location.toLowerCase().match(patternLoc)) {
            locationsArr.push(
                <option value={id} key={id}>{props.locations[id].location}</option>
            );
        }
    }

    return (
        <form className="departmentLocation-page-add__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="departmentLocation-page-add__form-fields form__fields">
                <div className="departmentLocation-page-add__form-field form__field">
                    <label>
                        <span><span>Отдел</span></span>
                        <Field name="department_id" component="select">
                            <option></option>
                            {departmentsArr}
                        </Field>
                        <Field className="departmentLocation-page-add__search" name="department_search" component="input" placeholder="Поиск по отделу" onChange={() => {
                            props.departmentClear();
                        }} />
                    </label>
                </div>
                <div className="departmentLocation-page-add__form-field form__field">
                    <label>
                        <span><span>Местонахождение</span></span>
                        <Field name="location_id" component="select">
                            <option></option>
                            {locationsArr}
                        </Field>
                        <Field className="departmentLocation-page-add__search" name="location_search" component="input" placeholder="Поиск по местонахождению" onChange={() => {
                            props.locationClear();
                        }} />
                    </label>
                </div>
            </div>
            <div className="departmentLocation-page-add__form-btns">
                <button className="departmentLocation-page-add__form-submit-btn btn">Сохранить</button>
            </div>
        </form>
    );
}

Form = reduxForm({
    form: 'departmentLocationAddForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(Form);

let DepartmentLocationPageAdd = (props) => {
    return(
        <div className="departmentLocation-page-add">
            <div className="departmentLocation-page-add__wrapper section-2">
                <Route path="/:page" render={() => 
                    <InnerPageContainer>
                        <NavLink className="departmentLocation-page-add__back-to-departmentsLocations btn" to="/departmentsLocations">Вернуться к списку отделов-местонахождений</NavLink>
                        <div className="departmentLocation-page-add__form-container">
                            <div className="departmentLocation-page-add__title">Добавление отдела-местонахождения</div>
                            <Form {...props} />
                        </div>
                    </InnerPageContainer>
                } />
            </div>
        </div>
    );
}

let DepartmentLocationPageAddClassComponent = class extends React.Component {
    render() {
        return <DepartmentLocationPageAdd {...this.props} />
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.departmentNamesState.departmentNames) || isEmptyObject(state.locationsState.locations)
        || isEmptyObject(state.departmentsLocationsState.departmentsLocations)) {
            let promiseArr = [];

            if (isEmptyObject(state.departmentNamesState.departmentNames)) {
                promiseArr.push(departmentNamesGet());
            }
            if (isEmptyObject(state.locationsState.locations)) {
                promiseArr.push(locationsGet());
            }
            if (isEmptyObject(state.departmentsLocationsState.departmentsLocations)) {
                promiseArr.push(departmentsLocationsGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'departments') this.props.departmentNamesSet(value.data);
                        if (value.config.url === 'locations') this.props.locationsSet(value.data);
                        if (value.config.url === 'dep_loc') this.props.departmentsLocationsSet(value.data);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}

export default withRouter(DepartmentLocationPageAddClassComponent);