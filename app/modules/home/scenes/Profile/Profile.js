import React from 'react';
var { View } = require('react-native');

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"

const { color } = theme;

class Profile extends React.Component {
    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

export default connect(null, {  })(Profile);