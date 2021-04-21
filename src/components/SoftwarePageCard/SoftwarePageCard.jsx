import React from 'react';
import { Route, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import isEmptyObject from '../../functions/isEmptyObject';
import { brandsGet } from '../../redux/brandsReducer';
import { categoriesGet } from '../../redux/categoriesReducer';
import { devicesGet } from '../../redux/devicesReducer';
import { softwareCategoriesGet } from '../../redux/softwareCategoriesReducer';
import { softwareDevicesGet, softwaresGet } from '../../redux/softwaresReducer';
import InnerPageContainer from '../InnerPage/InnerPageContainer';

let SoftwarePageCard = (props) => {
    let softwareDevicesArr = [];

    for (let id in props.softwareDevices) {
        softwareDevicesArr.push(
            <tr
                key={id}
                onClick={() => {
                    props.history.push(`/devices/card/${id}`);
                }}
            >
                <td>{props.categories[props.softwareDevices[id].category_id]?.category}</td>
                <td>{props.brands[props.softwareDevices[id].brand_id]?.brand}</td>
                <td>{props.softwareDevices[id].model}</td>
                <td>{props.softwareDevices[id].inv_number}</td>
            </tr>
        );
    }

    return (
        <div className="software-page-card">
            <div className="software-page-card__wrapper section-2">
                <Route exact path="/:page/card/:softwareId" render={() => (
                    <InnerPageContainer>
                        <NavLink className="software-page-card__back-to-softwares btn" to="/softwares">Вернуться к списку ПО</NavLink>
                        <div className="software-page-card__border">
                            <div className="software-page-card__title">Карточка ПО</div>
                            <div className="software-page-card__content">
                                <div className="software-page-card__content-table">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Наименование</td>
                                                <td>{props.softwareCategories[props.softwares[props.match.params.softwareId]?.software_category_id]?.name}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="software-page-card__btns">
                                <button className="software-page-card__btn btn" onClick={() => {
                                    props.history.push(`/softwares/${props.match.params.softwareId}`);
                                }}>Редактировать</button>
                            </div>
                        </div>
                        {
                            softwareDevicesArr.length > 0 &&
                            <div className="software-page-card__border">
                                <div className="software-page-card__title">Прикрепленное оборудование</div>
                                <div className="software-page-card__content">
                                    <div className="software-page-card__content-table">
                                        <table>
                                            <tbody>
                                                {softwareDevicesArr}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
};

let SoftwarePageCardClassComponent = class extends React.Component {
    render() {
        return (
            <SoftwarePageCard {...this.props} />
        );
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.softwaresState.softwares) || isEmptyObject(state.softwareCategoriesState.softwareCategories)
        || isEmptyObject(state.devicesState.devices)
        || isEmptyObject(state.categoriesState.categories)
        || isEmptyObject(state.brandsState.brands)) {
            let promiseArr = [];

            if (isEmptyObject(state.softwaresState.softwares)) {
                promiseArr.push(softwaresGet());
            }
            if (isEmptyObject(state.softwareCategoriesState.softwareCategories)) {
                promiseArr.push(softwareCategoriesGet());
            }
            if (isEmptyObject(state.devicesState.devices)) {
                promiseArr.push(devicesGet());
            }
            if (isEmptyObject(state.categoriesState.categories)) {
                promiseArr.push(categoriesGet());
            }
            if (isEmptyObject(state.brandsState.brands)) {
                promiseArr.push(brandsGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'softwares') this.props.onSoftwaresGet(value.data, this.props);
                        if (value.config.url === 'softwareCategory') this.props.onSoftwareCategoriesGet(value.data, this.props);
                        if (value.config.url === 'devices') this.props.onDevicesGet(value.data, this.props);
                        if (value.config.url === 'categories') this.props.onCategoriesGet(value.data, this.props);
                        if (value.config.url === 'brands') this.props.onBrandsGet(value.data, this.props);
                    });
                    this.softwareDevicesSet(this.props.match.params.softwareId);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            this.softwareDevicesSet(this.props.match.params.softwareId);
        }
    }

    softwareDevicesSet(id) {
        softwareDevicesGet(id)
            .then(res => {
                this.props.softwareDevicesSet(res.data);
            })
            .catch(console.log);
    }
}

export default withRouter(SoftwarePageCardClassComponent);