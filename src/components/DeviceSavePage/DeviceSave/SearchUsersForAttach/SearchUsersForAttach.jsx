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
                    props.searchSwitch(e.currentTarget.value);
                    props.searchUsersInputChange(e.currentTarget.value);
                }} />
            </div>
            <div className="search-users-for-attach__items">
                {
                    searchUsersArray.length ? searchUsersArray : props.searchOn ? 'По запросу поиска ничего не найдено' : ''
                }
            </div>
        </div>
    );
}

let SearchUsersForAttachClassComponent = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchOn: false};
    }

    searchSwitch(search) {
        this.setState({searchOn: search ? true : false});
    }

    render() {
        return (
            <SearchUsersForAttach {...this.props} searchSwitch={this.searchSwitch.bind(this)} searchOn={this.state.searchOn} />
        );
    }
}

export default SearchUsersForAttachClassComponent;