import React from 'react';
import isEmptyObject from '../../../functions/isEmptyObject';
import { postDepLocsGet } from '../../../redux/postDepLocsReducer';
import { usersGet } from '../../../redux/usersReducer';
import UserContainer from './User/UserContainer';

let Users = (props) => {
    let usersArr = [];

    for (let id in props.users) {
        let User = UserContainer(id);
        usersArr.push(<User key={id} />);
    }

    return (
        <div className="users">
            <table border="1">
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Должность</th>
                    </tr>
                </thead>
                <tbody>
                    {usersArr}
                </tbody>
            </table>
        </div>
    );
}

let UsersClassComponent = class extends React.Component {
    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.usersState.users) || isEmptyObject(state.postDepLocsState.postDepLocs)) {
            let promiseArr = [];

            if (isEmptyObject(state.usersState.users)) {
                promiseArr.push(usersGet());
            }

            if (isEmptyObject(state.postDepLocsState.postDepLocs)) {
                promiseArr.push(postDepLocsGet(true));
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'users') this.props.onUsersGet(value.data);
                        if (value.config.url === 'post_dep_loc_united?status=all') this.props.onPostDepLocsGet(value.data);
                    });

                    this.props.onMakeShortUsers();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            this.props.onMakeShortUsers();
        }
    }

    render() {
        return (
            <Users {...this.props} />
        );
    }
}

export default UsersClassComponent;