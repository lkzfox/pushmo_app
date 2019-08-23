import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Text, AsyncStorage } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FMT from '../helpers/formater';
import TextIcon from '../components/TextIcon';
import Button from '../components/Button';
import { marginLg } from '../styles/sizes';


class PacientInfo extends Component{
    static navigationOptions = {
        title: "Menu do Paciente"
    }

    infoList = [
        {
            title: this.props.selectedUser.name,
            leftIcon: <TextIcon name="person"/>
        },
        {
            title: FMT.formatCPF(this.props.selectedUser.cpf),
            leftIcon: <TextIcon name="credit-card"/>
        },
        {
            title: FMT.dateDBReal(this.props.selectedUser.born_at),
            leftIcon: <TextIcon name="date-range"/>
        },
        {
            title: this.props.selectedUser.address,
            leftIcon: <TextIcon name="home"/>
        }
    ]

    actionsList = [
        {
            title: "Historico",
            iconName: "format-align-justify",
            action: this.handle
        },
        {
            title: "Lesoes",
            iconName: "local-hospital",
            action: this.handle
        },
        {
            title: "Grafico",
            iconName: "assessment",
            action: this.handle
        }
        
    ]

    handle = () => {

    }

    render() {
        return (
            <View style={styles.center}>
                {
                    this.infoList.map( (item, i) => <ListItem key={i} {...item} /> )
                }
                <View style={styles.container}>
                {
                    this.actionsList.map( (item, i) => <Button {...item} key={i} raised={true} containerStyle={{marginBottom: 16}} /> )
                }     
                </View>           
            </View>
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


const mapStateToProps = state => {
    return {
        selectedUser: state.selectedUser
    }
}

export default connect(mapStateToProps)(PacientInfo);