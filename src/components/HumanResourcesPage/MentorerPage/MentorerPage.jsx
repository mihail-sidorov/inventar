import React from 'react';
import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import { loginGet } from '../../../redux/authReducer';
import { mentoringGet } from '../../../redux/mentorerPageReducer';
import { userRights } from '../../../redux/planReducer';
import { usersGet } from '../../../redux/usersReducer';
import InnerPageContainer from '../../InnerPage/InnerPageContainer';
import ConnectionsContainer from './Connections/ConnectionsContainer';
import LeaderContainer from './Leader/LeaderContainer';
import MentorContainer from './Mentor/MentorContainer';
import ProtegeContainer from './Protege/ProtegeContainer';

let MentorerPage = props => {
    let tabs = [];
    let tabIndex = 1;
    for (let component in props.showComponents) {
        tabs.push(
            <div
                component={component}
                key={tabIndex}
                className={`mentorer-page__tab${props.showComponents[component] ? ' mentorer-page__tab_active' : ''}`}
                onClick={(e) => {
                    props.showComponentsChange(e.target.getAttribute('component'));
                }}
            >
                {component === 'hr' ? 'Связи' : component === 'mentor' ? 'Наставник' : component === 'protege' ? 'Стажер' : component === 'leader' ? 'Руководитель отдела' : ''}
            </div>
        );
        tabIndex++;
    }

    return (
        <div className="mentorer-page">
            <div className="mentorer-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPageContainer>
                        <NavLink className="mentorer-page__back-to-human-resources btn" to="/humanResources">Вернуться в отдел кадров</NavLink>
                        <div className="mentorer-page__title">Наставничество</div>
                        <div className="mentorer-page__tabs">
                            {tabs}
                        </div>
                        {
                            props.showComponents.hr && <ConnectionsContainer mentorerPageInit={props.mentorerPageInit} />
                        }
                        {
                            props.showComponents.mentor && <MentorContainer />
                        }
                        {
                            props.showComponents.protege && <ProtegeContainer />
                        }
                        {
                           props.showComponents.leader && <LeaderContainer />
                        }
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
};

let MentorerPageClassComponent = class extends React.Component {
    render() {
        return (
            <MentorerPage {...this.props} mentorerPageInit={() => {
                this.mentorerPageInit();
            }} />
        );
    }

    mentorerPageInit() {
        (async () => {
            let mentoring = mentoringGet();
            let users = usersGet();
            let authData = loginGet();

            mentoring = await mentoring;
            users = await users;
            authData = await authData;
            let userRightsArr = (await userRights(authData.data.userId)).data;
            let leader = false;
            if (userRightsArr.length) {
                if (userRightsArr[0].leader) {
                    leader = true;
                }
            }

            let mentoringHr = [], mentoringMentor = [], mentoringProtege = [], mentoringLeader = [];
            let showComponents = {};
            if (authData.data.role === 'hr') {
                showComponents.hr = false;
                mentoringHr = mentoring.data;
            }
            for (let el of mentoring.data) {
                if (el.mentor_id === authData.data.userId && (el.status === 'noplan' || el.status === 'plancreated' || el.status === 'sentformoderation' || el.status === 'planconfirmed')) {
                    showComponents.mentor = false;
                    mentoringMentor.push(el);
                }
                if (el.protege_id === authData.data.userId && el.status === 'planconfirmed') {
                    showComponents.protege = false;
                    mentoringProtege.push(el);
                }
                if (leader) {
                    let objIn = {};
                    for (let id in users.data) {
                        if (users.data[id].dep_loc_id === users.data[authData.data.userId].dep_loc_id) {
                            if ((el.mentor_id == id || el.protege_id == id) && (el.status === 'sentformoderation' || el.status === 'planconfirmed')) {
                                if (!objIn[el.id]) {
                                    mentoringLeader.push(el);
                                    objIn[el.id] = true;
                                }
                            }
                        }
                    }
                    if (mentoringLeader.length) {
                        showComponents.leader = false;
                    }
                }
            }
            for (let component in showComponents) {
                showComponents[component] = true;
                break;
            }

            this.props.mentoringSet(mentoringHr, mentoringMentor, mentoringProtege, mentoringLeader);
            this.props.usersSet(users.data);
            this.props.showComponentsSet(showComponents);
            this.props.makeShortHrList();
            this.props.makeShortMentorList();
            this.props.makeShortProtegeList();
            this.props.makeShortLeaderList();
        })().catch(console.log);
    }

    componentDidMount() {
        this.mentorerPageInit();
    }

    componentWillUnmount() {
        this.props.resetMentorerPageState();
    }
}

export default MentorerPageClassComponent;