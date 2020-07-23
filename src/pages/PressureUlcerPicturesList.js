import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, Image , BackHandler} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ListItem, SearchBar } from 'react-native-elements';
import API from '../services/api';
import FMT from '../helpers/formater';
import Footer from '../components/Footer';
import { buttonIcon, marginLg, marginMd, font } from '../styles/sizes';
import { fontColor } from '../styles/colors';
import ImageThumbnail from '../components/ImageThumbnail';
import Swiper from 'react-native-swiper'

class PressureUlcerPicturesList extends Component {
    static navigationOptions = {
        title: "Imagens da Lesao"
    }

    state = {
        fullscreen: false,
        index: 0,
    }

    componentDidMount() {
        
        API.get(`/pressure_ulcer/${this.props.pressureUlcer.id}/entries`)
        .then(res => {
            this.props.setPushEntries(res.data);
        })

       
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

    onImagePress = index => {
        this.setState({
            fullscreen: true,
            index
        });

        this.handler = BackHandler.addEventListener('hardwareBackPress', () => {          
            this.setState({fullscreen: false});
            this.handler.remove();
            return true;
          });
    }

    

    render() {
        const uri = `${API.defaults.baseURL}/pressure_ulcer/image/`;
        return (
            <View style={styles.container}>
                {
                    !this.state.fullscreen &&
                    <ScrollView contentContainerStyle={styles.list}>
                        {
                            this.props.pushEntries.map((entry, i) => {
                                if (!entry.image_path) return;

                                return (
                                    <View style={styles.imageContainer} key={i}>
                                        <ImageThumbnail source={entry.image_path} onImagePress={() => this.onImagePress(i)} />
                                        <Text style={styles.content}>
                                            {FMT.dateDBReal(entry.created_at)}
                                        </Text>
                                    </View>
                                );
                            })
                        }
                    </ScrollView>
                }
                
                {
                    this.state.fullscreen &&
                    
                    <Swiper style={styles.wrapper} index={this.state.index} showsPagination={true} loop={true}>
                        {
                            this.props.pushEntries.map((entry, i) => {
                                if (!entry.image_path) return;

                                return (
                                    <View style={styles.fullscreen} key={i}>
                                        <Image source={{uri: uri + entry.image_path}} style={styles.fullscreen} />
                                        <Text style={styles.content}>
                                            {FMT.dateDBReal(entry.created_at)}
                                        </Text>
                                    </View>
                                );
                            })
                        }
                    </Swiper>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 0,
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: marginLg,
    },
    imageContainer: {
        flex: 1,
        padding: marginMd,
        alignSelf: "flex-start",
        flexBasis: "50%",
        height: 200
    },
    content: {
        textAlign: "center",
        fontSize: font,
    },
    fullscreen: {
        flex: 1
    },
})

const mapStateToProps = state => {
    return {
        pressureUlcer: state.pressureUlcer,
        pushEntries: state.pushEntries,
    }
}

export default connect(mapStateToProps, actions)(PressureUlcerPicturesList);