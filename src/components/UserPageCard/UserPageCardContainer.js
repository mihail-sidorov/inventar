import { connect } from 'react-redux';
import { brandsGetActionCreator } from '../../redux/brandsReducer';
import { devicesGetActionCreator } from '../../redux/devicesReducer';
import { employersGetActionCreator } from '../../redux/employersReducer';
import { locationsGetActionCreator } from '../../redux/locationsReducer';
import { postDepLocsGetActionCreator } from '../../redux/postDepLocsReducer';
import { usersGetActionCreator } from '../../redux/usersReducer';
import UserPageCard from './UserPageCard';

let UserPageCardContainer = connect(
    state => ({
        employers: state.employersState.employers,
        locations: state.locationsState.locations,
        postDepLocs: state.postDepLocsState.postDepLocs,
        devices: state.devicesState.devices,
        brands: state.brandsState.brands,
        users: state.usersState.users,
    }),
    dispatch => ({
        editUser: (props) => {
            props.history.push(`/users/${props.match.params.userId}`);
        },
        onEmployersGet: (data) => {
            dispatch(employersGetActionCreator(data));
        },
        onLocationsGet: (data) => {
            dispatch(locationsGetActionCreator(data));
        },
        onPostDepLocsGet: (data) => {
            dispatch(postDepLocsGetActionCreator(data));
        },
        onDevicesGet: (data) => {
            dispatch(devicesGetActionCreator(data));
        },
        onBrandsGet: (data) => {
            dispatch(brandsGetActionCreator(data));
        },
        onUsersGet: (data) => {
            dispatch(usersGetActionCreator(data));
        },
    })
)(UserPageCard);

export default UserPageCardContainer;