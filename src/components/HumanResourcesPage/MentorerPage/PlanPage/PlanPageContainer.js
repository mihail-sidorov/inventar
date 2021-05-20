import { connect } from 'react-redux';
import { initUserRightsActionCreator, resetPlanStateActionCreator } from '../../../../redux/planReducer';
import PlanPage from './PlanPage';

let PlanPageContainer = connect(
    state => ({
        role: state.planState.role,
        userType: state.planState.userType,
        connectionStatus: state.planState.connectionStatus,
    }),
    dispatch => ({
        initUserRights: data => {
            dispatch(initUserRightsActionCreator(data));
        },
        resetPlanState: () => {
            dispatch(resetPlanStateActionCreator());
        },
    })
)(PlanPage);

export default PlanPageContainer;