import React from 'react';
import { useShallowEqualSelector } from '../../../../../../hooks/useShallowEqualSelector';
import cn from 'classnames';

import './TestReadView.scss';

let TestReadView = (props) => {
    let getTest;

    if (props.blockIndex !== undefined) {
        getTest = state => ({
            test: state.planState.plan.blocks[props.blockIndex].test,
            userType: state.planState.userType,
            //userType: 'protege',
        });
    }
    else {
        getTest = state => ({
            test: state.planState.plan.test,
            userType: state.planState.userType,
            //userType: 'protege',
        });
    }

    const {test, userType} = useShallowEqualSelector(getTest);
    
    let questions = [];
    test.questions?.forEach((el, qIndex) => {
        let answers = [];
        let userIsRight = null;
        el.answers?.forEach((el, aIndex) => {
            if (userIsRight === null && el.isPick && el.isRight) {
                userIsRight = true;
            }
            if (userIsRight === null && el.isPick && !el.isRight) {
                userIsRight = false;
            }
            answers.push(
                <li className={cn('test-read-view__answer', userType !== 'protege' && el.isRight && 'test-read-view__answer_is-right', el.isPick && 'test-read-view__answer_is-pick')} key={aIndex}>
                    <div className="test-read-view__answer-title">
                        {el.title}
                    </div>
                </li>
            );
        });
        questions.push(
            <li className={cn('test-read-view__question', userIsRight !== null && (userIsRight ? 'test-read-view__question_user-is-right' : 'test-read-view__question_user-not-right'))} key={qIndex}>
                <div className="test-read-view__question-title">
                    {el.title}
                </div>
                <ul className="test-read-view__answers">
                    {answers}
                </ul>
            </li>
        );
    });

    return (
        <div className="test-read-view">
            <div className="test-read-view__title">
                {test.title}
            </div>
            <ul className="test-read-view__questions">
                {questions}
            </ul>
        </div>
    );
}

export default React.memo(TestReadView);