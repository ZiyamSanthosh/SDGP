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
                    <View style={{flex: 1.2, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={iCureLogoOnly} style={{height:100, width: 100}}/>
                    </View>
                    <View style={{flex: 6.5, backgroundColor: 'white', margin: 20, marginTop: 0, borderRadius: 25}}>
                        <Text style={{fontSize: 30, textAlign: 'center', padding: 10, textDecorationLine: 'underline'}}>iCure</Text>
                        <Text style={{fontSize: 15, padding: 16, paddingTop: 0, paddingBottom: 0, textAlign: 'justify'}}>
                            iCure is an app which was created to predict the possibility
                            of a woman being diagnosed with breast cancer. As for the studies
                            it is shown that this sickness is currently the second most diagnosed cancer in
                            the world. We came up with this solution because majority of the women that have
                            a risk of being diagnosed with breast cancer cannot keep track of their daily lifestyle.
                            At first this app will first gather basic details of the user and make an initial
                            prediction, after that by getting daily data of the user the prediction will update
                            and vary according to the behavior of the user. By making the prediction then the system
                            will analyze what has caused the prediction rate to uplift, after identifying the factor which
                            has led to this situation the system will provide the user a solution in order to minimize the risk.
                            Since the effectiveness of this sickness can be minimized if the person was able to diagnose this
                            sickness at the very early stages, We hope that this app will be useful for the user to get an idea
                            about her status and eventually if there is a risk the user will be able to get obtain medical service
                            and prevent it at early stages.
                        </Text>
                        <Text style={{textAlign: 'center', color: '#e0dede'}}>@Copyrights Reserved</Text>
                    </View>
                    <View style={{flex: 0.8}}>
                        <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.goBack()}}>
                            <Text style={styles.buttonText}>Back To Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default AboutUs

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 20,
        color: 'white'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#ED3030',
        padding: 10,
        //marginBottom: 10,
        width: 370,
        borderRadius: 25,
        alignSelf: 'center',
        marginBottom: 15
    },
})
