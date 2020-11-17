import { connect } from 'react-redux';
import { changeDevicesSerachActionCreator, makeShortDevicesActionCreator } from '../../../redux/devicesPageReducer';
import Search from './Search';

let DevicesSearchContainer = connect(
    state => ({
        search: state.devicesPageState.search,
    }),
    dispatch => ({
        onChangeSearch: (value) => {
            dispatch(changeDevicesSerachActionCreator(value));
            dispatch(makeShortDevicesActionCreator());
        },
    })
)(Search);

export default DevicesSearchContainer;