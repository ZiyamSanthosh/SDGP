import * as React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Image, TextInput} from 'react-native';
import iCureLogoOnly from './Images/icure.png'

class AboutUs extends Component {

    render () {
        return (
            <View>
                <View>
                    <Image source={iCureLogoOnly} style={{height:100, width: 100}}/>
                </View>
            </View>
        );
    }
}

export default AboutUs
