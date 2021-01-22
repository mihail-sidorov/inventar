import React from 'react';

let SearchUsersForAttach = (props) => {
    let searchUsersArray = [];

    if (props.device.id !== undefined) {
        for (let id in props.searchUsers) {
            searchUsersArray.push(
                <div className="search-users-for-attach__item" key={id}>
                    <span className="search-users-for-attach__item-part-inform">{props.searchUsers[id].full_name}</span>&nbsp;
                    <button onClick={() => {
                        props.attachUserToDevice(id, props.device.id);
                    }}>Прикрепить</button>
                </div>
            );
        }
    }

    return (
        <div className="search-users-for-attach">
            <div className="search-users-for-attach__input search">
                <input type="text" value={props.searchUsersInput} onChange={(e) => {
                    props.searchUsersInputChange(e.currentTarget.value);
                }} />
            </div>
            <div className="search-users-for-attach__items">
                {searchUsersArray}
            </div>
        </div>
    );
}

export default SearchUsersForAttach;