import React, { useEffect, useState } from 'react';
import { Route, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { loginGet } from '../../../../redux/authReducer';
import { mentoringGet } from '../../../../redux/mentorerPageReducer';
import { userRights } from '../../../../redux/planReducer';
import InnerPageContainer from '../../../InnerPage/InnerPageContainer';
import PlanEditViewContainer from './PlanEditView/PlanEditViewContainer';
import PlanReadViewContainer from './PlanReadView/PlanReadViewContainer';

let PlanPage = props => {
    useEffect(() => {
        (async () => {
            let login = loginGet();
            let mentoring = mentoringGet();
            let userType = null;
            let connectionStatus = null;

            let {userId, role} = (await login).data;
            mentoring = (await mentoring).data;
            let leader = (await userRights(userId)).data;
            if (leader.length && leader[0].leader) {
                leader = true;
            }
            else {
                leader = false;
            }
            if (leader) {
                userType = 'leader';
            }

            let plan;
            for (let connection of mentoring) {
                if (connection.id == props.match.params.planId) {
                    connectionStatus = connection.status;
                    if (connection.mentor_id == userId) {
                        userType = 'mentor';
                    }
                    if (connection.protege_id == userId) {
                        userType = 'protege';
                    }
                    plan = connection.plan;
                    break;
                }
            }

            props.setPlanState({
                role,
                userId,
                userType,
                connectionStatus,
                plan,
            });
        })().catch(console.log);
        return () => {
            props.resetPlanState();
        };
    }, []);

    let planView = null;
    if (props.role === 'hr'
    || (props.userType === 'leader' && (props.connectionStatus === 'sentformoderation' || props.connectionStatus === 'planconfirmed'))
    || (props.userType === 'protege' && props.connectionStatus === 'planconfirmed')
    || (props.userType === 'mentor' && (props.connectionStatus === 'sentformoderation' || props.connectionStatus === 'planconfirmed'))) {
        planView = <PlanReadViewContainer />;
    }
    if (props.userType === 'mentor' && (props.connectionStatus === 'noplan' || props.connectionStatus === 'plancreated')) {
        planView = <PlanEditViewContainer />;
    }

    return (
        <div className="plan-page">
            <div className="plan-page__wrapper section-2">
                <Route exact path="/mentorer/:page/:planId" render={() => (
                    <InnerPageContainer>
                        <NavLink className="plan-page__back-to-human-resources btn" to="/mentorer">Вернуться в наставничество</NavLink>
                        <div className="plan-page__title">План наставничества</div>
                        <div className="plan-page__content">
                            {planView}
                        </div>
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
};

export default withRouter(PlanPage);