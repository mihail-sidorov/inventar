import { connect } from 'react-redux';
import PlanReadView from './PlanReadView';

let PlanReadViewContainer = connect(
    state => ({
        plan: state.planState.plan,
        connectionStatus: state.connectionStatus,
        userType: state.planState.userType,
    }),
    dispatch => ({})
)(PlanReadView);

export default PlanReadViewContainer;