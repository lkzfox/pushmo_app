import React from 'react';
import { buttonIcon, marginMd, buttonFont } from '../styles/sizes';
import { buttonIconColor, buttonColor } from '../styles/colors';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default (props) => <Button  
    icon={(
        <Icon name={props.iconName} 
            size={buttonIcon} 
            color={buttonIconColor}
            style={{marginRight: marginMd}} 
        />
    )}
    buttonStyle={{
        backgroundColor: buttonColor,
    }}
    titleStyle={{
        fontWeight: "bold",
        fontSize: buttonFont
    }}
    loadingProps={{
        size: buttonIcon
    }}
    {...props}
/>