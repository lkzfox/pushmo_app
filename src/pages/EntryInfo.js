import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ListItem } from 'react-native-elements';
import API from '../services/api';
import Footer from '../components/Footer';
import { marginLg, fontLg, padding, marginMd } from '../styles/sizes';
import TextIcon from '../components/TextIcon';
import RadioGroup from '../components/RadioGroup';
import { ScrollView } from 'react-native-gesture-handler';
import { BasicInput } from '../components/Input';
import questions from '../assets/backgroundQuestions.json';
import Message from '../components/Message';

 
class EntryInfo extends Component {
    static navigationOptions = {
        title: 'Dados da Avaliação'
    }

    state = {
        isLoading: false
    }

    componentDidMount() {     
        console.log(this.props);
    }

    mountPrettyOptions = options => {
        let pretty = [];

        options.forEach(({ Option }) => {
            let {id, description} = Option.Feature;
            let exists = pretty.find(o => o.id == id);
            if (!exists) pretty.push({id, description, options: [Option.description]})
            if (exists) exists.options.push(Option.description)
        })

        return pretty;
    }


    render() {
        const entry = this.props.selectedEntry;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    <Text style={{ alignSelf: 'center', fontSize: fontLg, padding: padding, textDecorationLine: 'underline' }}>Informações escala PUSH</Text>
                    <Text>Comprimento (cm): {entry.length}</Text>
                    <Text>Largura (cm): {entry.width}</Text>
                    <Text>Quantidade de Exudato: {entry.Exudato.description}</Text>
                    <Text>Tipo de Tecido: {entry.Skin.description}</Text>
                    <Text>Score: {entry.Area.value + entry.Exudato.value + entry.Skin.value}</Text>
                    <Text style={{ alignSelf: 'center', fontSize: fontLg, padding: padding, textDecorationLine: 'underline' }}>Outras Informações</Text>
                    {
                        this.mountPrettyOptions(entry.OptionPushes).map( ({description, id, options}, idx) => {
                            return (
                                <View key={id}>
                                    <Text style={{ fontWeight: 'bold'}}>{description}:</Text>
                                    {
                                        options.map((value, idx2) => <Text key={idx2} style={{ marginLeft: marginLg}}>{value}</Text>)
                                    }
                                </View>
                            )
                        })
                    }
                    {!!entry.AdditionalInfo && !!entry.AdditionalInfo.used_bandage && <Text>Curativo Utilizado: {entry.AdditionalInfo.used_bandage}</Text>}
                    {!!entry.AdditionalInfo && !!entry.AdditionalInfo.change_ratio && <Text>Frequência de Troca: {entry.AdditionalInfo.change_ratio}</Text>}
                    {!!entry.AdditionalInfo && !!entry.AdditionalInfo.others && <Text>Outras Informações: {entry.AdditionalInfo.others}</Text>}

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginLeft: marginLg,
        marginRight: marginLg
    }
})

const mapStateToProps = state => {
    return {
        selectedEntry: state.pushEntry
    }
}

export default connect(mapStateToProps, actions)(EntryInfo);