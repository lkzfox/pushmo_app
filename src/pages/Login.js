import React, { Component } from 'react';
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Text, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { padding } from '../styles/sizes';
import { Input } from 'react-native-elements';
import API from '../services/api';
import Message from '../components/Message';

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

    closeMessage = () => {
        console.log('acll');
        this.setState({ isVisible: false });
    }

    render() {
        return (
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.center}>
                        <Text style={styles.title}>PushMo</Text>
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
                        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                            <Text style={{textAlign: "center", color: "#FFF", fontWeight: "bold", fontSize: 18}}>ENTRAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.handleLogin}
                        >
                            <Text style={{
                                textAlign: "center", 
                                color: "#55F", 
                                fontWeight: "bold", 
                                fontSize: 16, 
                            }}>Registre-se</Text>
                        </TouchableOpacity>
                    </View>
                    <Message 
                        onButtonPress={this.closeMessage} 
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
    }
})