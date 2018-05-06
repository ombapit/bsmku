import store from 'app/redux/store';
import firebase from 'firebase';

export function setToken() {
	let uid = store.getState().authReducer.user.uid;
    let fcm_token = store.getState().homeReducer.token.fcm_token;

    //update token fcm
    const tokenReq = {
      fcm_token: fcm_token
    };
    firebase.database().ref().child('/users/' + uid).update(tokenReq);
    console.log('user '+ uid + ' got token ' + fcm_token);
}

export function setLocation() {

}