import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import FMT from '../helpers/formater';
import TextIcon from '../components/TextIcon';
import Button from '../components/Button';
import { marginLg } from '../styles/sizes';


class PacientInfo extends Component{

    infoList = [
        {
            title: this.props.selectedPacient.name,
            leftIcon: <TextIcon name="person"/>
        },
        {
            title: FMT.formatCPF(this.props.selectedPacient.cpf),
            leftIcon: <TextIcon name="credit-card"/>
        },
        {
            title: FMT.dateDBReal(this.props.selectedPacient.born_at),
            leftIcon: <TextIcon name="date-range"/>
        },
        {
            title: this.props.selectedPacient.address,
            leftIcon: <TextIcon name="home"/>
        }
    ]

    actionsList = [
        {
            title: "Historico",
            iconName: "format-align-justify",
            onPress: () => this.handle('PacientBackground')
        },
        {
            title: "Lesoes",
            iconName: "local-hospital",
            onPress: () => this.handle('PacientPressureUlcer')            
        },
        {
            title: "Grafico",
            iconName: "assessment",
            onPress: this.handle
        }
        
    ]

    handle = (route) => {
        this.props.navigation.navigate(route);
    }

    render() {
        return (
            <View style={styles.center}>
                {
                    this.infoList.map( (item, i) => <ListItem key={i} {...item} /> )
                }
                <View style={styles.container}>
                {
                    this.actionsList.map( (item, i) => <Button {...item} key={i} raised={true} containerStyle={{marginBottom: marginLg}} /> )
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
        selectedPacient: state.selectedPacient
    }
}

export default connect(mapStateToProps)(PacientInfo);