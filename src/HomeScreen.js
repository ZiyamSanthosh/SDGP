import * as React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Image, TextInput} from 'react-native';
import iCureCropped from './Images/iCure-Cropped.jpg';
import infoIcon from './Images/infoIcon.png';
import userIcon from './Images/user.png';
import iCureText from './Images/iCure-TextOnly.jpg';

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
            <View style={{flex: 1, backgroundColor: '#e0dede'}}>
                <View style={{flex: 0.8, flexDirection: 'row', backgroundColor: 'white', height: 25, paddingLeft: 6, paddingRight: 6}}>
                    <View style={{flex: 9, justifyContent: 'center'}}>
                        <TouchableOpacity>
                            <Image source={iCureCropped} style={{width: 110, height: 35, resizeMode: 'contain'}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', paddingRight: 3}}>
                        <TouchableOpacity>
                            <Image source={userIcon} style={{width: 25, height: 25}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex: 7.5,}}>
                    <View style={{flex:1, margin: 18, backgroundColor: 'white', borderRadius: 25, padding: 15}}>
                        <Text style={{fontSize: 30}}>Hello, Jane Doe!</Text>
                    </View>
                </View>
                <View style={{flex: 1.7,}}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Update Today's Activity</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>View My Reports</Text>
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
        width: 370,
        borderRadius: 25,
        alignSelf: 'center',
        marginBottom: 15
    },
})
