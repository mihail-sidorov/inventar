import { connect } from 'react-redux';
import LocationPageEdit from './LocationPageEdit';
import { initialize } from 'redux-form';
import authHOC from '../../HOC/authHOC';
import { locationAddActionCreator, locationEdit, locationsGetActionCreator } from '../../redux/locationsReducer';

let LocationPageEditContainer = connect(
    state => ({

    }),
    dispatch => ({
        onSubmit: (values) => {
            if (values.location) {
                locationEdit(values)
                    .then(res => {
                        dispatch(locationAddActionCreator(res.data));
                        alert('Местонахождение отредактировано!');
                    })
                    .catch(err => console.log(err));
            }
        },
        locationsSet: (data) => {
            dispatch(locationsGetActionCreator(data));
        },
        onInitialValuesSet: (locationId, history) => {
            let state = window.store.getState();
            
            if (state.locationsState.locations[locationId] === undefined) {
                history.push('/locations');
            }
            else {
                let initialValues = {...state.locationsState.locations[locationId]};
                dispatch(initialize('locationEditForm', initialValues));
            }
        },
    })
)(LocationPageEdit);

export default authHOC(LocationPageEditContainer);