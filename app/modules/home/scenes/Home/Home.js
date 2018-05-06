import React from 'react';
var { View,Alert,KeyboardAvoidingView } = require('react-native');

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as home, theme } from "../../../home/index"
import { actions as auth } from "app/modules/auth/index"

const { signOut } = auth;

import {Button, Icon } from 'react-native-elements';

//const { setLocation } = home;

const { color } = theme;

class Home extends React.Component {
	constructor() {
        super();

        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);

        this.onSignOut = this.onSignOut.bind(this);
    }

	componentDidMount() {
	    // this.watchID = navigator.geolocation.watchPosition((position) => {
	    //   // Create the object to update this.state.mapRegion through the onRegionChange function
	    //   let region = {
	    //     latitude:       position.coords.latitude,
	    //     longitude:      position.coords.longitude,
	    //     latitudeDelta:  0.00922*1.5,
	    //     longitudeDelta: 0.00421*1.5
	    //   }
	    //   this.onRegionChange(region);
	    // },
	    // //(error) => alert(error.message),
	    // );
	}

	// onRegionChange(region) {
	// 	this.props.setLocation(region, this.onSuccess, this.onError);
	// }

	// onSuccess() {
 //    	//this.setState({visible: false});
 //    }

 //    onError(error) {
 //        //this.setState({visible: false});
 //        //alert(error.message);
 //    }

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onSuccess() {
        //const topic = '/topics/list'
        //FCM.unsubscribeFromTopic(topic); // unsubscribe to topic

        Actions.reset("Auth")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	}

    render() {
        return (
        	<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            	<View style={styles.topmenu}>
            		<Icon
					  reverse
					  name='ios-home'
					  type='ionicon'
					  color='#005A37'
					/>
	            	<Icon
					  reverse
					  name='ios-power'
					  type='ionicon'
					  color='#005A37'
					  onPress={() => this.onSignOut()}
					/>
				</View>
	        </KeyboardAvoidingView>
        );
    }
}

//export default connect(null, { setLocation })(Home);
export default connect(null, { signOut })(Home);