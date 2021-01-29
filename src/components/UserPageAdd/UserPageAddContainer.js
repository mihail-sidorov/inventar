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

            sendValues.contact = {};
            if (sendValues.phone !== undefined) {
                sendValues.contact.phone = sendValues.phone;
                delete sendValues.phone;
            }
            if (sendValues.email !== undefined) {
                sendValues.contact.email = sendValues.email;
                delete sendValues.email;
            }

            usersPost(sendValues)
                .then((response) => {
                    dispatch(usersPostActionCreator(response.data));
                    props.history.push('/users');
                })
                .catch((error) => {
                    dispatch({
                        type: 'USER_ADD_FORM_VALIDATE',
                        errors: error.response.data.message,
                    });
                });
        },
    })
)(UserPageAdd);

export default UserPageAddContainer;