import React from 'react';
import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import isEmptyObject from '../../functions/isEmptyObject';
import { employersGet } from '../../redux/employersReducer';
import InnerPage from '../InnerPage/InnerPage';

let Form = (props) => {
    return (
        <form className="employer-page-add__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="employer-page-add__form-fields form__fields">
                <div className="employer-page-add__form-field form__field">
                    <label><span><span>Имя работодателя</span></span><Field name="employer" component="input" type="text" /></label>
                </div>
            </div>
            <div className="employer-page-add__form-btns">
                <button className="employer-page-add__form-submit-btn btn">Сохранить</button>
            </div>
        </form>
    );
}

Form = reduxForm({
    form: 'employerAddForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(Form);

let EmployerPageAdd = (props) => {
    return(
        <div className="employer-page-add">
            <div className="employer-page-add__wrapper section-2">
                <Route path="/:page" render={() => 
                    <InnerPage>
                        <NavLink className="employer-page-add__back-to-employers btn" to="/employers">Вернуться к списку работодателей</NavLink>
                        <div className="employer-page-add__form-container">
                            <div className="employer-page-add__title">Добавление работодателя</div>
                            <Form {...props} />
                        </div>
                    </InnerPage>
                } />
            </div>
        </div>
    );
}

let EmployerPageAddClassComponent = class extends React.Component {
    render() {
        return <EmployerPageAdd {...this.props} />
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.employersState.employers)) {
            employersGet()
                .then((res) => {
                    this.props.employersSet(res.data);
                })
                .catch(error => console.log(error));
        }
    }
}

export default EmployerPageAddClassComponent;