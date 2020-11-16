import { connect } from 'react-redux';
import { changeDevicesSerachActionCreator } from '../../../redux/devicesPageReducer';
import Search from './Search';

let DevicesSearchContainer = connect(
    state => ({
        search: state.devicesPageState.search,
    }),
    dispatch => ({
        onChangeSearch: (value) => {
            dispatch(changeDevicesSerachActionCreator(value));
        },
    })
)(Search);

export default DevicesSearchContainer;