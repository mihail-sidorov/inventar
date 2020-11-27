import React from 'react';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import isEmptyObject from '../../../functions/isEmptyObject';
import { brandsGet } from '../../../redux/brandsReducer';
import { categoriesGet } from '../../../redux/categoriesReducer';
import { devicesGet } from '../../../redux/devicesReducer';
import { responsiblesGet } from '../../../redux/responsiblesReducer';
import { usersGet } from '../../../redux/usersReducer';
import SpecificationsFieldsContainer from './SpecificationsFields/SpecificationsFieldsContainer';

let CategoriesField = (categories, props) => {
    let tree = [];

    let getRootCategories = (categories) => {
        let rootCategories = [];

        for (let catId in categories) {
            if (categories[catId].parent_id === null) {
                rootCategories.push(categories[catId]);
            }
        }

        return rootCategories;
    }

    let makeCategoryBranch = (categoryId, categories) => {
        let branch = [];

        for (let catId in categories) {
            if (categories[catId].parent_id == categoryId) {
                branch.push(makeCategoryBranch(catId, categories));
            }
        }

        return {
            category: categories[categoryId],
            categories: branch,
        };
    }

    getRootCategories(categories).forEach((value) => {
        tree.push(makeCategoryBranch(value.id, categories));
    });

    let printTree = (tree) => {
        if (tree.length > 0) {
            return (
                <ul>
                    {tree.map((value, index) => {
                        return (
                            <li key={index}>
                                {value.categories.length === 0 ? <><label><Field name="category_id" component="input" type="radio" value={String(value.category.id)} onClick={(e) => {
                                    props.onSpecificationsReset();
                                    props.onSpecificationsSet(e.currentTarget.value);
                                }} />{value.category.category}</label></> : value.category.category}
                                {printTree(value.categories)}
                            </li>
                        );
                    })}
                </ul>
            );
        }
    }

    return printTree(tree);
}

let Form = (props) => {
    let optionsResponsibles = [];
    let optionsBrands = [];

    for (let id in props.responsibles) {
        optionsResponsibles.push(<option value={id} key={id}>{props.users[id].full_name}</option>);
    }

    for (let id in props.brands) {
        optionsBrands.push(<option value={id} key={id}>{props.brands[id].brand}</option>);
    }

    return (
        <form action="" className="device-save__form form" onSubmit={props.handleSubmit}>
            <div className="device-save__form-fields form__fields">
                {CategoriesField(props.categories, props)}
                <SpecificationsFieldsContainer />
                <div className="device-save__form-field form__field">
                    <label><Field name="model" type="text" component="input" placeholder="Модель" /></label>
                </div>
                <div className="device-save__form-field form__field">
                    <label><Field name="inv_number" type="text" component="input" placeholder="Инвентарный номер" /></label>
                </div>
                <div className="device-save__form-field form__field">
                    <label><Field name="price" type="text" component="input" placeholder="Закупочная цена" /></label>
                </div>
                <div className="device-save__form-field form__field">
                    <label><Field name="date_purchase" type="date" component="input" /></label>
                </div>
                <div className="device-save__form-field form__field">
                    <label><Field name="date_warranty_end" type="date" component="input" /></label>
                </div>
                <div className="device-save__form-field form__field">
                    <label>
                        <Field name="user_id" component="select">
                            <option></option>
                            {optionsResponsibles}
                        </Field>
                    </label>
                </div>
                <div className="device-save__form-field form__field">
                    <label>
                        <Field name="brand_id" component="select">
                            <option></option>
                            {optionsBrands}
                        </Field>
                    </label>
                </div>
            </div>
            <div className="device-save__form-btns">
                <button className="device-save__form-submit-btn btn">Сохранить</button>
            </div>
        </form>
    );
}

Form = reduxForm({
    form: 'deviceSaveForm',
    enableReinitialize: true,
})(Form);

