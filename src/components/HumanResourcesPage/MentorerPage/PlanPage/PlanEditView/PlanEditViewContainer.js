import { connect } from 'react-redux';
import { addPlanBlockActionCreator, addPlanSectionActionCreator, blockTitleEditActionCreator, delPlanBlockActionCreator, delPlanSectionActionCreator, planSave, sectionTitleEditActionCreator } from '../../../../../redux/planReducer';
import PlanEditView from './PlanEditView';

let PlanEditViewContainer = connect(
    state => ({
        plan: state.planState.plan,
    }),
    dispatch => ({
        blockTitleEdit: (value, index) => {
            dispatch(blockTitleEditActionCreator(value, index));
        },
        sectionTitleEdit: (value, indexBlock, indexSection) => {
            dispatch(sectionTitleEditActionCreator(value, indexBlock, indexSection));
        },
        addPlanBlock: () => {
            dispatch(addPlanBlockActionCreator());
            alert('Добавлен новый блок!');
        },
        addPlanSection: indexBlock => {
            dispatch(addPlanSectionActionCreator(indexBlock));
        },
        delPlanBlock: index => {
            dispatch(delPlanBlockActionCreator(index));
        },
        delPlanSection: (indexBlock, indexSection) => {
            dispatch(delPlanSectionActionCreator(indexBlock, indexSection));
        },
        planSave: (id, plan) => {
            planSave(id, plan)
                .then(() => {
                    alert('План сохранен!');
                })
                .catch(console.log);
        },
    })
)(PlanEditView);

export default PlanEditViewContainer;