import React, { Component } from 'react';
import { View, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import API from '../services/api';
import Footer from '../components/Footer';
import { marginMd, marginLg } from '../styles/sizes';
import Button from '../components/Button';

class PressureUlcerEntriesList extends Component {
    static navigationOptions = {
        title: "Informacoes Adicionais"
    }

    state = {
        features: []
    }

    componentDidMount() {
        
        API.get(`/pressure_ulcer/entry/features`)
        .then(res => {
            res.data.push({
                description: "OUTROS",
                id: "OTHERS"
            })
            this.setState({features: res.data});
        })
    }

    handleFinish = () => {
        console.log(this.props);
        
        let promisesArray = [
            API.post(`/pressure_ulcer/entry/${this.props.pushEntry.id}/options`, { options: this.props.pushOptions.selections }),
            API.post(`/pressure_ulcer/entry/${this.props.pushEntry.id}/additional_info`, this.props.pushOptions.others)
        ];
        
        Promise.all(promisesArray)
        .then(res => {
            console.log(res);
            this.props.navigation.navigate('PushEntriesList');
        })
        .catch(err => {
            console.log(err.response);
            
        })
    }

    handleSelect = additionalInfo => {        
        this.props.selectPushAdditionalInfo(additionalInfo);
        let page = 'SelectPushAdditionalInfo';
        if (additionalInfo.id === "OTHERS")
            page = 'PushOtherInformations';
        this.props.navigation.navigate(page, {title: additionalInfo.description});
    }

    renderItem = ({ item }) => {
        return (
            <View style={{margin: marginMd, marginHorizontal: marginLg}}>
                <Button title={item.description} onPress={() => this.handleSelect(item)} />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.list}>
                    <FlatList
                        data={this.state.features}
                        keyExtractor={push_entry => push_entry.id.toString()}
                        renderItem={this.renderItem}
                    />
                </View>
                <Footer title="Finalizar" iconName="save" onPress={this.handleFinish} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    list: {
        flex: 1,
        alignSelf: "stretch"
    }
})

const mapStateToProps = state => {
    return {
        pressureUlcer: state.pressureUlcer,
        pushEntries: state.pushEntries,
        pushEntry: state.pushEntry,
        pushOptions: state.pushOptions,
    }
}

export default connect(mapStateToProps, actions)(PressureUlcerEntriesList);