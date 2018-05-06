//import { AsyncStorage } from 'react-native';

import * as t from './actionTypes';

let initialState = { loc: null, token: null };

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.SET_LOCATION:
            const loc = action.data;

            state = Object.assign({}, state, { loc: loc });

            return state;
        case t.SET_TOKEN:
            const token = action.data;

            state = Object.assign({}, state, { token: token });

            return state;
            
        default:
            return state;
    }
};

export default homeReducer;