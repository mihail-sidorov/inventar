import React from 'react';
import { withRouter } from 'react-router';
import TestExecutionView from './TestExecutionView/TestExecutionView';
import TestReadView from './TestReadView/TestReadView';

let PlanReadView = props => {
    let plan = props.plan;
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
                        block.test && ((props.userType === 'protege' && block.test.status === 'uncomplete') ? <TestExecutionView blockIndex={index} /> : <TestReadView blockIndex={index} />)
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
                    plan.test && ((props.userType === 'protege' && plan.test.status === 'uncomplete') ? <TestExecutionView /> : <TestReadView />)
                }
                <div className="plan-read-view__btns">
                    <button className="plan-read-view__close" onClick={() => {
                        props.history.push('/mentorer');
                    }}>Закрыть</button>
                </div>
            </div>
        );
    }

    return plan;
};

export default withRouter(PlanReadView);