import React, { Component } from 'react';
import { View, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ListItem, SearchBar } from 'react-native-elements';
import API from '../services/api';
import FMT from '../helpers/formater';
import Footer from '../components/Footer';
import { buttonIcon } from '../styles/sizes';
import { fontColor } from '../styles/colors';

class PushEntriesList extends Component {
    static navigationOptions = {
        title: "Registros da Lesao"
    }

    componentDidMount() {
        
        API.get(`/pressure_ulcer/${this.props.pressureUlcer.id}/entries`)
        .then(res => {
            this.props.setPushEntries(res.data);
        })
    }

    handleRegister = () => {
        this.props.navigation.navigate('PushEntryRegister');
    }

    renderItem = ({ item }) => {
        return (
            <ListItem
                title={FMT.dateDBReal(item.created_at)}
                subtitle={`Score: ${item.Area.value + item.Skin.value + item.Exudato.value}`}
                bottomDivider={true}
                leftIcon={(<Icon name="date-range" size={buttonIcon} color={fontColor} />)}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.list}>
                    <FlatList
                        data={this.props.pushEntries}
                        keyExtractor={push_entry => push_entry.id.toString()}
                        renderItem={this.renderItem}
                    />
                </View>
                <Footer title="Adicionar Registro" iconName="add-circle-outline" onPress={this.handleRegister} />
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
    }
}

export default connect(mapStateToProps, actions)(PushEntriesList);