import React from 'react';
import { Route, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import isEmptyObject from '../../functions/isEmptyObject';
import zeroField from '../../functions/zeroField';
import { softwareCategoriesGet } from '../../redux/softwareCategoriesReducer';
import { softwaresGet } from '../../redux/softwaresReducer';
import { required } from '../../validators/validators';
import Select from '../common/FormControls/Select';
import SpecificationsFields from '../DeviceSavePage/DeviceSave/SpecificationsFields/SpecificationsFields';
import InnerPageContainer from '../InnerPage/InnerPageContainer';

let Form = (props) => {
    let softwareCategoriesArr = [];
    for (let id in props.softwareCategories) {
        if (!zeroField(props.softwareCategories[id].software_cat_type_id)) {
            softwareCategoriesArr.push(
                <option key={id} value={id}>{props.softwareCategories[id].name}</option>
            );
        }
    }

    return (
        <form className="software-page-add__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="software-page-add__form-fields form__fields">
                <Field name="software_category_id" desc="Категория" component={Select} validate={[required]}
                    onChange={(e) => {
                        props.resetForm();
                        props.categorySet(e.target.value);
                    }}
                >
                    <option></option>
                    {softwareCategoriesArr}
                </Field>
                <SpecificationsFields category={props.category} />
            </div>
            <div className="software-page-add__form-btns">
                <button className="software-page-add__form-submit-btn btn">Сохранить</button>
            </div>
        </form>
    );
}

Form = reduxForm({
    form: 'softwareAddForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(Form);

let SoftwarePageAdd = withRouter((props) => {
    return (
        <div className="software-page-add">
            <div className="software-page-add__wrapper section-2">
                <Route path="/:page" render={() => (
                    <InnerPageContainer>
                        <NavLink className="software-page-add__back-to-softwares btn" to="/softwares">Вернуться к списку ПО</NavLink>
                        <div className="software-page-add__form-container">
                            <div className="software-page-add__title">Добавление ПО</div>
                            <Form {...props} />
                        </div>
                    </InnerPageContainer>
                )}/>
            </div>
        </div>
    );
});

let SoftwarePageAddClassCompopnent = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {},
        };
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.softwaresState.softwares) || isEmptyObject(state.softwareCategoriesState.softwareCategories)) {
            let promiseArr = [];

            if (isEmptyObject(state.softwaresState.softwares)) {
                promiseArr.push(softwaresGet());
            }
            if (isEmptyObject(state.softwareCategoriesState.softwareCategories)) {
                promiseArr.push(softwareCategoriesGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'softwares') this.props.softwaresSet(value.data);
                        if (value.config.url === 'softwareCategory') this.props.softwareCategoriesSet(value.data);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <SoftwarePageAdd {...this.props} category={this.state.category} categorySet={id => this.categorySet(id)} />
        );
    }

    categorySet(id) {
        this.setState({
            category: id === '' ? {} : (this.props.softwareCategories[id] ?? {}),
        });
    }
}

export default SoftwarePageAddClassCompopnent;