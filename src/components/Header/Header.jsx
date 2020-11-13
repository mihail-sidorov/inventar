import React from 'react';

let Header = (props) => {
    return (
        <div className="header">
            <button className="header__logout" onClick={() => {
                props.onLogout();
            }}>Выход</button>
        </div>
    );
}

export default Header;