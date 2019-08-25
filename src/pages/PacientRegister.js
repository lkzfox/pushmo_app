import React, { Component } from 'react';
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Footer from '../components/Footer';
import API from '../services/api';
import FMT from '../helpers/formater';
import { marginLg } from '../styles/sizes';
import * as Actions from '../actions'
import Message from '../components/Message';


class PacientRegister extends Component{
    static navigationOptions = {
        title: "Cadastro de Paciente"
    }

    state = {
        name:'',
        address: '',
        cpf: '',
        born_at: '',
        isVisible: false,
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

    handleSave = () => {
        
        if (this.state.isLoading) return;
        this.setState({ isLoading: true });

        const formatedFields = this.formatedFields(); 
        let result = this.validateFields(formatedFields);
        
        this.setState({...result});
        const errorsAmount = Object.values(result).filter(v => v !== '').length;
        if (errorsAmount > 0) {
            this.setState({ isLoading: false })
            return;
        }

        API.post('/pacients', formatedFields)
        .then( res => {
            this.props.selectPacient(res.data.data);
            this.props.navigation.navigate('PacientInfo');
        })
        .catch( err => {
            this.setState({ isLoading: false, isVisible: true, message: err.response.data.message });
            console.log(err.response);
            
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

    validateFields = values => {
        let errors = {};
        
        for(let field in values) {
            errors[field+'_err'] = this.rules(field, values[field]);
        }
        
        return errors;
    }

    rules = (field, value) => {
        const toValidate = value;
        switch (field) {
            case "name":
                if (toValidate.trim().length < 2) return "O nome precisa ter 3 ou mais caracteres."
                break;
            case "cpf":
                if (!this.validCPF(toValidate)) return "O CPF e invalido."
                break;
            case "born_at":
                if ((new Date(value)).toString() == 'Invalid Date') return "A data e invalida."
                break;
            default:
                return '';
        }
        return '';
    }

    validCPF = (strCPF) => {        
        let sum;
        let rest;
        sum = 0;
        if (strCPF == "00000000000") return false;
            
        for (i=1; i<=9; i++) sum = sum + parseInt(strCPF.substring(i-1, i)) * (11 - i);
        rest = (sum * 10) % 11;
       
        if ((rest == 10) || (rest == 11))  rest = 0;
        if (rest != parseInt(strCPF.substring(9, 10)) ) return false;
       
        sum = 0;
        for (i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        rest = (sum * 10) % 11;
       
        if ((rest == 10) || (rest == 11))  rest = 0;
        if (rest != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
    }

    render() {
        return (
            <>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.center}>
                        <Input
                            placeholder='Ex.: Antonio Bezerra'
                            label="Nome *"
                            onChangeText={value => this.handleChange('name', value)}
                            value={this.state.name}
                            maxLength={50}
                            errorMessage={this.state.name_err}
                        />
                        <Input
                            placeholder='Ex.: 123.456.789-10'
                            label="CPF *"
                            onChangeText={value => this.handleChange('cpf', value)}
                            value={this.state.cpf}
                            maxLength={14}
                            errorMessage={this.state.cpf_err}
                        />
                        <Input
                            placeholder='Ex.: 01/01/2000'
                            label="Data de Nascimento *"
                            onChangeText={value => this.handleChange('born_at', value)}
                            value={this.state.born_at}
                            maxLength={10}
                            errorMessage={this.state.born_at_err}
                        />
                        <Input
                            placeholder='Ex.: Rua do Amanhecer, 190'
                            label="Endereco"
                            onChangeText={value => this.handleChange('address', value)}
                            value={this.state.address}
                            maxLength={100}
                        />
                    </View>
                </KeyboardAvoidingView>
                <Footer title="Salvar" iconName="save" onPress={this.handleSave} loading={this.state.isLoading} />
                <Message 
                    onButtonPress={() => this.setState({ isVisible: false })} 
                    isVisible={this.state.isVisible} 
                    message={this.state.message}
                />
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

export default connect(null, Actions)(PacientRegister);