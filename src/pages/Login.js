import React, { Component } from 'react';
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Text, Keyboard, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Input } from 'react-native-elements';
import API from '../services/api';
import Message from '../components/Message';
import { padding, paddingMd, paddingLg } from '../styles/sizes';
import { whiteIceColor, blueTextColor } from '../styles/colors';


import background_image from '../assets/images/app_background.png';
import logo_image from '../assets/images/app_logo.png';
import { ScrollView } from 'react-native-gesture-handler';

export default class Login extends Component{
    state = {
        email: "",
        isVisible: false
    }

    async componentDidMount () {
        const user = await AsyncStorage.getItem("@pushmo:user");
        const token = await AsyncStorage.getItem("@pushmo:token");
        
        if (user && token) {
            API.defaults.headers['x-auth-token'] = token
            this.props.navigation.navigate('LoggedRoutes')
        }
    }
    
    handleChange = (prop, val) => {
        this.setState({[prop]: val})
    }

    handleLogin = async () => {
        const { email, password } = this.state;

        if (!email || !password) return;

        
        this.setState({ 
            isVisible: true,
            loading: true,
            message: "Aguarde..."
        });

        API.post('/auth/login', this.state)
        .then(async res => {
            await AsyncStorage.setItem("@pushmo:user", this.state.email);
            await AsyncStorage.setItem("@pushmo:token", res.headers['x-auth-token']);
    
            this.setState({ 
                isVisible: false,
                loading: false,
                message: ""
            });
            this.props.navigation.navigate('LoggedRoutes');
        })
        .catch(() => {
            
            this.setState({ 
                isVisible: true,
                loading: false,
                message: "Email/Senha não encontrado"
            });

        })

    }
    
    handleRegister = () => {
        this.props.navigation.navigate('Register');
    }

    closeMessage = () => {
        console.log('acll');
        this.setState({ isVisible: false });
    }

    render() {
        return (
            <ImageBackground source={background_image} style={{ width: '100%', height: '100%' }}>
                <ScrollView style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image source={logo_image} />
                        <Text style={styles.title}>PUSHMo</Text>
                    </View>
                    <View style={styles.center}>
                        <Input placeholder='Ex.: email@email.com.br'
                            leftIcon={ <Icon name='mail-outline' size={24} color='black'/> }
                            onChangeText={val => this.handleChange('email', val)} 
                            value={this.state.email}
                            keyboardType="email-address"
                            onSubmitEditing={() => this.password_field.focus()}
                        />
                        <Input placeholder='senha'
                            leftIcon={ <Icon name='lock' size={24} color='black'/> }
                            onChangeText={val => this.handleChange('password', val)} 
                            value={this.state.password}
                            style={styles.input}
                            secureTextEntry
                            onSubmitEditing={this.handleLogin}
                            ref={e => this.password_field = e}
                        />
                        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                            <Text style={{textAlign: "center", color: "#FFF", fontWeight: "bold", fontSize: 18}}>ENTRAR</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity onPress={this.handleRegister} style={styles.registerContainer} >
                        <Text style={styles.registerText}>Não é cadastrado ainda?</Text>
                        <Text style={styles.registerText}>Registre-se</Text>
                    </TouchableOpacity>
                    <Message 
                        onButtonPress={this.closeMessage} 
                        isVisible={this.state.isVisible} 
                        message={this.state.message}
                        loading={this.state.loading}
                        showButton={true}
                    />
                </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: padding
    },
    input: {
        borderWidth: 1,
        alignSelf: "stretch",
        marginVertical: 16,
        borderColor: "#000"
    },
    button: {
        backgroundColor: "#00008E",
        alignSelf: "stretch",
        textAlign: "center",
        marginVertical: 16,
        padding: 16,
        borderRadius: 15,
        elevation: 2
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 30,
        marginTop: 10
    },
    registerText: {
        textAlign: "center", 
        color: blueTextColor, 
        fontWeight: "bold", 
        fontSize: 18, 
    },
    registerContainer: {
        margin: padding,
        marginBottom: 50,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderColor: '#cececeaa',
        paddingVertical: 20,
        alignContent: 'flex-end'
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: paddingLg,
        paddingBottom: padding,
        backgroundColor: whiteIceColor,
        marginBottom: 10,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        ...this.container,
        elevation: 2
    }
})