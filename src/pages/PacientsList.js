import React, { Component } from 'react';
import { View, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ListItem, SearchBar } from 'react-native-elements';
import API from '../services/api';
import FMT from '../helpers/formater';
import Footer from '../components/Footer';

export default class PacientsList extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        pacientsList: [],
        search: '',
        timeout: null,
        isLoading: false,
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
            }, 2000)
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
        this.props.navigation.navigate('PacientInfo');
    }

    handleSelectPacient = pacient => {        
        this.props.navigation.navigate('PacientInfo');
    }

    renderItem = ({ item }) => {
        return (
            <ListItem
                title={item.name}
                subtitle={FMT.formatCPF(item.cpf)}
                leftIcon={(<Icon name="person" size={32} color="#000" />)}
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
                        color: "#000",
                        size: 32
                    }}
                    inputStyle={{color: "#000"}}
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
    },
    searchBox: {
        flexDirection: "row",
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
    },
    searchInput: {  
        flex: 1,      
        borderBottomWidth: 1,
        borderBottomColor: "#9e9e9e",
        alignSelf: "stretch",
        fontSize: 16,
        paddingBottom: 4,
        paddingLeft: 4
    },
    searchIcon: {
        alignSelf: "center"
    }
})