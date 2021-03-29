import React from 'react';
import { Route, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import isEmptyObject from '../../functions/isEmptyObject';
import { locationsGet } from '../../redux/locationsReducer';
import InnerPageContainer from '../InnerPage/InnerPageContainer';

let Form = (props) => {
    return (
        <form className="location-page-edit__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="location-page-edit__form-fields form__fields">
                <div className="location-page-edit__form-field form__field">
                    <label><span><span>Имя местонахождения</span></span><Field name="location" component="input" type="text" /></label>
                </div>
            </div>
            <div className="location-page-edit__form-btns">
                <button className="location-page-edit__form-submit-btn btn">Сохранить</button>
            </div>
        </form>
    );
}

Form = reduxForm({
    form: 'locationEditForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(Form);

let LocationPageEdit = (props) => {
    return(
        <div className="location-page-edit">
            <div className="location-page-edit__wrapper section-2">
                <Route path="/:page" render={() => 
                    <InnerPageContainer>
                        <NavLink className="location-page-edit__back-to-locations btn" to="/locations">Вернуться к списку местонахождений</NavLink>
                        <div className="location-page-edit__form-container">
                            <div className="location-page-edit__title">Редактирование местонахождения</div>
                            <Form {...props} />
                        </div>
                    </InnerPageContainer>
                } />
            </div>
        </div>
    );
}

let LocationPageEditClassComponent = class extends React.Component {
    render() {
        return <LocationPageEdit {...this.props} />;
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.locationsState.locations)) {
            locationsGet()
                .then((res) => {
                    this.props.locationsSet(res.data);
                    this.props.onInitialValuesSet(this.props.match.params.locationId, this.props.history);
                })
                .catch(error => console.log(error));
        }
        else {
            this.props.onInitialValuesSet(this.props.match.params.locationId, this.props.history);
        }
    }
}

export default withRouter(LocationPageEditClassComponent);