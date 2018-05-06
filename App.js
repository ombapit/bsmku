console.ignoredYellowBox = [
    'Setting a timer'
];

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'

import Router from './app/config/routes'
import store from './app/redux/store';

import PushNotification from "./PushNotification";

export default class App extends Component {
    constructor() {
        super();
    }

    componentWillMount(){
        persistor = persistStore(store);
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <PushNotification />
                    <Router/>
                </PersistGate>
            </Provider>
        );
    }
}