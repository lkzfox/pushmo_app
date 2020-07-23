import React, { Component } from 'react';
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Text, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { padding, paddingLg } from '../styles/sizes';
import { Input } from 'react-native-elements';
import API from '../services/api';
import Message from '../components/Message';

export default class Register extends Component{
    state = {
        email: "",
        name: "",
        password: "",
        passwordConfirmation: "",
        isVisible: false
    }
    
    handleChange = (prop, val) => {
        this.setState({[prop]: val})
    }

    handleRegister = () => {
        const { email, password, passwordConfirmation, name } = this.state;

        if (!email || !password || !name || !passwordConfirmation) return;

        if (password != passwordConfirmation) {
            this.showMessage("As senhas não conferem",
            () => {
                this.setState({ isVisible: false })
            })
            return;
        }

        this.setState({ 
            isVisible: true,
            loading: true,
            message: "Aguarde..."
        });

        API.post('/auth/register', this.state)
        .then(async res => {
            this.showMessage("Registro efetuado, você já pode fazer o login!",
            () => {
                this.props.navigation.navigate('Login');
            })
        })
        .catch(() => {
            
            this.setState({ 
                isVisible: true,
                loading: false,
                message: ""
            });

        })
    }

    showMessage = (message, messageCB) => {
        this.setState({ 
            isVisible: true,
            loading: false,
            message,
            messageCB
        });
    }

    handleBack = () => {
        this.props.navigation.navigate('Login');
    }

    closeMessage = () => {
        console.log('acll');
        this.setState({ isVisible: false });
    }

    render() {
        return (
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.center}>
                        <Text style={styles.title}>Cadastro</Text>
                        <Input placeholder='Seu nome'
                            leftIcon={ <Icon name='person-outline' size={24} color='black'/> }
                            onChangeText={val => this.handleChange('name', val)} 
                            value={this.state.name}
                        />
                        <Input placeholder='Ex.: email@email.com.br'
                            leftIcon={ <Icon name='mail-outline' size={24} color='black'/> }
                            onChangeText={val => this.handleChange('email', val)} 
                            value={this.state.email}
                        />
                        <Input placeholder='senha'
                            leftIcon={ <Icon name='lock' size={24} color='black'/> }
                            onChangeText={val => this.handleChange('password', val)} 
                            value={this.state.password}
                            style={styles.input}
                            secureTextEntry
                        />
                        <Input placeholder='confirmar senha'
                            leftIcon={ <Icon name='lock' size={24} color='black'/> }
                            onChangeText={val => this.handleChange('passwordConfirmation', val)} 
                            value={this.state.passwordConfirmation}
                            style={styles.input}
                            secureTextEntry
                        />
                        <TouchableOpacity style={styles.button} onPress={this.handleRegister}>
                            <Text style={{textAlign: "center", color: "#FFF", fontWeight: "bold", fontSize: 18}}>Cadastrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{padding: paddingLg, marginTop: 16}} onPress={this.handleBack}>
                            <Text style={{textAlign: "center", color: "#FFF", fontWeight: "bold", fontSize: 14}}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <Message 
                        onButtonPress={this.state.messageCB} 
                        isVisible={this.state.isVisible} 
                        message={this.state.message}
                        loading={this.state.loading}
                        showButton={true}
                    />
                </KeyboardAvoidingView>
                
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2ecc71"
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
        backgroundColor: "#27ae60",
        borderColor: "#278e60",
        borderWidth: 2,
        alignSelf: "stretch",
        textAlign: "center",
        marginVertical: 16,
        padding: 16
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 30
    },
    registerText: {
        textAlign: "center", 
        color: "#33F", 
        fontWeight: "bold", 
        fontSize: 18, 
    },
    registerContainer: {
        margin: padding,
        marginBottom: 50,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderColor: '#cececeaa',
        paddingVertical: 20
    }
})