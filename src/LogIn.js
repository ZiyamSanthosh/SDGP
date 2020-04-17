import * as React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Image, TextInput} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import logo from './Images/icure.jpg'

class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "not defined",
            password: "not defined"
        }
    }

    render () {
        return(
            <View style={styles.mainView}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.textBox}
                    placeholder = "Email"
                    onChangeText={(value) => {
                        this.setState({
                            email: value
                        })
                    }}
                />
                <TextInput
                    style={styles.textBox}
                    placeholder = "Password"
                    secureTextEntry = {true}
                    onChangeText={(value) => {
                        this.setState({
                            password: value
                        })
                    }}
                />
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>LogIn</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default LogIn;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: 'white',
        // margin: 20,
        padding: 20
    },
    textBox: {
        height: 40,
        borderColor: 'silver',
        borderBottomWidth: 3,
        marginBottom: 20
    },
    title: {
        fontSize: 50,
        marginBottom: 30,
        fontWeight: 'bold'
    },
    button: {
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: '#ED3030',
        padding: 13,
        marginBottom: 10,
        borderRadius: 30
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    }
});
