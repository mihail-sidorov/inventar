import { connect } from 'react-redux';
import isEmptyObject from '../../../../functions/isEmptyObject';
import Service from './Service';

let ServiceContainer = (id) => {
    return connect(
        state => {
            let service = {};
            let serviceName = '';

            if (!isEmptyObject(state.accountsState.accounts) && !isEmptyObject(state.accountTypesState.accountTypes) && state.accountsState.accounts[id] !== undefined && state.accountTypesState.accountTypes[state.accountsState.accounts[id].account_type_id] !== undefined) {
                service = state.accountsState.accounts[id];
                serviceName = state.accountTypesState.accountTypes[state.accountsState.accounts[id].account_type_id].account_type;
            }

            return {
                service: service,
                serviceName: serviceName,
            };
        },
        dispatch => ({
            onGoToServiceCard: (props) => {
                props.history.push(`/services/card/${props.service.id}`);
            },
        })
    )(Service);
}

export default ServiceContainer;