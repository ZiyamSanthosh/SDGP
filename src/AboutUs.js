import * as React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Image, TextInput} from 'react-native';
import iCureLogoOnly from './Images/icure.png'
import homeIcon from './Images/home.png'

class AboutUs extends Component {

    render () {
        return (
            <View style={{flex: 1, backgroundColor: '#e0dede'}}>
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'white', paddingLeft: 15, paddingRight: 15}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <TouchableOpacity>
                            <Image source={homeIcon} style={{width: 25, height: 25}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 9, justifyContent: 'center', paddingLeft: 125}}>
                        <Text style={{fontSize: 20}}>About Us</Text>
                    </View>
                </View>
                <View style={{flex: 13}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={iCureLogoOnly} style={{height:100, width: 100}}/>
                    </View>
                    <View style={{flex: 6, backgroundColor: 'white', margin: 20, marginTop: 0, borderRadius: 25}}>
                        <Text style={{fontSize: 30, textAlign: 'center', padding: 10, textDecorationLine: 'underline'}}>iCure</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default AboutUs
