import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import FMT from '../helpers/formater';
import TextIcon from '../components/TextIcon';
import Button from '../components/Button';
import { marginLg, buttonIcon, marginMd } from '../styles/sizes';

import PacientBackgroundIcon from '../assets/images/pacient_menu_pacient_background.svg';
import PressureUlcerIcon from '../assets/images/pacient_menu_pressure_ulcer.svg';
import GraphIcon from '../assets/images/pacient_menu_graph.svg';
import CameraIcon from '../assets/images/pacient_menu_camera.svg';
import { whiteIceColor } from '../styles/colors';


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
        },
    ]

    actionsList = [
        {
            title: "Histórico",
            icon: <PacientBackgroundIcon width={buttonIcon} height={buttonIcon} style={{ marginRight: marginMd }} />,
            FA: true,
            onPress: () => this.handle('PacientBackground'),
        },
        {
            title: "Lesões",
            icon: <PressureUlcerIcon width={buttonIcon} height={buttonIcon} style={{ marginRight: marginMd }} />,
            onPress: () => this.handle('PacientPressureUlcer')            
        },
        {
            title: "Gráfico",
            icon: <GraphIcon width={buttonIcon} height={buttonIcon} style={{ marginRight: marginMd }} />,
            onPress: () => this.handle('PacientGraph')            
        },
        {
            title: "Registros Fotográficos",
            icon: <CameraIcon width={buttonIcon} height={buttonIcon} style={{ marginRight: marginMd }} />,
            onPress: () => this.handle('PacientPressureUlcerPictures')            
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
        backgroundColor: whiteIceColor
    }
})


const mapStateToProps = state => {
    return {
        selectedPacient: state.selectedPacient
    }
}

export default connect(mapStateToProps)(PacientInfo);