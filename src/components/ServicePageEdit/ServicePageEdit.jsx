import React from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import isEmptyObject from '../../functions/isEmptyObject';
import { accountsGet } from '../../redux/accountsReducer';
import { accountTypesGet } from '../../redux/accountTypesReducer';
import InnerPageContainer from '../InnerPage/InnerPageContainer';
import ServiceEntitiesContainer from './ServiceEntities/ServiceEntitiesContainer';

let Form = (props) => {
    let optionsAccountTypes = [];

    for (let id in props.accountTypes) {
        optionsAccountTypes.push(
            <option value={id} key={id}>{props.accountTypes[id].account_type}</option>
        );
    }

    return (
        <form className="service-page-edit__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="service-page-edit__form-fields form__fields">
                <div className="service-page-edit__form-field form__field">
                    <label>
                        <span><span>Тип</span></span>
                        <Field name="account_type_id" component="select">
                            <option></option>
                            {optionsAccountTypes}
                        </Field>
                    </label>
                </div>
                <div className="service-page-edit__form-field form__field">
                    <label><span><span>Логин</span></span><Field name="login" component="input" type="text" /></label>
                </div>
                <div className="service-page-edit__form-field form__field">
                    <label><span><span>Пароль</span></span><Field name="password" component="input" type="text" /></label>
                </div>
                <div className="service-page-add__form-field form__field">
                    <label><span><span>Адрес сервиса</span></span><Field name="url" component="input" type="text" /></label>
                </div>
                <div className="service-page-add__form-field form__field">
                    <label><span><span>Комментарии</span></span><Field name="comments" component="input" type="text" /></label>
                </div>
            </div>
            <div className="service-page-edit__form-btns">
                <button className="service-page-edit__form-submit-btn btn">Сохранить</button>
            </div>
        </form>
    );
}

Form = reduxForm({
    form: 'serviceEditForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(Form);

let ServicePageEdit = (props) => {
    return (
        <div className="service-page-edit">
            <div className="service-page-edit__wrapper section-2">
                <Route path="/:page" render={() => 
                    <InnerPageContainer>
                        <NavLink className="service-page-edit__back-to-services btn" to={`/services/card/${props.match.params.serviceId}`}>Вернуться в карточку сервиса</NavLink>
                        <div className="service-page-edit__form-container">
                            <div className="service-page-edit__title">Редактирование сервиса</div>
                            <Form {...props} />
                        </div>
                        <ServiceEntitiesContainer serviceId={props.match.params.serviceId} />
                    </InnerPageContainer>
                } />
            </div>
        </div>
    );
}

let ServicePageEditClassComponent = class extends React.Component {
    render() {
        return (
            <ServicePageEdit {...this.props} />
        );
    }

    loadServiceData() {
        let state = window.store.getState();

        if (isEmptyObject(state.accountTypesState.accountTypes) || isEmptyObject(state.accountsState.accounts)) {
            let promiseArr = [];

            if (isEmptyObject(state.accountTypesState.accountTypes)) {
                promiseArr.push(accountTypesGet());
            }

            if (isEmptyObject(state.accountsState.accounts)) {
                promiseArr.push(accountsGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'account_types') this.props.accountTypesSet(value.data);
                        if (value.config.url === 'accounts') this.props.accountsSet(value.data);
                    });

                    this.props.onInitialValuesSet(this.props.match.params.serviceId, this.props.history);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            this.props.onInitialValuesSet(this.props.match.params.serviceId, this.props.history);
        }
    }

    componentDidMount() {
        this.loadServiceData();
    }

    componentDidUpdate() {
        this.loadServiceData();
    }
}

let ServicePageEditWithRouter = withRouter(ServicePageEditClassComponent);

export default ServicePageEditWithRouter;