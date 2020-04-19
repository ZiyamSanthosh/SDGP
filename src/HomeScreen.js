import * as React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Image, TextInput} from 'react-native';
import iCureCropped from './Images/iCure-Cropped.jpg';
import infoIcon from './Images/infoIcon.png';
import userIcon from './Images/user.png';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: null,
            email: null,
            password: null,
            confirmPassword: null,
            dateOfBirth: null,
            height: null,
            weight: null,
            ageOfFirstPeriod: null,
            maritalStatus: null,
            breastFeeding: null,
            alcohol: null,
            smoking: null,
            menstrualCycle: null,
            breastCancerHistory: null,
        }
    }

    render () {
        return (
            <View style={{flex: 1,}}>
                <View style={{flex: 0.8, flexDirection: 'row', backgroundColor: 'white', height: 55,}}>
                    <View style={{flex: 1.5, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity>
                            <Image source={infoIcon} style={{width: 35, height: 35}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 7, alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={iCureCropped} style={{width: 130, height: 45}}/>
                    </View>
                    <View style={{flex: 1.5, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity>
                            <Image source={userIcon} style={{width: 35, height: 35}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex: 8,}}>
                    <Text>Hello</Text>
                </View>
                <View style={{flex: 1.2,}}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Update Today's Activity</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default HomeScreen;

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
        width: 350,
        borderRadius: 25,
        alignSelf: 'center',
    },
})
