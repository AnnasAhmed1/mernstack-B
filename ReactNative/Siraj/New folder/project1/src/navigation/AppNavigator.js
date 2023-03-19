import { createSwitchNavigator,createAppContainer } from 'react-navigation';
import { AuthStack, RootNavigator } from './MainNavigator';
import { AuthLoadingScreen } from '../screens/AuthLoadingScreen';
import { DriverRootNavigator  } from '../providingParty/navigation/MainNavigator';
const AppNavigator= createSwitchNavigator({
        // You could add another route here for authentication.
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        AuthLoading: AuthLoadingScreen,
        Auth: AuthStack,
        Root: RootNavigator,
        DriverRoot: DriverRootNavigator
        },
        {
            initialRouteName: 'AuthLoading'
        }
    );
    const AppContainer = createAppContainer(AppNavigator);
    export default AppContainer;
  