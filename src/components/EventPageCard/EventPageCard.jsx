import React from 'react';
import { Route, withRouter } from 'react-router';
import isEmptyObject from '../../functions/isEmptyObject';
import { eventsGet } from '../../redux/eventsReducer';
import InnerPageContainer from '../InnerPage/InnerPageContainer';
import EventPageCardGivenReturnDeviceContainer from './EventPageCardGivenReturnDevice/EventPageCardGivenReturnDeviceContainer';

let EventPageCard = (props) => {
    let event = props.events[props.match.params.eventId];
    let eventByType;

    if (event !== undefined) {
        switch (props.events[props.match.params.eventId].name) {
            case 'givenDevice':
                eventByType = <EventPageCardGivenReturnDeviceContainer eventId={props.match.params.eventId} />;
                break;
            case 'returnDevice':
                eventByType = <EventPageCardGivenReturnDeviceContainer eventId={props.match.params.eventId} />;
                break;
            default:
                break;
        }
    }
    return (
        <div className="event-page-card">
            <div className="event-page-card__wrapper section-2">
                <Route path="/:page/card" render={() => (
                    <InnerPageContainer>
                        {eventByType}
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

let EventPageCardClassComponent = class extends React.Component {
    render() {
        return (
            <EventPageCard {...this.props} />
        );
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.eventsState.events)) {
            let promiseArr = [];

            if (isEmptyObject(state.eventsState.events)) {
                promiseArr.push(eventsGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'events') this.props.eventsSet(value.data);
                    });
                })
                .catch(err => console.log(err));
        }
    }
}

export default withRouter(EventPageCardClassComponent);