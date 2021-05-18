import React from 'react';
import PaginationContainer from './Pagination/PaginationContainer';
import SearchContainer from './Search/SearchConatiner';

let Protege = props => {
    let protegeListArr = [];
    let protegeListArrIndex = 1;
    for (let shortEntity of props.protegeList.shortEntitys) {
        protegeListArr.push(
            <tr key={protegeListArrIndex}>
                <td>{props.users[shortEntity.mentor_id]?.full_name}</td>
            </tr>
        );
        protegeListArrIndex++;
    }

    return (
        <div className="protege">
            <div className="protege__list-search">
                <SearchContainer searchSwitch={props.searchSwitch} />
            </div>
            <div className="protege__list">
                <table>
                    <thead>
                        <tr>
                            <th>Наставник</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            protegeListArr.length > 0 ? protegeListArr :
                            <tr>
                                <td colSpan="2">
                                    {props.searchOn ? 'По запросу поиска ничего не найдено' : 'Список данных пуст'}
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className="protege__pagination">
                <PaginationContainer />
            </div>
        </div>
    );
};

let ProtegeClassComponent = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchOn: false,
        };
    }

    render() {
        return (
            <Protege
                {...this.props}
                {...this.state}
                searchSwitch={value => {
                    this.searchSwitch(value);
                }}
            />
        );
    }

    searchSwitch(value) {
        this.setState({searchOn: value ? true : false});
    }
}

export default ProtegeClassComponent;