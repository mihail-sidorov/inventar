import { connect } from 'react-redux';
import { setPlanStateActionCreator, resetPlanStateActionCreator } from '../../../../redux/planReducer';
import PlanPage from './PlanPage';

let PlanPageContainer = connect(
    state => ({
        role: state.planState.role,
        userType: state.planState.userType,
        connectionStatus: state.planState.connectionStatus,
    }),
    dispatch => ({
        setPlanState: data => {
            dispatch(setPlanStateActionCreator(data));
        },
        resetPlanState: () => {
            dispatch(resetPlanStateActionCreator());
        },
    })
)(PlanPage);

export default PlanPageContainer;