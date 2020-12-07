import { connect } from 'react-redux';
import { employersGetActionCreator } from '../../redux/employersReducer';
import { locationsGetActionCreator } from '../../redux/locationsReducer';
import { postDepLocsGetActionCreator } from '../../redux/postDepLocsReducer';
import { usersPost, usersPostActionCreator } from '../../redux/usersReducer';
import UserPageAdd from './UserPageAdd';

let UserPageAddContainer = connect(
    state => ({
        employers: state.employersState.employers,
        locations: state.locationsState.locations,
        postDepLocs: state.postDepLocsState.postDepLocs,
    }),
    dispatch => ({
        onEmployersGet: (data) => {
            dispatch(employersGetActionCreator(data));
        },
        onLocationsGet: (data) => {
            dispatch(locationsGetActionCreator(data));
        },
        onPostDepLocsGet: (data) => {
            dispatch(postDepLocsGetActionCreator(data));
        },
        onSubmit: (values, props) => {
            let sendValues = {...values};

            if (sendValues.appointment_date && sendValues.employer_id && sendValues.full_name && sendValues.location_id && sendValues.phone && sendValues.post_dep_loc_id) {
                sendValues.contact = {};
                sendValues.contact.phone = sendValues.phone;
                delete sendValues.phone;

                usersPost(sendValues)
                    .then((response) => {
                        dispatch(usersPostActionCreator(response.data));
                        props.history.push('/users');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
    })
)(UserPageAdd);

export default UserPageAddContainer;