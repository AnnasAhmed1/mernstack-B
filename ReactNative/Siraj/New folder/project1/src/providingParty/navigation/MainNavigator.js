import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {
    EmptyNotificationPage,
    DriverTripCompleteSreen, 
    ProfileScreen, 
    TaskListIgnorePopup,
    RideListPage, 
    NotificationPage,
    LoginScreen,
    DriverStartTrip,
    DriverCompleteTrip,
    RideDetails,
    DriverTripAccept,
    DriverRegistrationPage,
    EditProfilePage,
    AboutPage,
    OnlineChat,
    DriverIncomePage,
    ServiceScreen
} from '../screens';
import SideMenu from '../../components/SideMenu';
import  { Dimensions } from 'react-native';
var { width, height } = Dimensions.get('window');

//app stack for user end
    export const AppStack = {
        DriverFare: {
            screen: DriverTripCompleteSreen,
            navigationOptions:{
                header: null
            }
        },
        TaskListIgnorePopUp: {
            screen: TaskListIgnorePopup            
        },
        SellerRideList:{
            screen: RideListPage,
            navigationOptions:{
            header:null,
            }
            
        },
        Notifications:{
            screen:NotificationPage,
            navigationOptions:{
                header:null,
                }
        },
        EmptyNotification:{
            screen:EmptyNotificationPage,
            navigationOptions:{
                header:null,
            }
        },
       
        SellerProfile: {
            screen: ProfileScreen,
            navigationOptions:{
                header: null
            }
        },
        ServiceScreen: {
            screen: ServiceScreen,
            navigationOptions:{
                header: null
            }
        },
        
        MyEarning: {
            screen: DriverIncomePage,
            navigationOptions:{
                header: null
            }
        },
        DriverTripAccept: {
            screen: DriverTripAccept,
            navigationOptions:{
                header: null
            }
        },
        RideDetails: {
            screen: RideDetails,
            navigationOptions: {
                header: null
            }
        },
        DriverTripStart: {
            screen:  DriverStartTrip,
            navigationOptions:{
                header: null
            }
        },
        Chat:{
            screen:OnlineChat,
            // navigationOptions:{
            //     header: null
            // }
        },
        DriverTripComplete: {
            screen:  DriverCompleteTrip,
            navigationOptions:{
                header: null
            }
        },
        editUser:{
            screen: EditProfilePage,
            navigationOptions:{
                header: null
            } 
        },
        About: {
            screen: AboutPage,
            navigationOptions:{
                header: null
            }
        },
    }

    //authentication stack for user before login
    export const AuthStack = createStackNavigator({
        Login: {
            screen: LoginScreen,
            navigationOptions:{
                header:null,
            }
        },
        DriverReg: {
            screen:  DriverRegistrationPage,
            navigationOptions:{
                header:null,
            }
        },     
    },{
        initialRouteName: 'Login',
    });

    const DrawerRoutes = {
        'SellerRideList': {
            name: 'SellerRideList',
            screen: createStackNavigator(AppStack, { initialRouteName: 'SellerRideList',headerMode: 'none' })
        },
        'SellerProfile': {
            name: 'SellerProfile',
            screen: createStackNavigator(AppStack, { initialRouteName: 'SellerProfile', headerMode: 'none' })
        },
        
        'Notifications': {
            name: 'Notifications',
            screen: createStackNavigator(AppStack, { initialRouteName: 'Notifications', headerMode: 'none' })
        },
        'DriverTripAccept': {
            name: 'DriverTripAccept',
            screen: createStackNavigator(AppStack, { initialRouteName: 'DriverTripAccept',headerMode: 'none' })
        },
        'About': {
            name: 'About',
            screen: createStackNavigator(AppStack, { initialRouteName: 'About',headerMode: 'none' })
        },
        'MyEarning': {
            name: 'MyEarning',
            screen: createStackNavigator(AppStack, { initialRouteName: 'MyEarning', headerMode: 'none' })
        },
         'ServiceScreen': {
            name: 'ServiceScreen',
            screen: createStackNavigator(AppStack, { initialRouteName: 'ServiceScreen', headerMode: 'none' })
        },
    };


    export const DriverRootNavigator = createDrawerNavigator(
        DrawerRoutes,
        {
        drawerWidth: '90%',
        initialRouteName:'DriverTripAccept',
        contentComponent: SideMenu,
    });

