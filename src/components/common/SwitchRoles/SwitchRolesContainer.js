import { connect } from 'react-redux';
import authHOC from '../../../HOC/authHOC';
import SwitchRoles from './SwitchRoles';

let SwitchRolesContainer = connect(
    state => ({
        role: state.authState.role,
    })
)(SwitchRoles);

export default authHOC(SwitchRolesContainer);