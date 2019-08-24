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

class PacientsList extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        pacientsList: [],
        search: '',
        timeout: null,
        isLoading: false,
        isVisible: true,
    }

    componentDidMount() {
        this.handleSearch();
    }

    handleChange = search => {
        this.setState({ search });
        clearTimeout(this.state.timeout);
        this.setState({
            timeout: setTimeout(() => {
                this.handleSearch()
                this.setState({ isLoading: true });
            }, 1300)
        })
    }

    handleSearch = () => {
        API.get('/pacients?name=' + this.state.search + "&cpf=" + this.state.search)
        .then(res => {
            this.setState({
                pacientsList: res.data,
                isLoading: false,
            });
        })
        .catch(err => this.setState({search: JSON.stringify(err)}));   
    }

    handleRegister = () => {
        this.props.navigation.navigate('PacientRegister');
    }

    handleSelectPacient = pacient => {        
        this.props.selectPacient(pacient);
        this.props.navigation.navigate('PacientInfo');
    }

    renderItem = ({ item }) => {
        return (
            <ListItem
                title={item.name}
                subtitle={FMT.formatCPF(item.cpf)}
                leftIcon={(<Icon name="person" size={buttonIcon} color={fontColor} />)}
                chevron={true}
                bottomDivider={true}
                onPress={() => this.handleSelectPacient(item)}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <SearchBar
                        placeholder="Buscar nome/cpf..."
                        onChangeText={this.handleChange}
                        value={this.state.search}
                        showLoading={this.state.isLoading}
                        lightTheme={true}
                        loadingProps={{
                            color: fontColor,
                            size: buttonIcon
                        }}
                        inputStyle={{color: fontColor}}
                    />
                </View>
                <View style={styles.list}>
                    <FlatList
                        data={this.state.pacientsList}
                        keyExtractor={pacient => pacient.id.toString()}
                        renderItem={this.renderItem}
                    />
                </View>
                <Footer title="Adicionar Paciente" iconName="add-circle-outline" onPress={this.handleRegister} />
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

export default connect(null, actions)(PacientsList);