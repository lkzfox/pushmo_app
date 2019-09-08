import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Input, Overlay } from 'react-native-elements';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import FMT from '../helpers/formater';
import {LocaleConfig} from 'react-native-calendars';
import { placeholderColor, buttonColor } from '../styles/colors';
import { padding, buttonIcon, buttonFont, marginMd } from '../styles/sizes';
import moment from 'moment-timezone';

LocaleConfig.locales['br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    hoje: 'Hoje'
};
LocaleConfig.defaultLocale = 'br';

export default class DateSelector extends React.Component {

    defaultDate = moment().tz("America/Fortaleza").format("DD/MM/YYYY");

    state = {
        isVisible: false,
        date: FMT.dateRealDB(this.defaultDate),
        dateLabel: this.defaultDate,
    }

    componentDidMount() {
        this.props.onDateChange && this.props.onDateChange(this.state);
    }
    
    handlePress = () => {
        this.setState({ isVisible: true });
    }

    onDateChange = date => {
        this.setState({ isVisible: false, date: date.dateString, dateLabel: FMT.dateDBReal(date.dateString) });
        this.props.onDateChange && this.props.onDateChange({
            date: date.dateString, 
            dateLabel: FMT.dateDBReal(date.dateString)
        })
    }
    render() {
        return (
            <View style={{...this.props.style, 
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
            }}>
                <TouchableOpacity style={{...styles.flex,}} onPress={this.handlePress}>
                    <Icon
                        name='event'
                        size={buttonIcon}
                        color='black'
                        style={{
                            borderColor: placeholderColor,
                            borderRightWidth: 1,
                            paddingRight: 2,
                            backgroundColor: buttonColor,
                            margin: -2
                        }}
                    />
                    <Text style={styles.date}>{this.state.dateLabel}</Text>

                </TouchableOpacity>
                <Overlay isVisible={this.state.isVisible}>
                    <Calendar
                        current={this.state.date}
                        onDayPress={this.onDateChange}
                        theme={{
                            textSectionTitleColor: '#b6c1cd',
                            selectedDayBackgroundColor: '#0f0',
                            selectedDayTextColor: '#0060f5',
                            todayTextColor: '#0060f5',
                            dayTextColor: '#2d4150',
                        }}
                    />
                </Overlay>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    red: {
        backgroundColor: "#f00",
    },
    blue: {
        backgroundColor: "#00F",
    },
    date: {
        fontSize: buttonFont,
        marginLeft: marginMd,
    },
    flex: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        borderColor: placeholderColor,
        borderWidth: 1,
        borderRadius: 4,
        padding: 2,
    }
})
