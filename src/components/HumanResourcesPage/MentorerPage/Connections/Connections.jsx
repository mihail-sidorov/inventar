import React from 'react';
import SearchContainer from './Search/SearchContainer';
import PaginationContainer from './Pagination/PaginationContainer';

let Connections = props => {
    let mentorSearchArr = [];
    for (let id in props.mentorSearch) {
        mentorSearchArr.push(
            <div key={id} className="connections__search-item" mentor_id={id}
                onClick={e => {
                    props.mentorIdSet(e.target.getAttribute('mentor_id'));
                    props.mentorSearchSet(props.searchMentorValue);
                    props.protegeSearchSet(props.searchProtegeValue);
                }}
            >{props.mentorSearch[id].full_name}</div>
        );
    }

    let protegeSearchArr = [];
    for (let id in props.protegeSearch) {
        protegeSearchArr.push(
            <div key={id} className="connections__search-item" protege_id={id}
                onClick={e => {
                    props.protegeIdSet(e.target.getAttribute('protege_id'));
                    props.mentorSearchSet(props.searchMentorValue);
                    props.protegeSearchSet(props.searchProtegeValue);
                }}
            >{props.protegeSearch[id].full_name}</div>
        );
    }

    let hrListArr = [];
    let hrListArrIndex = 1;
    for (let shortEntity of props.hrList.shortEntitys) {
        hrListArr.push(
            <tr key={hrListArrIndex}>
                <td>{props.users[shortEntity.mentor_id]?.full_name}</td>
                <td>{props.users[shortEntity.protege_id]?.full_name}</td>
            </tr>
        );
        hrListArrIndex++;
    }

    return (
        <div className="connections">
            {
                !props.create &&
                <button className="btn connections__create"
                    onClick={() => {
                        props.mentorSearchSet('');
                        props.protegeSearchSet('');
                        props.createSwitch();
                    }}
                >
                    Создать связь
                </button>
            }
            {
                props.create &&
                <>
                    <div className="connections__search">
                        <div className="connections__search-users connections__search_mentor">
                            <div className="connections__search-users-title">Выбор наставника</div>
                            <input type="text" value={props.searchMentorValue} onChange={e => {
                                props.searchMentorValueChange(e.target.value);
                                props.mentorSearchSet(e.target.value);
                            }} />
                            <div className="connections__search-items">
                                {mentorSearchArr}
                            </div>
                        </div>
                        <div className="connections__search-users connections__search_protege">
                            <div className="connections__search-users-title">Выбор стажера</div>
                            <input type="text" value={props.searchProtegeValue} onChange={e => {
                                props.searchProtegeValueChange(e.target.value);
                                props.protegeSearchSet(e.target.value);
                            }} />
                            <div className="connections__search-items">
                                {protegeSearchArr}
                            </div>
                        </div>
                    </div>
                    <div className="connections__approve">
                        <div className="connections__approve-mentor">{props.users[props.mentorId]?.full_name}</div>
                        <button className="btn" onClick={() => {
                            props.mentoringApprove(props.mentorId, props.protegeId, props.mentorerPageInit);
                        }}>Утвердить</button>
                        <div className="connections__approve-protege">{props.users[props.protegeId]?.full_name}</div>
                    </div>
                </>
            }
            <div className="connections__list-search">
                <SearchContainer searchSwitch={props.searchSwitch} />
            </div>
            <div className="connections__list">
                <table>
                    <thead>
                        <tr>
                            <th>Наставник</th>
                            <th>Стажер</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            hrListArr.length > 0 ? hrListArr :
                            <tr>
                                <td colSpan="2">
                                    {props.searchOn ? 'По запросу поиска ничего не найдено' : 'Список данных пуст'}
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className="connections__pagination">
                <PaginationContainer />
            </div>
        </div>
    );
};

let ConnectionsClassComponent = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchMentorValue: '',
            searchProtegeValue: '',
            searchOn: false,
            create: false,
        };
    }

    render() {
        return (
            <Connections {...this.props} searchMentorValue={this.state.searchMentorValue} searchProtegeValue={this.state.searchProtegeValue}
                searchMentorValueChange={value => {
                    this.searchMentorValueChange(value);
                }}
                searchProtegeValueChange={value => {
                    this.searchProtegeValueChange(value);
                }}
                searchSwitch={value => {
                    this.searchSwitch(value);
                }}
                createSwitch={() => {
                    this.createSwitch();
                }}
                {...this.state}
            />
        );
    }

    searchMentorValueChange(value) {
        this.setState({
            searchMentorValue: value,
        });
    }

    searchProtegeValueChange(value) {
        this.setState({
            searchProtegeValue: value,
        });
    }

    searchSwitch(value) {
        this.setState({searchOn: value ? true : false});
    }

    createSwitch() {
        this.setState({
            create: true,
        });
    }
}

export default ConnectionsClassComponent;