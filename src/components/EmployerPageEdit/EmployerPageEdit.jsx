import React from 'react';
import { Route, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import isEmptyObject from '../../functions/isEmptyObject';
import { employersGet } from '../../redux/employersReducer';
import InnerPage from '../InnerPage/InnerPage';

let Form = (props) => {
    return (
        <form className="employer-page-edit__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="employer-page-edit__form-fields form__fields">
                <div className="employer-page-edit__form-field form__field">
                    <label><span><span>Имя работодателя</span></span><Field name="employer" component="input" type="text" /></label>
                </div>
            </div>
            <div className="employer-page-edit__form-btns">
                <button className="employer-page-edit__form-submit-btn btn">Сохранить</button>
            </div>
        </form>
    );
}

Form = reduxForm({
    form: 'employerEditForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(Form);

let EmployerPageEdit = (props) => {
    return(
        <div className="employer-page-edit">
            <div className="employer-page-edit__wrapper section-2">
                <Route path="/:page" render={() => 
                    <InnerPage>
                        <NavLink className="employer-page-edit__back-to-employers btn" to="/employers">Вернуться к списку работодателей</NavLink>
                        <div className="employer-page-edit__form-container">
                            <div className="employer-page-edit__title">Редактирование работодателя</div>
                            <Form {...props} />
                        </div>
                    </InnerPage>
                } />
            </div>
        </div>
    );
}

let EmployerPageEditClassComponent = class extends React.Component {
    render() {
        return <EmployerPageEdit {...this.props} />;
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.employersState.employers)) {
            employersGet()
                .then((res) => {
                    this.props.employersSet(res.data);
                    this.props.onInitialValuesSet(this.props.match.params.employerId, this.props.history);
                })
                .catch(error => console.log(error));
        }
        else {
            this.props.onInitialValuesSet(this.props.match.params.employerId, this.props.history);
        }
    }
}

let EmployerPageEditWithRouter = withRouter(EmployerPageEditClassComponent);

export default EmployerPageEditWithRouter;