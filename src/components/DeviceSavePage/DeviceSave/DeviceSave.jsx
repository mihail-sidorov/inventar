import React from 'react';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
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
import { required } from '../../../validators/validators';
import Radio from '../../common/FormControls/Radio';
import SearchUsersForAttachContainer from './SearchUsersForAttach/SearchUsersForAttachContainer';
import SpecificationsFieldsContainer from './SpecificationsFields/SpecificationsFieldsContainer';
import SubDevicesContainer from './SubDevices/SubDevicesContainer';
import $ from 'jquery';
import CommonFieldsContainer from './CommonFields/CommonFieldsContainer';

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

    let CategoryClassComponent = class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                in: false,
            };
        }

        changeIn() {
            this.setState({in: !this.state.in});
        }

        render() {
            return (
                
                    <li>
                        {
                            this.props.value.categories.length === 0 ? 
                            <><Field name="category_id" desc={this.props.value.category.category} component={Radio} validate={[required]} type="radio" value={String(this.props.value.category.id)} onClick={(e) => {
                                let categoryId = window.store.getState().form.deviceSaveForm.values.category_id;
                                if (categoryId !== e.currentTarget.value) {
                                    props.onSpecificationsSet(e.currentTarget.value);
                                    props.onSpecificationsReset(props);
                                }
                            }} /></> : 
                            <CSSTransition in={this.state.in} timeout={300} onEnter={(element) => {
                                $(element).parent().find('>ul').slideToggle();
                            }} onExit={(element) => {
                                $(element).parent().find('>ul').slideToggle();
                            }}>
                                <div className="category-field" onClick={() => {
                                    this.changeIn();
                                }}>{this.props.value.category.category}</div>
                            </CSSTransition>
                        }
                        {printTree(this.props.value.categories)}
                    </li>
            );
        }
    }

    let printTree = (tree) => {
        if (tree.length > 0) {
            return (
                <ul>
                    {tree.map((value, index) => {
                        return (
                            <CategoryClassComponent value={value} key={index} />
                        );
                    })}
                </ul>
            );
        }
    }

    return printTree(tree);
}

let CategoriesBlockClassComponent = class extends React.Component {
    shouldComponentUpdate() {
        if (!isEmptyObject(this.props.categories)) {
            return false;
        }
        return true;
    }

    render() {
        return (
            CategoriesField(this.props.categories, this.props) ?? null
        );
    }
}

let Form = (props) => {
    return (
        <form action="" className="device-save__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="device-save__form-fields form__fields">
                {
                    props.match.params.device === 'add' &&
                    <>
                        <CategoriesBlockClassComponent {...props} />
                        <SpecificationsFieldsContainer device={props.device} />
                    </>
                }
                {
                    props.match.params.device !== 'add' && !isEmptyObject(props.device) &&
                    <SpecificationsFieldsContainer device={props.device} />
                }
                <CommonFieldsContainer {...props} />
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
    let status, statusFlag, user, userId, deviceId;

    if (!isEmptyObject(props.device)) {
        deviceId = props.device.id;

        if (props.statuses[props.device.status_id] !== undefined) {
            status = props.statuses[props.device.status_id].status_rus;
            statusFlag = props.statuses[props.device.status_id].status;
        }

        if (props.users[props.device.user_id] !== undefined) {
            user = props.users[props.device.user_id].full_name;
            userId = props.users[props.device.user_id].id;
        }
    }

    return (
        <div className="device-save">
            {
                props.match.params.device !== 'add' &&
                <NavLink className="device-save__back-to-devices btn" to={`/devices/card/${props.match.params.device}`}>Вернуться в карточку оборудования</NavLink>
            }
            <div className="device-save__form-container">
                <div className="device-save__title">{props.match.params.device === 'add' ? 'Добавление нового оборудования': 'Редактирование оборудования'}</div>
                <Form {...props} />
            </div>
            {
                props.match.params.device !== 'add' &&
                <>
                    {
                        !isEmptyObject(props.device) &&
                        props.categories[props.device.category_id] &&
                        props.categories[props.device.category_id].sub_devices &&
                        <SubDevicesContainer deviceId={props.match.params.device} />
                    }
                    <div className="device-save__status-container">
                        <div className="device-save__status-container-title">
                            Статус оборудования
                        </div>
                        <div className="device-save__status-container-inform">
                            Статус: {status}
                            <br/>
                            Ответственный: {user} {userId !== undefined && deviceId !== undefined && statusFlag !== undefined && (statusFlag === 'given' || statusFlag === 'givenIncomplete') && <button onClick={() => {props.onUnAttachUserFromDevice(deviceId)}}>Открепить</button>}
                        </div>
                        {
                            statusFlag === 'stock' &&
                            <SearchUsersForAttachContainer />
                        }
                    </div>
                </>
            }
        </div>
    );
}

let DeviceSaveClassComponent = class extends React.Component {
    emptyDeviceObject = {};

    loadDeviceSaveData() {
        let state = window.store.getState();

        if (isEmptyObject(state.usersState.users) || isEmptyObject(state.responsiblesState.responsibles) || isEmptyObject(state.brandsState.brands) || isEmptyObject(state.categoriesState.categories) || isEmptyObject(state.suppliersState.suppliers) || isEmptyObject(state.statusesState.statuses) || isEmptyObject(state.locationsState.locations) || isEmptyObject(state.statusesState.statuses) || isEmptyObject(state.devicesState.devices)) {
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

            if (isEmptyObject(state.locationsState.locations)) {
                promiseArr.push(locationsGet());
            }

            if (isEmptyObject(state.statusesState.statuses)) {
                promiseArr.push(statusesGet());
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
                        if (value.config.url === 'locations') this.props.onLocationsGet(value.data);
                        if (value.config.url === 'statuses') this.props.onStatusesGet(value.data);
                    });

                    if (this.props.match.params.device !== 'add') {
                        this.props.onDeviceSet(this.props.match.params.device);
                    }
                    else {
                        this.props.onResetDevice(this.emptyDeviceObject);
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
        if (this.props.wasAdd) return <Redirect to="/devices" />

        return (
            <DeviceSave {...this.props} />
        );
    }
}

let DeviceSaveWithRouterComponent = withRouter(DeviceSaveClassComponent);

export default DeviceSaveWithRouterComponent;