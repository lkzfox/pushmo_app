import React, { Component } from 'react';
import { View, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { padding, paddingLg, marginMd, paddingMd } from '../styles/sizes';
import { Input } from 'react-native-elements';
import API from '../services/api';
import Message from '../components/Message';
import { ScrollView } from 'react-native-gesture-handler';
import { whiteIceColor, blueTextColor } from '../styles/colors';
import PrimaryButton from '../components/PrimaryButton';


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
        .then(res => {
            this.showMessage(`Registro efetuado, você já pode fazer o login!`,
            () => {
                this.showMessage(`Bem-vindo!
                
                Este aplicativo é destinado aos profissionais de saúde que atuam no tratamento de lesão por pressão - LP, visando maior praticidade, agilidade e segurança nas avaliações de LPs, tendo como objetivo principal  o uso da ferramenta da Escala de PUSH- Pressure Úlceras Scale for Healing (autorizada pela NPIAP), onde irá favorecer o acompanhamento de forma sistemática e com base em estudos científicos.
                `,
                () => {
                    this.props.navigation.navigate('Login');
                })
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

    goto = field => {
        let element = this[field];
        element.focus();
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.center}>
                        <Text style={styles.title}>Cadastro</Text>
                        <Input placeholder='Seu nome'
                            onSubmitEditing={() => this.goto('email')}
                            leftIcon={ <Icon name='person-outline' size={24} color='black'/> }
                            onChangeText={val => this.handleChange('name', val)} 
                            containerStyle={styles.input}
                            value={this.state.name}
                            />
                        <Input placeholder='Ex.: email@email.com.br'
                            onSubmitEditing={() => this.goto('password')}
                            ref={e => this.email = e}
                            leftIcon={ <Icon name='mail-outline' size={24} color='black'/> }
                            onChangeText={val => this.handleChange('email', val)} 
                            value={this.state.email}
                            containerStyle={styles.input}
                            keyboardType="email-address"
                        />
                        <Input placeholder='senha'
                            onSubmitEditing={() => this.goto('confirm_password')}
                            ref={e => this.password = e}
                            leftIcon={ <Icon name='lock' size={24} color='black'/> }
                            onChangeText={val => this.handleChange('password', val)} 
                            value={this.state.password}
                            containerStyle={styles.input}
                            secureTextEntry
                        />
                        <Input placeholder='confirmar senha'
                            onSubmitEditing={this.handleRegister}
                            ref={e => this.confirm_password = e}
                            leftIcon={ <Icon name='lock' size={24} color='black'/> }
                            onChangeText={val => this.handleChange('passwordConfirmation', val)} 
                            value={this.state.passwordConfirmation}
                            containerStyle={styles.input}
                            secureTextEntry
                        />
                        <PrimaryButton buttonstyle={styles.button} onPress={this.handleRegister} title="Cadastrar"/>
                        
                    </View>
                        <TouchableOpacity style={{padding: paddingLg, marginTop: 16}} onPress={this.handleBack}>
                            <Text style={{textAlign: "center", color: blueTextColor, fontWeight: "bold", fontSize: 18}}>Voltar</Text>
                        </TouchableOpacity>

                    
                    <Message 
                        onButtonPress={this.state.messageCB} 
                        isVisible={this.state.isVisible} 
                        message={this.state.message}
                        loading={this.state.loading}
                        showButton={true}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
                
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: whiteIceColor
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: padding
    },
    input: {
        marginVertical: marginMd,
    },
    button: {
        marginVertical: marginMd,
        padding: padding
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        paddingVertical: paddingMd,
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
        paddingVertical: 20
    }
})