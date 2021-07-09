import { connect } from 'react-redux';
import { planCompleteMentorThunk } from '../../../../../redux/planReducer';
import PlanReadView from './PlanReadView';

let PlanReadViewContainer = connect(
    state => ({
        plan: state.planState.plan,
        connectionStatus: state.planState.connectionStatus,
        userType: state.planState.userType,
    }),
    dispatch => ({
        planCompleteMentor: planId => {
            dispatch(planCompleteMentorThunk(planId));
        },
    })
)(PlanReadView);

export default PlanReadViewContainer;