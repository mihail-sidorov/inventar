import { connect } from 'react-redux';
import { softwareCategoriesGetActionCreator } from '../../../redux/softwareCategoriesReducer';
import { makeShortSoftwaresActionCreator } from '../../../redux/softwaresPageReducer';
import { softwaresGetActionCreator } from '../../../redux/softwaresReducer';
import Softwares from './Softwares';

let SoftwaresContainer = connect(
    state => ({
        softwares: state.softwaresPageState.shortSoftwares,
    }),
    dispatch => ({
        softwaresSet: data => {
            dispatch(softwaresGetActionCreator(data));
        },
        softwareCategoriesSet: data => {
            dispatch(softwareCategoriesGetActionCreator(data));
        },
        shortSoftwaresSet: () => {
            dispatch(makeShortSoftwaresActionCreator());
        },
    })
)(Softwares);

export default SoftwaresContainer;