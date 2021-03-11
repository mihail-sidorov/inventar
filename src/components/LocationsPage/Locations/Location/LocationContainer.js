import { connect } from 'react-redux';
import Location from './Location';

let LocationContainer = (id) => {
    return connect(
        state => ({
            loc: state.locationsState.locations[id],
        }),
        dispatch => ({
            onGoToLocationEdit: (props) => {
                props.history.push(`/locations/${props.loc.id}`);
            },
        })
    )(Location);
}

export default LocationContainer;