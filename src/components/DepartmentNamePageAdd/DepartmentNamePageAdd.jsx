import React from 'react';
import { Route, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import isEmptyObject from '../../functions/isEmptyObject';
import { departmentNamesGet } from '../../redux/departmentNamesReducer';
import InnerPage from '../InnerPage/InnerPage';

let Form = (props) => {
    return (
        <form className="departmentName-page-add__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="departmentName-page-add__form-fields form__fields">
                <div className="departmentName-page-add__form-field form__field">
                    <label><span><span>Отдел</span></span><Field name="department" component="input" type="text" /></label>
                </div>
            </div>
            <div className="departmentName-page-add__form-btns">
                <button className="departmentName-page-add__form-submit-btn btn">Сохранить</button>
            </div>
        </form>
    );
}

Form = reduxForm({
    form: 'departmentNameAddForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(Form);

let DepartmentNamePageAdd = (props) => {
    return(
        <div className="departmentName-page-add">
            <div className="departmentName-page-add__wrapper section-2">
                <Route path="/:page" render={() => 
                    <InnerPage>
                        <NavLink className="departmentName-page-add__back-to-departmentNames btn" to="/departmentNames">Вернуться к списку отделов</NavLink>
                        <div className="departmentName-page-add__form-container">
                            <div className="departmentName-page-add__title">Добавление отдела</div>
                            <Form {...props} />
                        </div>
                    </InnerPage>
                } />
            </div>
        </div>
    );
}

let DepartmentNamePageAddClassComponent = class extends React.Component {
    render() {
        return <DepartmentNamePageAdd {...this.props} />
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.departmentNamesState.departmentNames)) {
            departmentNamesGet()
                .then((res) => {
                    this.props.departmentNamesSet(res.data);
                })
                .catch(error => console.log(error));
        }
    }
}

export default withRouter(DepartmentNamePageAddClassComponent);