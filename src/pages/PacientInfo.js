import React, { Component } from 'react';
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Text, AsyncStorage } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import API from '../services/api';
import FMT from '../helpers/formater';


export default class PacientInfo extends Component{
    static navigationOptions = {
        title: "Menu do Paciente"
    }

    state = {
        cpf: "",
        born_at: "",
        entrou: false
    }

    infoList = [
        {
            info: 'name',
            icon: <Icon name="person" size={24} color="#000" />
        },
        {
            info: 'cpf',
            icon: <Icon name="credit-card" size={24} color="#000" />
        },
        {
            info: 'born_at',
            icon: <Icon name="date-range" size={24} color="#000" />
        },
        {
            info: 'address',
            icon: <Icon name="home" size={24} color="#000" />
        }
    ]

    actionsList = [
        {
            title: "Historico",
            icon: <Icon name="format-align-justify" size={32} color="#FFF" style={{marginRight: 8}}  />,
            action: this.handle
        },
        {
            title: "Lesoes",
            icon: <Icon name="local-hospital" size={32} color="#FFF" style={{marginRight: 8}}  />,
            action: this.handle
        },
        {
            title: "Grafico",
            icon: <Icon name="assessment" size={32} color="#FFF" style={{marginRight: 8}}  />,
            action: this.handle
        }
        
    ]

    pacient = {
        name: 'Joao da Silva',
        cpf: FMT.formatCPF('12345678915'),
        born_at: FMT.formatDate('2019-11-10'.split('-').reverse().join('').replace(/-/g, '')),
        address: 'Rua da Saudade, 199'
    }

    handle = () => {

    }

    render() {
        return (
            <View style={styles.center}>
                {
                    this.infoList.map( (item, i) => {
                        return (
                            <ListItem 
                                key={i}
                                title={this.pacient[item.info]}
                                leftIcon={item.icon}
                            />
                        )
                    })
                }
                <View style={styles.container}>
                {
                    this.actionsList.map( (item, i) => {
                        return (
                            <Button {...item} 
                                key={i}
                                buttonStyle={{
                                    backgroundColor: "#22dd22",
                                    marginBottom: 16
                                }}
                                titleStyle={{
                                    fontWeight: "bold",
                                    fontSize: 20
                                }}
                                raised={true}
                            />
                        )
                    })
                }     
                </View>           
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 16,
        marginRight: 16,
    },
    center: {
        flex: 1,
    },
    button: {
        backgroundColor: "#27ae60",
        borderColor: "#278e60",
        borderWidth: 2,
        alignSelf: "stretch",
        textAlign: "center",
        padding: 16
    },
    inputContainer: {
        marginBottom: 16, 
        borderColor: "#cecece", 
        borderWidth: 1, 
        borderRadius: 4, 
        paddingBottom: 8
    },
    inputLabel: {
        color: "#000"
    },
    input: {
        paddingBottom: 0,
    }
})