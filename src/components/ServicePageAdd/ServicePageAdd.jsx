import React from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { accountTypesGet } from '../../redux/accountTypesReducer';
import InnerPage from '../InnerPage/InnerPage';

let Form = (props) => {
    let optionsAccountTypes = [];

    for (let id in props.accountTypes) {
        optionsAccountTypes.push(
            <option value={id} key={id}>{props.accountTypes[id].account_type}</option>
        );
    }

    return (
        <form className="service-page-add__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="service-page-add__form-fields form__fields">
                <div className="service-page-add__form-field form__field">
                    <label>
                        <span><span>Тип</span></span>
                        <Field name="account_type_id" component="select">
                            <option></option>
                            {optionsAccountTypes}
                        </Field>
                    </label>
                </div>
                <div className="service-page-add__form-field form__field">
                    <label><span><span>Логин</span></span><Field name="login" component="input" type="text" /></label>
                </div>
                <div className="service-page-add__form-field form__field">
                    <label><span><span>Пароль</span></span><Field name="password" component="input" type="text" /></label>
                </div>
            </div>
            <div className="service-page-add__form-btns">
                <button className="service-page-add__form-submit-btn btn">Сохранить</button>
            </div>
        </form>
    );
}

Form = reduxForm({
    form: 'serviceAddForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(Form);

let ServicePageAdd = (props) => {
    return (
        <div className="service-page-add">
            <div className="service-page-add__wrapper section-2">
                <Route path="/:page" render={() => 
                    <InnerPage>
                        <NavLink className="service-page-add__back-to-services btn" to="/services">Вернуться к списку сервисов</NavLink>
                        <div className="service-page-add__form-container">
                            <div className="service-page-add__title">Добавление сервиса</div>
                            <Form {...props} />
                        </div>
                    </InnerPage>
                } />
            </div>
        </div>
    );
}

ServicePageAdd = withRouter(ServicePageAdd);

let ServicePageAddClassComponent = class extends React.Component {
    render() {
        return (
            <ServicePageAdd {...this.props} />
        );
    }

    componentDidMount() {
        accountTypesGet()
            .then((data) => {
                this.props.accountTypesSet(data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export default ServicePageAddClassComponent;