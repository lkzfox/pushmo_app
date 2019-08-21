import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import PacientsList from './pages/PacientsList';
import PacientRegister from './pages/PacientRegister';
import PacientInfo from './pages/PacientInfo';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        LoggedRoutes: createStackNavigator({
            PacientsList,
            PacientRegister,
            PacientInfo,
        })
    })
);

export default Routes;