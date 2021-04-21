import { connect } from 'react-redux';
import { brandsGet, brandsGetActionCreator } from '../../redux/brandsReducer';
import { categoriesGetActionCreator } from '../../redux/categoriesReducer';
import { devicesGetActionCreator } from '../../redux/devicesReducer';
import { softwareCategoriesGetActionCreator } from '../../redux/softwareCategoriesReducer';
import { softwareDevicesSetActionCreator, softwaresGetActionCreator } from '../../redux/softwaresReducer';
import SoftwarePageCard from './SoftwarePageCard';

let SoftwarePageCardContainer = connect(
    state => ({
        softwares: state.softwaresState.softwares,
        softwareCategories: state.softwareCategoriesState.softwareCategories,
        softwareDevices: state.softwaresState.softwareDevices,
        categories: state.categoriesState.categories,
        brands: state.brandsState.brands,
    }),
    dispatch => ({
        onSoftwaresGet: data => {
            dispatch(softwaresGetActionCreator(data));
        },
        onSoftwareCategoriesGet: data => {
            dispatch(softwareCategoriesGetActionCreator(data));
        },
        onDevicesGet: data => {
            dispatch(devicesGetActionCreator(data));
        },
        onCategoriesGet: data => {
            dispatch(categoriesGetActionCreator(data));
        },
        onBrandsGet: data => {
            dispatch(brandsGetActionCreator(data));
        },
        softwareDevicesSet: data => {
            dispatch(softwareDevicesSetActionCreator(data));
        },
    })
)(SoftwarePageCard);

export default SoftwarePageCardContainer;