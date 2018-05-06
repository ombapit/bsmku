import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

import {Button} from 'react-native-elements'
import {Actions,ActionConst} from 'react-native-router-flux'
import {connect} from 'react-redux';
import { setToken } from 'app/utils/functions';

import { actions as auth, constants as c } from "../../index"

import styles from "./styles"
import Spinner from 'react-native-loading-spinner-overlay';

import Form from "app/modules/auth/components/Form";

const {login} = auth;

const fields = [
    {
        key: 'email',
        label: "Email Address",
        placeholder: "Email Address",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "email",
        required: false
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
    }
];

const error = {
    general: "",
    email: "",
    password: ""
}

class Welcome extends React.Component {
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
        this.setState({error: error}); //clear out error messages

        this.props.login(data, this.onSuccess, this.onError)
    }

    onSuccess({ exists, user}) {
        this.setState({visible: false});
        if (exists) {
            //set token
            //setToken();
            Actions.Main()
        } else {
            Actions.CompleteProfile({ user })
        }
    }

    onError(error) {
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
                <View style={styles.topContainer}>
                    <Image style={styles.image} source={require("../../../../assets/images/splash.png")}/>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={[styles.buttonContainer]}>
                        <Form fields={fields}
                        showLabel={false}
                        onSubmit={this.onSubmit}
                        buttonTitle={"LOGIN"}
                        error={this.state.error}
                        />
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.bottomText}>
                            Dont have an account?
                        </Text>

                        <TouchableOpacity onPress={() => Actions.Register()}>
                            <Text style={styles.signInText}>
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Spinner
                    color='#03473A'
                    visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#03473A'}} />
            </View>
                );
            }
        }

export default connect(null, { login })(Welcome);
