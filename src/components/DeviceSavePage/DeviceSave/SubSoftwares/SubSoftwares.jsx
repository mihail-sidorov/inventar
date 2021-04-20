import React from 'react';
import { withRouter } from 'react-router';
import isEmptyObject from '../../../../functions/isEmptyObject';
import { softwareCategoriesGet } from '../../../../redux/softwareCategoriesReducer';
import { softwaresGet } from '../../../../redux/softwaresReducer';
import { attachSoftwareToDevice, subSoftwaresGet, unAttachSoftwareFromDevice } from '../../../../redux/subSoftwaresReducer';

let SubSoftwares = (props) => {
    let subSoftwaresSearchArr = [];
    let subSoftwaresArr = [];

    for (let id in props.subSoftwaresSearch) {
        subSoftwaresSearchArr.push(
            <div className="sub-devices__search-item" key={id}>
                <span className="sub-devices__search-item-part-inform">{props.categories[props.subSoftwaresSearch[id].software_category_id]?.name}</span>
                <button className="sub-devices__search-item-attach-btn" onClick={() => {
                    attachSoftwareToDevice(id, props.match.params.device)
                        .then(res => {
                            props.updateSoftware(res.data);
                            props.init(props.search);
                        })
                        .catch(console.log);
                }}>Прикрепить</button>
            </div>
        );
    }
    
    for (let id in props.subSoftwares) {
        subSoftwaresArr.push(
            <tr key={id}>
                <td>{props.categories[props.subSoftwares[id].software_category_id]?.name}</td>
                <td><button className="ub-devices__table-unattach-btn" onClick={() => {
                    unAttachSoftwareFromDevice(id, props.match.params.device)
                        .then(res => {
                            props.updateSoftware(res.data);
                            props.init(props.search);
                        })
                        .catch(console.log);
                }}>Открепить</button></td>
            </tr>
        );
    }

    return (
        <div className="sub-softwares">
            <div className="sub-softwares__title">Прикрепление ПО</div>
            <div className="sub-softwares__search">
                <div className="sub-softwares__search-input search"><input type="text" value={props.search} onChange={(e) => {
                    props.changeSearch(e.target.value);
                }} /></div>
                <div className="sub-softwares__search-items">
                    {
                        subSoftwaresSearchArr.length > 0 ? subSoftwaresSearchArr : props.search !== '' ? 'По запросу поиска ничего не найдено' : ''
                    }
                </div>
            </div>
            <div className="sub-softwares__table">
                <table>
                    <tbody>
                        {subSoftwaresArr}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

let SubSoftwaresClassComponent = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        };
    }

    render() {
        return (
            <SubSoftwares {...this.props} search={this.state.search} changeSearch={search => this.changeSearch(search)} init={(search) => this.init(search)} />
        );
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.softwaresState.softwares) || isEmptyObject(state.softwareCategoriesState.softwareCategories)) {
            let promiseArr = [];

            if (isEmptyObject(state.softwaresState.softwares)) {
                promiseArr.push(softwaresGet());
            }
            if (isEmptyObject(state.softwareCategoriesState.softwareCategories)) {
                promiseArr.push(softwareCategoriesGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'softwares') this.props.softwaresSet(value.data);
                        if (value.config.url === 'softwareCategory') this.props.softwareCategoriesSet(value.data);
                    });
                    this.init('');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            this.init('');
        }
    }

    subSoftwaresGet() {
        return subSoftwaresGet(this.props.match.params.device)
            .then(res => {
                this.props.subSoftWaresSet(res.data);
            })
            .catch(console.log);
    }

    changeSearch(search) {
        this.setState({search});
        this.props.subSoftwaresSearchSet(search);
    }

    init(search) {
        this.subSoftwaresGet()
            .then(() => {
                this.changeSearch(search);
            })
            .catch(console.log);
    }
}

export default withRouter(SubSoftwaresClassComponent);