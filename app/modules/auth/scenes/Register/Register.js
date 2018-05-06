import React from 'react';
import {
    View,TextInput
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { actions as auth } from "../../index"
const { register } = auth;

import Form from "../../components/Form"
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import styles from "./styles"

import Spinner from 'react-native-loading-spinner-overlay';

const fields = [
    {
        key: 'email',
        label: "Email Address",
        placeholder: "Email Address",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "email",
        required: true
    },
    {
        key: 'password',
        label: "Password",
        placeholder: "Password",
        autoFocus: false,
        secureTextEntry: true,
        value: "",
        type: "password",
        required: true
    },
    {
        key: 'confirm_password',
        label: "Confirm Password",
        placeholder: "Confirm Password",
        autoFocus: false,
        secureTextEntry: true,
        value: "",
        type: "confirm_password",
        required: true
    }
];

const error = {
    general: "",
    email: "",
    password: "",
    confirm_password: ""
}

class Register extends React.Component {
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

        this.props.register(data, this.onSuccess, this.onError)
    }

    onSuccess(user) {
        this.setState({visible: false});
        Actions.CompleteProfile({ user })
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
                buttonTitle={"SIGN UP"}
                error={this.state.error}/>

                <Spinner
                    color='#03473A'
                    visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#03473A'}} />
            </View>
        );
    }
}

export default connect(null, { register })(Register);
