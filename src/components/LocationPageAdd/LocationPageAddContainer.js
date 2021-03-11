import { connect } from 'react-redux';
import authHOC from '../../HOC/authHOC';
import { makeShortLocationsActionCreator } from '../../redux/locationsPageReducer';
import { locationAdd, locationAddActionCreator, locationsGetActionCreator } from '../../redux/locationsReducer';
import LocationPageAdd from './LocationPageAdd';

let LocationPageAddContainer = connect(
    state => ({

    }),
    dispatch => ({
        onSubmit: (values, props) => {
            if (values.location) {
                locationAdd(values)
                    .then(res => {
                        console.log(res);
                        dispatch(locationAddActionCreator(res.data));
                        dispatch(makeShortLocationsActionCreator(true));
                        props.history.push('/locations');
                    })
                    .catch(err => console.log(err));
            }
        },
        locationsSet: (data) => {
            dispatch(locationsGetActionCreator(data));
        },
    })
)(LocationPageAdd);

export default authHOC(LocationPageAddContainer);