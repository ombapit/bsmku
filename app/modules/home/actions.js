import * as t from './actionTypes';

//import { AsyncStorage } from 'react-native';

export function setToken(data) {
    return (dispatch) => {
        dispatch({type: t.SET_TOKEN, data: data});
    };
}

export function setLocation(data, successCB, errorCB) {
    return (dispatch) => {
        dispatch({type: t.SET_LOCATION, data: data});
        successCB();
    };
}