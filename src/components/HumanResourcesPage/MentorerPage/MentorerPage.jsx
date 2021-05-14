import React from 'react';
import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import { loginGet } from '../../../redux/authReducer';
import { mentoringGet } from '../../../redux/mentorerPageReducer';
import { usersGet } from '../../../redux/usersReducer';
import InnerPageContainer from '../../InnerPage/InnerPageContainer';
import ConnectionsContainer from './Connections/ConnectionsContainer';
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
                {component === 'hr' ? 'Связи' : component === 'mentor' ? 'Наставник' : component === 'protege' ? 'Ученик' : ''}
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

            let mentoringHr = [], mentoringMentor = [], mentoringProtege = [];
            let showComponents = {};
            if (authData.data.role === 'hr') {
                showComponents.hr = false;
                mentoringHr = mentoring.data;
            }
            for (let el of mentoring.data) {
                if (el.mentor_id === authData.data.userId) {
                    showComponents.mentor = false;
                    mentoringMentor.push(el);
                }
                if (el.protege_id === authData.data.userId) {
                    showComponents.protege = false;
                    mentoringProtege.push(el);
                }
            }
            for (let component in showComponents) {
                showComponents[component] = true;
                break;
            }

            this.props.mentoringSet(mentoringHr, mentoringMentor, mentoringProtege);
            this.props.usersSet(users.data);
            this.props.showComponentsSet(showComponents);
        })();
    }

    componentDidMount() {
        this.mentorerPageInit();
    }

    componentWillUnmount() {
        this.props.resetMentorerPageState();
    }
}

export default MentorerPageClassComponent;