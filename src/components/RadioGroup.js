import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { font, marginMd, marginLg } from '../styles/sizes';
import { fontColor, placeholderColor } from '../styles/colors';

export default class RadioGroup extends React.Component {

    selected = button => {
        if (this.props.multiple) {
            return this.props.selected.includes(button.value);
        }
        return this.props.selected === button.value
    }
    
 render() {
    return (
        <View style={{...styles.container, ...this.props.style}}>
            <View style={styles.groupContainer}>
                {this.props.title && (
                    <View style={styles.fullContent}>
                        <Text style={styles.title}>{this.props.title}</Text>
                    </View>
                )}
                {
                    this.props.options.map((button, i) => {
                        return (
                            <View
                                key={i}
                                style={this.props.EPL && {width: "100%"}} 
                            >
                                <TouchableOpacity 
                                    style={styles.buttonContainer} 
                                    onPress={() => this.props.onSelect(button.value)}
                                    disabled={this.props.disabled}
                                >
                                    <View style={styles.radioContainer}>
                                        {this.selected(button) && <View style={styles.radioSelection}></View>}
                                    </View>
                                    <View  style={styles.label}>
                                        <Text>{button.label}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    })
                }
                
                {this.props.children && (
                    <View style={styles.fullContent}>
                        <View style={{margin: marginMd, marginTop: 0 }}>
                            {this.props.children}
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
 }
}

const styles = StyleSheet.create({
    container: {
        alignSelf:"flex-start",
        flexWrap:"wrap", 
        flexDirection: "row",
        marginBottom: marginLg
    },
    groupContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderColor: placeholderColor,
        borderWidth: 1,
        borderRadius: 4,
    },
    title: {
        fontWeight: "bold",
        fontSize: font,
        padding: 4,
        marginLeft: marginMd,
        marginRight: marginMd,
    },
    buttonContainer: {
        flexWrap: "wrap",
        alignItems: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        margin: marginMd,
    },
    radioContainer: {
        borderColor: fontColor,
        borderWidth: 2,
        borderRadius: 50,
        height: 26,
        width: 26,
        marginRight: marginMd,
    },
    radioSelection: {
        backgroundColor: fontColor,
        marginTop: 3,
        marginLeft: 3,
        borderRadius: 50,
        height: 16,
        width: 16,
    },
    label: {
        fontSize: font,
    },
    fullContent: {
        flexBasis: "100%",
    }
})