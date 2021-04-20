import React from 'react';
import { Route, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Field, initialize, reduxForm } from 'redux-form';
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
        <form className="software-page-edit__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="software-page-edit__form-fields form__fields">
                <SpecificationsFields category={props.category} />
            </div>
            <div className="software-page-edit__form-btns">
                <button className="software-page-edit__form-submit-btn btn">Сохранить</button>
            </div>
        </form>
    );
}

Form = reduxForm({
    form: 'softwareEditForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(Form);

let SoftwarePageEdit = (props) => {
    return (
        <div className="software-page-edit">
            <div className="software-page-edit__wrapper section-2">
                <Route path="/:page" render={() => (
                    <InnerPageContainer>
                        <NavLink className="software-page-edit__back-to-software-card btn" to={`/softwares/card/${props.match.params.softwareId}`}>Вернуться к карточке ПО</NavLink>
                        <div className="software-page-edit__form-container">
                            <div className="software-page-edit__title">Редактирование ПО</div>
                            <Form {...props} />
                        </div>
                    </InnerPageContainer>
                )}/>
            </div>
        </div>
    );
}

let SoftwarePageEditClassCompopnent = class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            category: {},
        };
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.softwareCategoriesState.softwareCategories) || isEmptyObject(state.softwaresState.softwares)) {
            let promiseArr = [];

            if (isEmptyObject(state.softwareCategoriesState.softwareCategories)) {
                promiseArr.push(softwareCategoriesGet());
            }
            if (isEmptyObject(state.softwaresState.softwares)) {
                promiseArr.push(softwaresGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'softwareCategory') this.props.softwareCategoriesGet(value.data);
                        if (value.config.url === 'softwares') this.props.softwaresGet(value.data);
                    });
                    this.initialForm();
                })
                .catch((error) => console.log(error));
        }
        else {
            this.initialForm();
        }
    }

    render() {
        return (
            <SoftwarePageEdit {...this.props} category={this.state.category} />
        );
    }

    categorySet(id) {
        this.setState({
            category: id === '' ? {} : (this.props.softwareCategories[id] ?? {}),
        });
    }

    initialForm() {
        let software = this.props.softwares[this.props.match.params.softwareId];
        if (software !== undefined) {
            this.categorySet(software.software_category_id);

            let initialValues = {...software};
            Object.entries(initialValues.specifications).forEach(el => {
                initialValues['specifications_' + el[0]] = el[1];
            });
            
            this.props.initialValuesSet(initialValues);
        }
        else {
            this.props.history.push('/softwares');
        }
    }
}

let SoftwarePageEditWithRouter = withRouter(SoftwarePageEditClassCompopnent);

export default SoftwarePageEditWithRouter;