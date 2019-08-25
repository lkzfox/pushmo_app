import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator, HeaderBackButton } from 'react-navigation';

import Login from './pages/Login';
import PacientsList from './pages/PacientsList';
import PacientRegister from './pages/PacientRegister';
import PacientInfo from './pages/PacientInfo';
import PacientBackground from './pages/PacientBackground';

const PacientInfoNavigationOptions = ({ navigation }) => ({
    headerLeft: <HeaderBackButton onPress={() => navigation.popToTop()} />,
    title: 'Menu do Paciente'
})


const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        LoggedRoutes: createStackNavigator({
            PacientsList,
            PacientRegister,
            PacientInfo: {
                screen: PacientInfo,
                navigationOptions: PacientInfoNavigationOptions
            },
            PacientBackground,
        })
    })
);

export default Routes;