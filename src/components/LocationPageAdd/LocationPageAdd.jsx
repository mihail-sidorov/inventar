import React from 'react';
import { Route, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import isEmptyObject from '../../functions/isEmptyObject';
import { locationsGet } from '../../redux/locationsReducer';
import InnerPageContainer from '../InnerPage/InnerPageContainer';

let Form = (props) => {
    return (
        <form className="location-page-add__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="location-page-add__form-fields form__fields">
                <div className="location-page-add__form-field form__field">
                    <label><span><span>Местонахождение</span></span><Field name="location" component="input" type="text" /></label>
                </div>
            </div>
            <div className="location-page-add__form-btns">
                <button className="location-page-add__form-submit-btn btn">Сохранить</button>
            </div>
        </form>
    );
}

Form = reduxForm({
    form: 'locationAddForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(Form);

let LocationPageAdd = (props) => {
    return(
        <div className="location-page-add">
            <div className="location-page-add__wrapper section-2">
                <Route path="/:page" render={() => 
                    <InnerPageContainer>
                        <NavLink className="location-page-add__back-to-locations btn" to="/locations">Вернуться к списку местонахождений</NavLink>
                        <div className="location-page-add__form-container">
                            <div className="location-page-add__title">Добавление местонахождения</div>
                            <Form {...props} />
                        </div>
                    </InnerPageContainer>
                } />
            </div>
        </div>
    );
}

let LocationPageAddClassComponent = class extends React.Component {
    render() {
        return <LocationPageAdd {...this.props} />
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.locationsState.locations)) {
            locationsGet()
                .then((res) => {
                    this.props.locationsSet(res.data);
                })
                .catch(error => console.log(error));
        }
    }
}

export default withRouter(LocationPageAddClassComponent);