import { connect } from 'react-redux';
import { softwareCategoriesGetActionCreator } from '../../../../redux/softwareCategoriesReducer';
import { softwaresGetActionCreator, updateSoftwareActionCreator } from '../../../../redux/softwaresReducer';
import { subSoftwaresSearchSetActionCreator, subSoftWaresSetActionCreator } from '../../../../redux/subSoftwaresReducer';
import SubSoftwares from './SubSoftwares';

let SubSoftwaresContainer = connect(
    state => ({
        subSoftwares: state.subSoftwaresState.subSoftwares,
        subSoftwaresSearch: state.subSoftwaresState.subSoftwaresSearch,
        categories: state.softwareCategoriesState.softwareCategories,
    }),
    dispatch => ({
        softwaresSet: data => {
            dispatch(softwaresGetActionCreator(data));
        },
        softwareCategoriesSet: data => {
            dispatch(softwareCategoriesGetActionCreator(data));
        },
        subSoftWaresSet: data => {
            dispatch(subSoftWaresSetActionCreator(data));
        },
        subSoftwaresSearchSet: search => {
            dispatch(subSoftwaresSearchSetActionCreator(search));
        },
        updateSoftware: data => {
            dispatch(updateSoftwareActionCreator(data));
        },
    })
)(SubSoftwares);

export default SubSoftwaresContainer;