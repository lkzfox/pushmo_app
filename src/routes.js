import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator, HeaderBackButton } from 'react-navigation';

import Login from './pages/Login';
import PacientsList from './pages/PacientsList';
import PacientRegister from './pages/PacientRegister';
import PacientInfo from './pages/PacientInfo';
import PacientBackground from './pages/PacientBackground';
import PacientPressureUlcer from './pages/PacientPressureUlcer';
import PressureUlcerRegister from './pages/PressureUlcerRegister';
import Camera from './pages/Camera';
import PushEntriesList from './pages/PushEntriesList';
import PushEntryRegister from './pages/PushEntryRegister';
import PushEntryAdditionalInfoList from './pages/PushEntryAdditionalInfoList';
import SelectPushAdditionalInfo from './pages/SelectPushAdditionalInfo';
import PushOtherInformations from './pages/PushOtherInformations';

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
            PacientPressureUlcer,
            PressureUlcerRegister,
            Camera,
            PushEntriesList,
            PushEntryRegister,
            SelectPushAdditionalInfo,
            PushEntryAdditionalInfoList,
            PushOtherInformations,
        })
    })
);

export default Routes;