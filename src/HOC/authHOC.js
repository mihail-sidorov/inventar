import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

let authHOC = (Component) => {
    let ComponentContainer = (props) => {
        if (!props.isAuth) {
            return <Redirect to="/login" />
        }

        return (
            <Component {...props} />
        );
    }

    return connect(
        state => ({
            isAuth: state.authState.isAuth,
        }),
        dispatch => ({

        })
    )(ComponentContainer);
}

export default authHOC;