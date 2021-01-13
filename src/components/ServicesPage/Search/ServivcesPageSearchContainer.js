import { connect } from 'react-redux';
import { changePageOnServicesPagePaginationActionCreator, changeServicesPageSearchActionCreator, makeShortServicesActionCreator } from '../../../redux/servicesPageReducer';
import Search from '../../DevicesPage/Search/Search';

let ServicesPageSearchContainer = connect(
    state => ({
        search: state.servicesPageState.search,
    }),
    dispatch => ({
        onChangeSearch: (value) => {
            dispatch(changeServicesPageSearchActionCreator(value));
            dispatch(changePageOnServicesPagePaginationActionCreator(1));
            dispatch(makeShortServicesActionCreator());
        },
    })
)(Search);

export default ServicesPageSearchContainer;