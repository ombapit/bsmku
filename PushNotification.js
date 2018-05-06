import React, { Component } from "react";

import { Platform } from 'react-native';
import {Actions} from 'react-native-router-flux';

import {connect} from 'react-redux';
//import { actions as home } from "app/modules/home/index"

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from "react-native-fcm";

//const { setToken } = home;

class PushNotification extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    FCM.requestPermissions();

    FCM.getFCMToken().then(token => {
      let fcm_token = {
        fcm_token: token,
      }
      //this.props.setToken(fcm_token);

      console.log("TOKEN (getFCMToken)", token);
    });

    FCM.getInitialNotification().then(notif => {
      console.log("INITIAL NOTIFICATION", notif)
    });

    this.notificationListner = FCM.on(FCMEvent.Notification, notif => {
      console.log("Notification", notif);
      if(notif.local_notification){
        console.log('local notif');
        if(notif.targetScreen === 'inbox'){
          setTimeout(()=>{
            Actions.Profile();
          }, 500)
        }
        return;
      }
      if(notif.opened_from_tray){
        return;
      }

      if(Platform.OS ==='ios'){
              //optional
              //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
              //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
              //notif._notificationType is available for iOS platfrom
              switch(notif._notificationType){
                case NotificationType.Remote:
                  notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                  break;
                case NotificationType.NotificationResponse:
                  notif.finish();
                  break;
                case NotificationType.WillPresent:
                  notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                  break;
              }
            }
      this.showLocalNotification(notif);
    });

    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
      console.log("TOKEN (refreshUnsubscribe)", token);
    });
  }

  showLocalNotification(notif) {
    let fcm = JSON.parse(notif.custom_notification);
    console.log(fcm);
    FCM.presentLocalNotification({
      body: fcm.body,
      priority: "high",
      title: fcm.title,
      sound: "default", 
      "large_icon": "ic_launcher",// Android only
      icon: "ic_launcher",
      "show_in_foreground" :true, /* notification when app is in foreground (local & remote)*/
      "targetScreen": 'inbox',
      vibrate: 300, /* Android only default: 300, no vibration if you pass null*/
      "lights": true, // Android only, LED blinking (default false)
    });
  }

  componentWillUnmount() {
    this.notificationListner.remove();
    this.refreshTokenListener.remove();
  }


  render() {
    return null;
  }
}

//export default connect(null, { setToken })(PushNotification);
export default PushNotification;