import { connect } from 'react-redux';
import { makeShortLocationsActionCreator } from '../../../redux/locationsPageReducer';
import { locationsGetActionCreator } from '../../../redux/locationsReducer';
import Locations from './Locations';

let LocationsContainer = connect(
    state => ({
        locations: state.locationsPageState.shortLocations,
    }),
    dispatch => ({
        locationsSet: (locationsArr) => {
            dispatch(locationsGetActionCreator(locationsArr));
        },
        shortLocationsSet: () => {
            dispatch(makeShortLocationsActionCreator());
        },
    })
)(Locations);

export default LocationsContainer;