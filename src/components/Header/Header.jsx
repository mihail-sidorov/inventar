import React from 'react';

let Header = (props) => {
    return (
        <div className="header">
            <div className="header__wrapper section-1">
                <a href="/" className="header__logo">Company</a>
                <div className="header__profile">
                    <div className="header__profile-fio">Иванов Иван Иванович</div>
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

export default Header;