import React, { Component } from 'react';
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Text, AsyncStorage } from 'react-native';
import Input from '../components/Input';
import Footer from '../components/Footer';
import API from '../services/api';
import FMT from '../helpers/formater';
import { marginLg } from '../styles/sizes';


export default class Login extends Component{
    static navigationOptions = {
        title: "Cadastro de Paciente"
    }

    state = {
        cpf: "",
        born_at: "",
        entrou: false
    }
    
    handleChange = (field, value) => {
        if (field === 'cpf') {
            let { cpf } = this.state;
            cpf = FMT.formatCPF(value, cpf);
            this.setState({ cpf })
        } else if (field === 'born_at'){
            let { born_at } = this.state;
            born_at = FMT.formatDate(value, born_at);
            this.setState({ born_at })
        }
        else
            this.setState({ [field]: value })
        
    }

    handleSave = async () => {
        API.post('/pacients', this.formatedFields())
        .then( res => {
            this.setState({ entrou: JSON.stringify(res.data) })
        })
        .catch( err => {
            this.setState({ entrou: JSON.stringify(err) })
        })
    }

    formatedFields = () => {
        let { name, address, cpf, born_at} = this.state;
        return {
            name,
            address,
            cpf: FMT.clearString(cpf),
            born_at: FMT.dateRealDB(born_at)
        }
    }

    render() {
        return (
            <>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.center}>
                        <Input
                            placeholder='Ex.: Antonio Bezerra'
                            label="Nome"
                            onChangeText={value => this.handleChange('name', value)}
                            value={this.state.name}
                            maxLength={50}
                            errorMessage="deu Ruim"
                        />
                        <Input
                            placeholder='Ex.: 123.456.789-10'
                            label="CPF"
                            onChangeText={value => this.handleChange('cpf', value)}
                            value={this.state.cpf}
                            maxLength={14}
                        />
                        <Input
                            placeholder='Ex.: 01/01/2000'
                            label="Data de Nascimento"
                            onChangeText={value => this.handleChange('born_at', value)}
                            value={this.state.born_at}
                            maxLength={10}
                        />
                        <Input
                            placeholder='Ex.: Rua do Amanhecer, 190'
                            label="Endereco"
                            onChangeText={value => this.handleChange('address', value)}
                            value={this.state.address}
                            maxLength={100}
                        />
                    </View>
                    <Text>{this.state.entrou + ""}</Text>
                </KeyboardAvoidingView>
                <Footer title="Salvar" iconName="save" onPress={this.handleSave} />
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: marginLg,
        marginRight: marginLg,
    },
    center: {
        flex: 1,
    }
})