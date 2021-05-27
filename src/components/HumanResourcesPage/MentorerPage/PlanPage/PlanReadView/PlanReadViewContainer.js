import { connect } from 'react-redux';
import PlanReadView from './PlanReadView';

let PlanReadViewContainer = connect(
    state => ({
        plan: state.planState.plan,
    }),
    dispatch => ({})
)(PlanReadView);

export default PlanReadViewContainer;