import React from 'react';
import isEmptyObject from '../../functions/isEmptyObject';
import { usersGet } from '../../redux/usersReducer';

let Header = (props) => {
    return (
        <div className="header">
            <div className="header__wrapper section-1">
                <a href="/" className="header__logo">Company</a>
                <div className="header__profile">
                    <div className="header__profile-fio">{props.fio}</div>
                    <div className="header__profile-menu">
                        <div className="header__profile-menu-photo"></div>
                        <div className="header__profile-menu-actions">
                            <div className="header__profile-menu-actions-wrapper">
                                <div className="header__profile-menu-action" onClick={() => {
                                    props.onLogout();
                                }}>Выход</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

let HeaderClassComponent = class extends React.Component {
    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.usersState.users)) {
            usersGet()
                .then((response) => {
                    this.props.onUsersGet(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <Header {...this.props} />
        );
    }
}

export default HeaderClassComponent;