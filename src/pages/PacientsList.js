import React, { Component } from 'react';
import { View, FlatList, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux';
import * as actions from '../actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ListItem, SearchBar } from 'react-native-elements';
import API from '../services/api';
import FMT from '../helpers/formater';
import Footer from '../components/Footer';
import { buttonIcon } from '../styles/sizes';
import { fontColor, pacientListIconColor, whiteIceColor, buttonColor, primaryButtonStartColor } from '../styles/colors';
import MessageYN from '../components/MessageYN';
import background_image from '../assets/images/app_background.png';

class PacientsList extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        pacientsList: [],
        search: '',
        timeout: null,
        isLoading: false,
        isVisible: true,
        messageLogoutVisible: false
    }

    componentDidMount() {
        this.handleSearch();
    }

    handleChange = search => {
        this.setState({ search });
        clearTimeout(this.state.timeout);
        this.setState({
            timeout: setTimeout(() => {
                this.handleSearch()
                this.setState({ isLoading: true });
            }, 1300)
        })
    }

    handleSearch = () => {
        API.get('/pacients?name=' + this.state.search + "&cpf=" + this.state.search)
        .then(res => {
            this.setState({
                pacientsList: res.data,
                isLoading: false,
            });
        })
        .catch(err => { 
            this.setState({search: JSON.stringify(err)})
            console.log( JSON.stringify(err))
        }
        );   
    }

    handleRegister = () => {
        this.props.navigation.navigate('PacientRegister');
    }

    handleSelectPacient = pacient => {        
        this.props.selectPacient(pacient);
        this.props.navigation.navigate('PacientInfo');
    }

    onPress = () => {
        this.setState({messageLogoutVisible: true})
    }

    renderItem = ({ item }) => {
        return (
            <ListItem
                title={item.name}
                subtitle={FMT.formatCPF(item.cpf)}
                leftIcon={(<Icon name="person" size={buttonIcon} color={pacientListIconColor} />)}
                chevron={true}
                bottomDivider={true}
                onPress={() => this.handleSelectPacient(item)}
            />
        )
    }

    yesFunction = async () => {
        this.setState({messageLogoutVisible: false})
        
        await AsyncStorage.removeItem("@pushmo:user");
        await AsyncStorage.removeItem("@pushmo:token");
        this.props.navigation.navigate('Login')
        
    }

    noFunction = () => {
        this.setState({messageLogoutVisible: false})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: 58 }}>
                    <ImageBackground source={background_image} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', }}>
                        <View style={styles.container}>
                            <SearchBar
                                placeholder="Buscar nome/cpf..."
                                onChangeText={this.handleChange}
                                value={this.state.search}
                                showLoading={this.state.isLoading}
                                lightTheme={true}
                                loadingProps={{
                                    color: fontColor,
                                    size: buttonIcon
                                }}
                                inputStyle={{color: fontColor}}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                            />
                        </View>
                        <View>
                            <TouchableOpacity onPress={this.onPress} style={{ display: 'flex', alignContent: 'center', padding: 2 }}>
                                <Icon
                                    name='exit-to-app'
                                    size={50}
                                    style={{ justifyContent: 'center' }}
                                    color={'white'}
                                    ref={this.onRef} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.list}>
                    <FlatList
                        data={this.state.pacientsList}
                        keyExtractor={pacient => pacient.id.toString()}
                        renderItem={this.renderItem}
                    />
                </View>
                <Footer title="Adicionar Paciente" iconName="add-circle-outline" onPress={this.handleRegister} />
                <MessageYN 
                    isVisible={this.state.messageLogoutVisible} 
                    title="Sair" 
                    message="Deseja realmente sair do aplicativo?" 
                    yesFunction={this.yesFunction} 
                    noFunction={this.noFunction} 
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'transparent'
    },
    list: {
        flex: 1,
        alignSelf: "stretch"
    }
})

export default connect(null, actions)(PacientsList);