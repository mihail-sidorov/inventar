import React from 'react';
import { Route, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import isEmptyObject from '../../functions/isEmptyObject';
import { departmentNamesGet } from '../../redux/departmentNamesReducer';
import InnerPageContainer from '../InnerPage/InnerPageContainer';

let Form = (props) => {
    return (
        <form className="departmentName-page-edit__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="departmentName-page-edit__form-fields form__fields">
                <div className="departmentName-page-edit__form-field form__field">
                    <label><span><span>Отдел</span></span><Field name="department" component="input" type="text" /></label>
                </div>
            </div>
            <div className="departmentName-page-edit__form-btns">
                <button className="departmentName-page-edit__form-submit-btn btn">Сохранить</button>
            </div>
        </form>
    );
}

Form = reduxForm({
    form: 'departmentNameEditForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(Form);

let DepartmentNamePageEdit = (props) => {
    return(
        <div className="departmentName-page-edit">
            <div className="departmentName-page-edit__wrapper section-2">
                <Route path="/:page" render={() => 
                    <InnerPageContainer>
                        <NavLink className="departmentName-page-edit__back-to-departmentNames btn" to="/departmentNames">Вернуться к списку отделов</NavLink>
                        <div className="departmentName-page-edit__form-container">
                            <div className="departmentName-page-edit__title">Редактирование отдела</div>
                            <Form {...props} />
                        </div>
                    </InnerPageContainer>
                } />
            </div>
        </div>
    );
}

let DepartmentNamePageEditClassComponent = class extends React.Component {
    render() {
        return <DepartmentNamePageEdit {...this.props} />;
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.departmentNamesState.departmentNames)) {
            departmentNamesGet()
                .then((res) => {
                    this.props.departmentNamesSet(res.data);
                    this.props.onInitialValuesSet(this.props.match.params.departmentNameId, this.props.history);
                })
                .catch(error => console.log(error));
        }
        else {
            this.props.onInitialValuesSet(this.props.match.params.departmentNameId, this.props.history);
        }
    }
}

let DepartmentNamePageEditWithRouter = withRouter(DepartmentNamePageEditClassComponent);

export default DepartmentNamePageEditWithRouter;