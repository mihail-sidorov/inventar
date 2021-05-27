import { connect } from 'react-redux';
import { addPlanBlockActionCreator, addPlanSectionActionCreator, blockTitleEditActionCreator, connectionStatusChangeActionCreator, delPlanBlockActionCreator, delPlanSectionActionCreator, planSave, sectionTitleEditActionCreator } from '../../../../../redux/planReducer';
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
        planSave: (id, plan, status) => {
            planSave(id, plan)
                .then((res) => {
                    if (status === 'noplan') {
                        dispatch(connectionStatusChangeActionCreator(res.data.status));
                    }
                    let mes = (status === 'noplan' ? 'План создан!' : 'План сохранен!');
                    alert(mes);
                })
                .catch(console.log);
        },
    })
)(PlanEditView);

export default PlanEditViewContainer;