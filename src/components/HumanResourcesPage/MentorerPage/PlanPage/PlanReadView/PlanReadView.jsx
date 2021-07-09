import React from 'react';
import { withRouter } from 'react-router';
import TestExecutionView from './TestExecutionView/TestExecutionView';
import TestReadView from './TestReadView/TestReadView';
import TaskReadView from './TaskReadView/TaskReadView';

function checkCompletePlan(plan) {
    if (
        plan.test && plan.test.status !== 'complete' ||
        plan.task && plan.task.status !== 'complete'
    )
    {
        return false;
    }

    for (let block of plan.blocks) {
        if (
            block.test && block.test.status !== 'complete' ||
            block.task && block.task.status !== 'complete'
        )
        {
            return false;
        }
    }

    return true;
}

let PlanReadView = props => {
    let plan = props.plan;
    const checkPlan = plan;
    if (plan !== null) {
        let blocks = [];
        plan.blocks?.forEach((block, index) => {
            let sections = [];
            block.sections?.forEach((section, index) => {
                section = (
                    <li className="plan-read-view__section" key={index}>
                        <div className="plan-read-view__section-title">{section.title}</div>
                    </li>
                );
                sections.push(section);
            });
            sections = (
                <ul className="plan-read-view__sections">
                    {sections}
                </ul>
            );
            block = (
                <div className="plan-read-view__block" key={index}>
                    <div className="plan-read-view__block-title">{block.title}</div>
                    {sections}
                    {
                        block.test && ((props.userType === 'protege' && block.test.status === 'incomplete') ? <TestExecutionView blockIndex={index} /> : <TestReadView blockIndex={index} />)
                    }
                    {
                        block.task &&
                        <TaskReadView bIndex={index} />
                    }
                </div>
            );
            blocks.push(block);
        });
        blocks = (
            <div className="plan-read-view__blocks">
                {blocks}
            </div>
        );
        plan = (
            <div className="plan-read-view">
                {blocks}
                {
                    plan.test && ((props.userType === 'protege' && plan.test.status === 'incomplete') ? <TestExecutionView /> : <TestReadView />)
                }
                {
                    plan.task &&
                    <TaskReadView />
                }
                <div className="plan-read-view__btns">
                    <button className="plan-read-view__close" onClick={() => {
                        props.history.push('/mentorer');
                    }}>Закрыть</button>
                    {
                        props.userType === 'mentor' && props.connectionStatus === 'planconfirmed' && checkCompletePlan(checkPlan) &&
                        <button className="plan-read-view__complete"
                            onClick={() => {
                                if (window.confirm('Вы действительно хотите завершить наставничество?')) {
                                    props.planCompleteMentor(props.match.params.planId);
                                }
                            }}
                        >Завершить наставничество</button>
                    }
                </div>
            </div>
        );
    }

    return plan;
};

export default withRouter(PlanReadView);