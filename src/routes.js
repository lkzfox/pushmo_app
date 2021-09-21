import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator, HeaderBackButton } from 'react-navigation';

import Login from './pages/Login';
import Register from './pages/Register';
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
import PacientGraph from './pages/PacientGraph';
import PacientPressureUlcerPictures from './pages/PacientPressureUlcerPictures';
import PressureUlcerPicturesList from './pages/PressureUlcerPicturesList';
import EntryInfo from './pages/EntryInfo';
import { Image } from 'react-native';

import register_pacient from './assets/images/register_pacient.png'
import background_pacient from './assets/images/background_pacient.png'
import pressure_ulcer_pacient from './assets/images/pressure_ulcer_pacient.png'
import { marginMd } from './styles/sizes';
import HeaderGradient from './components/HeaderGradient'

const PacientInfoNavigationOptions = ({ navigation }) => ({
    headerLeft: <HeaderBackButton onPress={() => navigation.popToTop()} tintColor='#fff'/>,
    title: 'Paciente',
})

const PacientRegisterNavigationOptions = ({ navigation }) => ({
    title: 'Cadastro de Paciente',
    headerRight: <Image source={ register_pacient } style={{ width: 50, height: 50, marginRight: marginMd }} />,
})

const PacientBackgroundNavigationOptions = ({ navigation }) => ({
    title: 'Histórico Clínico',
    headerRight: <Image source={ background_pacient } style={{ width: 50, height: 50, marginRight: marginMd }} />,
})

const PacientPressureUlcerNavigationOptions = ({ navigation }) => ({
    title: 'Cadastro de Lesão',
    headerRight: <Image source={ pressure_ulcer_pacient } style={{ width: 50, height: 50, marginRight: marginMd }} />,
})


const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        LoggedRoutes: createStackNavigator({
            PacientsList,
            PacientInfo: {
                screen: PacientInfo,
                navigationOptions: PacientInfoNavigationOptions
            },
            PacientRegister: {
                screen: PacientRegister,
                navigationOptions: PacientRegisterNavigationOptions
            },
            PacientBackground: {
                screen: PacientBackground,
                navigationOptions: PacientBackgroundNavigationOptions
            },
            PacientPressureUlcer,
            PressureUlcerRegister: {
                screen: PressureUlcerRegister,
                navigationOptions: PacientPressureUlcerNavigationOptions
            },
            Camera,
            PushEntriesList,
            PushEntryRegister,
            SelectPushAdditionalInfo,
            PushEntryAdditionalInfoList,
            PushOtherInformations,
            PacientGraph,
            PacientPressureUlcerPictures,
            PressureUlcerPicturesList,
            EntryInfo
        },
        {
            defaultNavigationOptions: {    
                header: props => <HeaderGradient {...props}/>,
                headerStyle: {
                    backgroundColor: 'transparent',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
            }
        }),
        Register
    })
);

export default Routes;