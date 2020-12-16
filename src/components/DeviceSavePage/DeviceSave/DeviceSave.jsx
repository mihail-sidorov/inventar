import React from 'react';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import isEmptyObject from '../../../functions/isEmptyObject';
import { brandsGet } from '../../../redux/brandsReducer';
import { categoriesGet } from '../../../redux/categoriesReducer';
import { devicesGet } from '../../../redux/devicesReducer';
import { locationsGet } from '../../../redux/locationsReducer';
import { responsiblesGet } from '../../../redux/responsiblesReducer';
import { statusesGet } from '../../../redux/statusesReducer';
import { suppliersGet } from '../../../redux/suppliersReducer';
import { usersGet } from '../../../redux/usersReducer';
import SpecificationsFieldsContainer from './SpecificationsFields/SpecificationsFieldsContainer';
import SubDevicesContainer from './SubDevices/SubDevicesContainer';

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
                                    let categoryId = window.store.getState().form.deviceSaveForm.values.category_id;
                                    if (categoryId !== e.currentTarget.value) {
                                        props.onSpecificationsReset(props);
                                        props.onSpecificationsSet(e.currentTarget.value);
                                        props.onSubDevicesSet(e.currentTarget.value);
                                    }
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
    let optionsSuppliers = [];
    let optionsLocations = [];

    for (let id in props.responsibles) {
        optionsResponsibles.push(<option value={id} key={id}>{props.users[id].full_name}</option>);
    }

    for (let id in props.brands) {
        optionsBrands.push(<option value={id} key={id}>{props.brands[id].brand}</option>);
    }

    for (let id in props.suppliers) {
        optionsSuppliers.push(<option value={id} key={id}>{props.suppliers[id].supplier}</option>);
    }

    for (let id in props.locations) {
        optionsLocations.push(<option value={id} key={id}>{props.locations[id].location}</option>);
    }

    return (
        <form action="" className="device-save__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="device-save__form-fields form__fields">
                {CategoriesField(props.categories, props)}
                <SpecificationsFieldsContainer />
                <div className="device-save__form-field form__field">
                    <label><span><span>Модель</span></span><Field name="model" type="text" component="input" /></label>
                </div>
                <div className="device-save__form-field form__field">
                    <label><span><span>Инвентарный номер</span></span><Field name="inv_number" type="text" component="input" /></label>
                </div>
                <div className="device-save__form-field form__field">
                    <label><span><span>Закупочная цена</span></span><Field name="price" type="text" component="input" /></label>
                </div>
                <div className="device-save__form-field form__field">
                    <label><span><span>Дата покупки</span></span><Field name="date_purchase" type="date" component="input" /></label>
                </div>
                <div className="device-save__form-field form__field">
                    <label><span><span>Дата окончания гарантии</span></span><Field name="date_warranty_end" type="date" component="input" /></label>
                </div>
                <div className="device-save__form-field form__field">
                    <label>
                        <span><span>Ответственный на складе</span></span>
                        <Field name="user_id" component="select">
                            <option></option>
                            {optionsResponsibles}
                        </Field>
                    </label>
                </div>
                <div className="device-save__form-field form__field">
                    <label>
                        <span><span>Марка</span></span>
                        <Field name="brand_id" component="select">
                            <option></option>
                            {optionsBrands}
                        </Field>
                    </label>
                </div>
                <div className="device-save__form-field form__field">
                    <label>
                        <span><span>Поставщик</span></span>
                        <Field name="supplier_id" component="select">
                            <option></option>
                            {optionsSuppliers}
                        </Field>
                    </label>
                </div>
                <div className="device-save__form-field form__field">
                    <label>
                        <span><span>Местонахождение</span></span>
                        <Field name="location_id" component="select">
                            <option></option>
                            {optionsLocations}
                        </Field>
                    </label>
                </div>
                <SubDevicesContainer {...props} />
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
    keepDirtyOnReinitialize: true,
})(Form);

let DeviceSave = (props) => {
    return (
        <div className="device-save">
            <NavLink className="device-save__back-to-devices btn" to="/devices">Вернуться к списку оборудования</NavLink>
            <div className="device-save__form-container">
                <div className="device-save__title">{props.match.params.device === 'add' ? 'Добавление нового оборудования': 'Редактирование оборудования'}</div>
                <Form {...props} />
            </div>
        </div>
    );
}

let DeviceSaveClassComponent = class extends React.Component {
    emptyDeviceObject = {};

    loadDeviceSaveData() {
        let state = window.store.getState();

        if (isEmptyObject(state.usersState.users) || isEmptyObject(state.responsiblesState.responsibles) || isEmptyObject(state.brandsState.brands) || isEmptyObject(state.categoriesState.categories) || isEmptyObject(state.suppliersState.suppliers) || isEmptyObject(state.statusesState.statuses) || isEmptyObject(state.locationsState.locations) || isEmptyObject(state.devicesState.devices)) {
            let promiseArr = [];

            if (isEmptyObject(state.devicesState.devices)) {
                promiseArr.push(devicesGet());
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

            if (isEmptyObject(state.suppliersState.suppliers)) {
                promiseArr.push(suppliersGet());
            }

            if (isEmptyObject(state.statusesState.statuses)) {
                promiseArr.push(statusesGet());
            }
            if (isEmptyObject(state.locationsState.locations)) {
                promiseArr.push(locationsGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'users') this.props.onUsersGet(value.data);
                        if (value.config.url === 'warehouseResponsible') this.props.onResponsiblesGet(value.data);
                        if (value.config.url === 'devices') this.props.onDevicesGet(value.data, this.props);
                        if (value.config.url === 'brands') this.props.onBrandsGet(value.data);
                        if (value.config.url === 'categories') this.props.onCategoriesGet(value.data);
                        if (value.config.url === 'suppliers') this.props.onSuppliersGet(value.data);
                        if (value.config.url === 'statuses') this.props.onStatusesGet(value.data);
                        if (value.config.url === 'locations') this.props.onLocationsGet(value.data);
                    });

                    if (this.props.match.params.device !== 'add') {
                        this.props.onDeviceSet(this.props.match.params.device);
                    }
                    else {
                        this.props.onResetDevice(this.emptyDeviceObject);
                        this.props.onResetSubDevices(this.emptyDeviceObject);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            if (this.props.match.params.device !== 'add') {
                this.props.onDeviceSet(this.props.match.params.device);
            }
            else {
                this.props.onResetDevice(this.emptyDeviceObject);
                this.props.onResetSubDevices(this.emptyDeviceObject);
            }
        }
    }

    loadSpecificationsFields() {
        let state = window.store.getState();

        if (state.deviceSavePageState.device.category_id !== undefined) {
            this.props.onSpecificationsSet(state.deviceSavePageState.device.category_id);
        }
    }

    loadSubDevices() {
        let state = window.store.getState();

        if (state.deviceSavePageState.device.category_id !== undefined) {
            this.props.onSubDevicesSet(state.deviceSavePageState.device.category_id);
        }
    }

    componentDidMount() {
        this.loadDeviceSaveData();
        this.loadSpecificationsFields();
        this.loadSubDevices();
    }

    componentDidUpdate() {
        this.loadDeviceSaveData();
        this.loadSpecificationsFields();
        this.loadSubDevices();
    }

    render() {
        if (this.props.wasAdd) return <Redirect to="/devices" />

        return (
            <DeviceSave {...this.props} />
        );
    }
}

let DeviceSaveWithRouterComponent = withRouter(DeviceSaveClassComponent);

export default DeviceSaveWithRouterComponent;