import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { LineChart } from 'react-native-chart-kit'
import Footer from '../components/Footer';
import API from '../services/api';
import { marginLg, font, marginMd, padding } from '../styles/sizes';
import * as actions from '../actions';
import Message from '../components/Message';
import DateSelector from '../components/DateSelector';
import Swiper from 'react-native-swiper'



class PacientGraph extends Component{
    static navigationOptions = {
        title: "Grafico das Lesoes"
    }

    currentDate = new Date();

    state = {
        charts: [],
        loading: true,
        begin: {
            date: new Date(this.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0,10)
        },
        end: {
            date: this.currentDate.toISOString().slice(0,10)
        }
    }    
    colorOrder = ["#2ecc71", "#e74c3c", "#3498db", "#f1c40f"];

    componentDidMount() {
       this.handleUpdate();
    }

    handleUpdate = () => {        
        const data = {
            begin: this.state.begin.date,
            end: this.state.end.date,
        }
                
        API.post(`/pressure_ulcer/pacient/${this.props.selectedPacient.id}/entries`, data)
        .then(res => {
            this.setState({ charts: res.data, loading: false })
            console.log(res.data);
            
            // this.setState({
            //     locations: res.data.locations, 
            //     stages: res.data.stages, 
            //     isVisible: false, 
            //     loading: false
            // })
            
        })
        .catch(err => {            
            // this.setState({
            //     message: "Nao foi possivel recuperar as informacoes",
            //     showMessageButton: true, 
            //     loading: false,
            //     messageCB: () => {
            //         this.setState({ isVisible: false })
            //         this.props.navigation.pop();
            //     }
            // })
        })
    }

    formatData = (data, index) => {
        const ct1 = {};
        ct1.labels = data.labels.map(item => {
            let day = new Date(item+"T00:00");
            return `${day.getDate()}/${day.getMonth() + 1}`;
        })
        ct1.datasets = [{data: data.data, color: () => this.colorOrder[index]}];

        return ct1;
    }

    renderChart = (key, data) => {
        return (
            <View key={key}>
                <LineChart
                    data={data}
                    width={Dimensions.get('window').width} // from react-native
                    height={250}
                    withShadow={false}
                    chartConfig={{
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        decimalPlaces: 0,
                        color: () => "#000",
                    }}
                    style={{
                        margin: 8,
                        marginLeft: - 2*marginLg,
                        borderRadius: 4
                    }}
                />
                <Text style={{textAlign: "center", fontSize: font, paddingTop: padding}}>
                    Lesao 0{key+1}
                </Text>
            </View>
        )
    }

    renderSwiper = () => {
        if (!this.state.charts.length)
            return;

        return (
            <Swiper style={styles.wrapper} index={0} showsPagination={true} loop={true}>
                { this.state.charts.map((data, key) => this.renderChart(key, this.formatData(data, key))) }
            </Swiper>
        )
    }

    onDateChange = (name, value) => {
        this.setState({[name]: value});
    }

    render() {                
        return (
            <>
                <ScrollView style={styles.container}>
                    {this.renderSwiper()}
                    <View>
                        <Text style={{fontWeight: "bold", fontSize: font, marginBottom: marginMd}}>Periodo</Text>
                        <DateSelector defaultDate={this.state.begin.date} onDateChange={value => this.onDateChange('begin', value)} style={{marginVertical: marginMd}}/>
                        <DateSelector onDateChange={value => this.onDateChange('end', value)} />
                    </View>
                </ScrollView>
                <Footer title="Atualizar" iconName="refresh" onPress={this.handleUpdate} />
                {/* <Message 
                    onButtonPress={this.state.messageCB} 
                    isVisible={this.state.isVisible} 
                    message={this.state.message}
                    loading={this.state.loading}
                    showButton={this.state.showMessageButton}
                /> */}
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: marginLg,
        marginRight: marginLg,
    },
    center2: {
        flex: 1,
        flexDirection: "column",
        flexWrap: "wrap",
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40  
    },
    wrapper: {
        flex: 0,
        flexDirection: "row",
        flexWrap: 'wrap',
        height: 300
    },
})

const mapStateToProps = state => {
    return {
        takenPicture: state.saveImage,
        selectedPacient: state.selectedPacient        
    }
}

export default connect(mapStateToProps, actions)(PacientGraph);