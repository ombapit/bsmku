import React from 'react';
import {
    View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import FCM from "react-native-fcm";
import { actions as auth } from "../../index"
const { createUser } = auth;
import { setToken } from 'app/utils/functions';

import Form from "../../components/Form"
import styles from "./styles"

import Spinner from 'react-native-loading-spinner-overlay';
const fields = [
    {
        key: 'first_name',
        label: "Nama Depan",
        placeholder: "Nama Depan",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text",
        required: true
    },
    {
        key: 'last_name',
        label: "Nama Belakang",
        placeholder: "Nama Belakang",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text",
        required: false
    },
    {
        key: 'hp',
        label: "No HP",
        placeholder: "No HP",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text",
        required: true
    }
];

const error = {
    general: "",
    username: ""
}

class CompleteProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error,
            visible: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onSubmit(data) {
        this.setState({visible: true});
        this.setState({error: error}); //clear out error messages

        //attach user id
        const { user } = this.props;
        data['uid'] = user.uid;

        this.props.createUser(data, this.onSuccess, this.onError)
    }

    onSuccess() {
        this.setState({visible: false});

        // const topic = '/topics/list'
        // FCM.subscribeToTopic(topic); // subscribe to topic
        //setToken();
        Actions.Main()
    }

    onError(error) {
        this.setState({visible: false});
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }

        this.setState({error: errObj});
    }

    render() {
        return (
            <View style={styles.container}>
                <Form fields={fields}
                    showLabel={false}
                    onSubmit={this.onSubmit}
                    buttonTitle={"CONTINUE"}
                    error={this.state.error}/>

                <Spinner
                    color='#03473A'
                    visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#03473A'}} />
                </View>
        );
    }
}

export default connect(null, { createUser })(CompleteProfile);
