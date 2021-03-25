import { connect } from 'react-redux';
import { eventAccept, eventReject, makeShortEventsActionCreator } from '../../../../redux/eventsPageReducer';
import { updateEventsAfterAcceptOrRejectActionCreator } from '../../../../redux/eventsReducer';
import Event from './Event';

let EventContainer = (id) => {
    return connect(
        state => ({
            event: state.eventsPageState.shortEvents[id],
            users: state.usersState.users,
            devices: state.devicesState.devices,
            brands: state.brandsState.brands,
            userId: state.authState.userId,
        }),
        dispatch => ({
            actionEvent: (id, type) => {
                (type === 'accept' ? eventAccept(id) : eventReject(id))
                    .then(res => {
                        dispatch(updateEventsAfterAcceptOrRejectActionCreator([res.data]));
                        dispatch(makeShortEventsActionCreator());
                    })
                    .catch(err => console.log(err));
            },
            actionGroup: (ids, type) => {
                let promiseArr = [];
                ids.forEach(id => {
                    promiseArr.push(type === 'accept' ? eventAccept(id) : eventReject(id));
                });
                Promise.allSettled(promiseArr)
                    .then(res => {
                        let events = [];
                        res.forEach(el => {
                            if (el.status === 'fulfilled') {
                                events.push(el.value.data);
                            }
                        });
                        dispatch(updateEventsAfterAcceptOrRejectActionCreator(events));
                        dispatch(makeShortEventsActionCreator());
                    })
                    .catch(err => console.log(err));
            },
            goToEventCard: (id, history) => {
                history.push(`events/card/${id}`);
            },
        })
    )(Event);
}

export default EventContainer;