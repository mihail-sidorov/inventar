import { connect } from 'react-redux';
import { changeLocationsPageSearchActionCreator, changePageOnLocationsPagePaginationActionCreator, makeShortLocationsActionCreator } from '../../../redux/locationsPageReducer';
import Search from '../../DevicesPage/Search/Search';

let LocationsPageSearchContainer = connect(
    state => ({
        search: state.locationsPageState.search,
    }),
    dispatch => ({
        onChangeSearch: (value) => {
            dispatch(changeLocationsPageSearchActionCreator(value));
            dispatch(changePageOnLocationsPagePaginationActionCreator(1));
            dispatch(makeShortLocationsActionCreator());
        },
    })
)(Search);

export default LocationsPageSearchContainer;