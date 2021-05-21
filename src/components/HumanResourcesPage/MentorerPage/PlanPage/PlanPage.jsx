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

            for (let connection of mentoring) {
                if (connection.id == props.match.params.planId) {
                    connectionStatus = connection.status;
                    if (connection.mentor_id == userId) {
                        userType = 'mentor';
                    }
                    if (connection.protege_id == userId) {
                        userType = 'protege';
                    }
                    break;
                }
            }

            props.initUserRights({
                role,
                userId,
                userType,
                connectionStatus,
            });
        })();
        return () => {
            props.resetPlanState();
        };
    }, []);

    let planView = null;
    if (props.role === 'hr' || props.userType === 'leader' || props.userType === 'protege') planView = <PlanReadViewContainer />;
    if (props.userType === 'mentor') planView = <PlanEditViewContainer />;
    if (props.connectionStatus === 'sentformoderation' || props.connectionStatus === 'planconfirmed') planView = <PlanReadViewContainer />;
    if (props.connectionStatus === 'unconfirmed') planView = null;

    return (
        <div className="plan-page">
            <div className="plan-page__wrapper section-2">
                <Route path="/mentorer/:page" render={() => (
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