import React from 'react';
import isEmptyObject from '../../../functions/isEmptyObject';
import { locationsGet } from '../../../redux/locationsReducer';
import LocationContainer from './Location/LocationContainer';

let Locations = (props) => {
    let locationsArr = [];

    for (let id in props.locations) {
        let Location = LocationContainer(id);
        locationsArr.push(<Location key={id} />);
    }

    return (
        <div className="locations">
            <table border="1">
                <thead>
                    <tr>
                        <th>Местонахождение</th>
                    </tr>
                </thead>
                <tbody>
                    {locationsArr}
                </tbody>
            </table>
        </div>
    );
}

let LocationsClassComponent = class extends React.Component {
    render() {
        return <Locations {...this.props} />;
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.locationsState.locations)) {
            locationsGet()
                .then((res) => {
                    this.props.locationsSet(res.data);
                    this.props.shortLocationsSet();
                });
        }
        else {
            this.props.shortLocationsSet();
        }
    }
}

export default LocationsClassComponent;