import { connect } from 'react-redux';
import { brandsGetActionCreator } from '../../redux/brandsReducer';
import { categoriesGetActionCreator } from '../../redux/categoriesReducer';
import { devicesGetActionCreator } from '../../redux/devicesReducer';
import { locationsGetActionCreator } from '../../redux/locationsReducer';
import { responsiblesGetActionCreator } from '../../redux/responsiblesReducer';
import { statusesGetActionCreator } from '../../redux/statusesReducer';
import { suppliersGetActionCreator } from '../../redux/suppliersReducer';
import { usersGetActionCreator } from '../../redux/usersReducer';
import DevicePageCard from './DevicePageCard';

let DevicePageCardContainer = connect(
    state => ({
        responsibles: state.responsiblesState.responsibles,
        users: state.usersState.users,
        brands: state.brandsState.brands,
        categories: state.categoriesState.categories,
        suppliers: state.suppliersState.suppliers,
        locations: state.locationsState.locations,
        statuses: state.statusesState.statuses,
        devices: state.devicesState.devices,
    }),
    dispatch => ({
        onUsersGet: (data) => {
            dispatch(usersGetActionCreator(data));
        },
        onResponsiblesGet: (data) => {
            dispatch(responsiblesGetActionCreator(data));
        },
        onBrandsGet: (data) => {
            dispatch(brandsGetActionCreator(data));
        },
        onCategoriesGet: (data) => {
            dispatch(categoriesGetActionCreator(data));
        },
        onSuppliersGet: (data) => {
            dispatch(suppliersGetActionCreator(data));
        },
        onStatusesGet: (data) => {
            dispatch(statusesGetActionCreator(data));
        },
        onLocationsGet: (data) => {
            dispatch(locationsGetActionCreator(data));
        },
        onDevicesGet: (data) => {
            dispatch(devicesGetActionCreator(data));
        },
        editDevice: (props) => {
            props.history.push(`/devices/${props.match.params.deviceId}`);
        },
    })
)(DevicePageCard);

export default DevicePageCardContainer;