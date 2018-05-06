import React from 'react';
import { Scene, Router, Actions, ActionConst, Stack} from 'react-native-router-flux';
import FCM from "react-native-fcm";

//Splash Component
import Splash from '../components/Splash';

//Authentication Scenes
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';
import Login from '../modules/auth/scenes/Login';
import ForgotPassword from '../modules/auth/scenes/ForgotPassword';
import Home from '../modules/home/scenes/Home';
import Profile from '../modules/home/scenes/Profile';

//Import Store, actions
import store from '../redux/store'
import { checkLoginStatus } from "../modules/auth/actions";

import { color, navTitleStyle } from "../styles/theme";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false
        }
    }

    componentDidMount() {
        let _this = this;
        store.dispatch(checkLoginStatus((isLoggedIn) => {
            _this.setState({isReady: true, isLoggedIn});

            FCM.getInitialNotification().then(notif => {
                  if(notif && notif.targetScreen === 'inbox'){
                    setTimeout(()=>{
                      Actions.Profile();
                    }, 500)
                  }
            });
        }));
    }

    render() {
        if (!this.state.isReady)
            return <Splash/>

        const onBackAndroid = () => {
            let scene = Actions.currentScene;
            if (scene == 'Home') {
                return true; // Return true to stay, or return false to exit the app.
            } else if (scene == 'Welcome') {
                return false;
            }else {
                Actions.pop();
                return true;
            }
        };
        return (
            <Router
            backAndroidHandler={onBackAndroid}>
            <Scene key="root" hideNavBar
            navigationBarStyle={{backgroundColor: color.primary}}
            titleStyle={navTitleStyle}
            tintColor='white'>
                <Stack key="Auth" initial={!this.state.isLoggedIn}>
                    <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
                    <Scene key="Register" component={Register} title="Register"/>
                    <Scene key="CompleteProfile" component={CompleteProfile} title="Complete Profile"/>
                    <Scene key="Login" component={Login} title="Login"/>
                    <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password"/>
                </Stack>

                <Stack key="Main" initial={this.state.isLoggedIn}>
                    <Scene key="Home" component={Home} title="BSMKu" initial={true} type='replace'/>
                    <Scene
                    back
                    navigationBarStyle={{backgroundColor: color.primary}}
                    titleStyle={navTitleStyle}
                    backButtonTintColor={color.white}
                    key="Profile" component={Profile} title="Profile"/>
                </Stack>
            </Scene>
            </Router>
            )
    }
}
