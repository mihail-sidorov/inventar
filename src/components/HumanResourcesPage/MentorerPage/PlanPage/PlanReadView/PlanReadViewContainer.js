import { connect } from 'react-redux';
import PlanReadView from './PlanReadView';

let PlanReadViewContainer = connect(
    state => ({}),
    dispatch => ({})
)(PlanReadView);

export default PlanReadViewContainer;