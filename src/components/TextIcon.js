import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { iconColor } from "../styles/colors";
import { icon } from '../styles/sizes';

export default (props) => <Icon {...props}
    size={icon} 
    color={iconColor}
/>