let DeviceSave = (props) => {
    if (props.device === undefined) {
        let state = window.store.getState();
        state.deviceSavePageState.device = {};
        return <Redirect to="/devices" />
    }

    let initialValues = {...props.device};

    for (let prop in initialValues) {
        if (prop !== 'specifications' && initialValues[prop] !== null && initialValues[prop] !== undefined) {
            initialValues[prop] = String(initialValues[prop]);
        }
        if (prop === 'date_purchase' || prop === 'date_warranty_end') {
            let date = new Date(initialValues[prop]);

            let month = Number(date.getUTCMonth()) + 1;
            if (month < 10) {
                month = '0' + String(month);
            }
            else {
                month = String(month);
            }

            let day = Number(date.getUTCDate());
            if (day < 10) {
                day = '0' + String(day);
            }
            else {
                day = String(day);
            }

            initialValues[prop] = date.getUTCFullYear() + '-' + month + '-' + day;
        }
        if (prop === 'specifications') {
            for (let specificationsProp in initialValues[prop]) {
                if (initialValues[prop][specificationsProp] !== null && initialValues[prop][specificationsProp] !== undefined) {
                    initialValues[prop][specificationsProp] = String(initialValues[prop][specificationsProp]);
                }
            }
        }
    }

    return (
        <div className="device-save">
            <NavLink className="device-save__back-to-devices btn" to="/devices">Вернуться к списку оборудования</NavLink>
            <h1 className="device-save__title">{props.match.params.device === 'add' ? 'Добавление нового оборудования': 'Редактирование оборудования'}</h1>
            <Form initialValues={initialValues} {...props} />
        </div>
    );
}

let DeviceSaveClassComponent = class extends React.Component {
    emptyDeviceObject = {};

    loadDeviceSaveData() {
        let state = window.store.getState();

        if (isEmptyObject(state.usersState.users) || isEmptyObject(state.responsiblesState.responsibles) || isEmptyObject(state.brandsState.brands) || isEmptyObject(state.categoriesState.categories)) {
            let promiseArr = [];

            if (this.props.match.params.device !== 'add') {
                if (isEmptyObject(state.devicesState.devices)) {
                    promiseArr.push(devicesGet());
                }
            }
            else {
                this.props.onResetDevice(this.emptyDeviceObject);
            }

            if (isEmptyObject(state.usersState.users)) {
                promiseArr.push(usersGet());
            }

            if (isEmptyObject(state.responsiblesState.responsibles)) {
                promiseArr.push(responsiblesGet());
            }

            if (isEmptyObject(state.brandsState.brands)) {
                promiseArr.push(brandsGet());
            }

            if (isEmptyObject(state.categoriesState.categories)) {
                promiseArr.push(categoriesGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'users') this.props.onUsersGet(value.data);
                        if (value.config.url === 'warehouseResponsible') this.props.onResponsiblesGet(value.data);
                        if (value.config.url === 'devices') this.props.onDevicesGet(value.data);
                        if (value.config.url === 'brands') this.props.onBrandsGet(value.data);
                        if (value.config.url === 'categories') this.props.onCategoriesGet(value.data);
                    });

                    if (this.props.match.params.device !== 'add') {
                        this.props.onDeviceSet(this.props.match.params.device);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            if (this.props.match.params.device !== 'add') {
                if (isEmptyObject(state.devicesState.devices)) {
                    devicesGet()
                        .then((response) => {
                            this.props.onDevicesGet(response.data);
                            this.props.onDeviceSet(this.props.match.params.device);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                else {
                    this.props.onDeviceSet(this.props.match.params.device);
                }
            }
            else {
                this.props.onResetDevice(this.emptyDeviceObject);
            }
        }
    }

    loadSpecificationsFields() {
        let state = window.store.getState();

        if (state.deviceSavePageState.device.category_id !== undefined) {
            this.props.onSpecificationsSet(state.deviceSavePageState.device.category_id);
        }
    }

    componentDidMount() {
        this.loadDeviceSaveData();
        this.loadSpecificationsFields();
    }

    componentDidUpdate() {
        this.loadDeviceSaveData();
        this.loadSpecificationsFields();
    }

    render() {
        return (
            <DeviceSave {...this.props} />
        );
    }
}

let DeviceSaveWithRouterComponent = withRouter(DeviceSaveClassComponent);

export default DeviceSaveWithRouterComponent;