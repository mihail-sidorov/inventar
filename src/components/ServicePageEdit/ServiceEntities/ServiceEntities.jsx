import React from 'react';
import isEmptyObject from '../../../functions/isEmptyObject';
import { departmentsGet } from '../../../redux/departmentsReducer';
import { getAttached } from '../../../redux/servicePageEditReducer';
import { usersGet } from '../../../redux/usersReducer';

let ServiceEntities = (props) => {
    let freeDepartmentsArray = [];
    let freeUsersArray = [];
    let attachedDepartmentsArray = [];
    let attachedUsersArray = [];

    for (let id in props.noAttachedDepartments) {
        freeDepartmentsArray.push(
            <div className="service-entities__free-department" key={id}>
                <span className="service-entities__free-department-part-inform">{props.noAttachedDepartments[id].department}</span>
                <button className="service-entities__attach-btn" onClick={() => {
                    props.attachDepartment(props.serviceId, id);
                }}>Прикрепить</button>
            </div>
        );
    }

    for (let id in props.noAttachedUsers) {
        freeUsersArray.push(
            <div className="service-entities__free-user" key={id}>
                <span className="service-entities__free-user-part-inform">{props.noAttachedUsers[id].full_name}</span>
                <button className="service-entities__attach-btn" onClick={() => {
                    props.attachUser(props.serviceId, id);
                }}>Прикрепить</button>
            </div>
        );
    }

    for (let id in props.attachedDepartments) {
        attachedDepartmentsArray.push(
            <tr key={id}>
                <td>Отдел {props.attachedDepartments[id].department} ({props.attachedDepartments[id].location})</td>
                <td><button className="service-entities__attach-btn" onClick={() => {
                    props.unAttachDepartment(props.serviceId, id);
                }}>Открепить</button></td>
            </tr>
        );
    }

    for (let id in props.attachedUsers) {
        attachedUsersArray.push(
            <tr key={id}>
                <td>{props.attachedUsers[id].full_name}</td>
                <td><button className="service-entities__attach-btn" onClick={() => {
                    props.unAttachUser(props.serviceId, id);
                }}>Открепить</button></td>
            </tr>
        );
    }

    return (
        <div className="service-entities">
            <div className="service-entities__title">Отделы и сотрудники</div>
            <div className="service-entities__search search">
                <input type="text" value={props.search} onChange={(e) => {
                    props.changeSearch(e.currentTarget.value);
                }} />
            </div>
            <div className="service-entities__free">
                <div className="service-entities__free-departments">
                    {freeDepartmentsArray}
                </div>
                <div className="service-entities__free-users">
                    {freeUsersArray}
                </div>
            </div>
            <div className="service-entities__attached">
                <div className="service-entities__attached-departments">
                    <table>
                        <tbody>
                            {attachedDepartmentsArray}
                        </tbody>
                    </table>
                </div>
                <div className="service-entities__attached-users">
                    <table>
                        <tbody>
                            {attachedUsersArray}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

let ServiceEntitiesClassComponent = class extends React.Component {
    render() {
        return <ServiceEntities {...this.props} />
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.departmentsState.departments) || isEmptyObject(state.usersState.users)) {
            let promiseArr = [];

            if (isEmptyObject(state.departmentsState.departments)) {
                promiseArr.push(departmentsGet());
            }

            if (isEmptyObject(state.usersState.users)) {
                promiseArr.push(usersGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'dep_loc_united') this.props.departmentsSet(value.data);
                        if (value.config.url === 'users') this.props.usersSet(value.data);
                    });

                    getAttached(this.props.serviceId)
                        .then((response) => {
                            this.props.setAttached(response.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            getAttached(this.props.serviceId)
                .then((response) => {
                    this.props.setAttached(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}

export default ServiceEntitiesClassComponent;