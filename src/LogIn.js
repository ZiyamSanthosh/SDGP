import * as React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Image, TextInput} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import logo from './Images/icure.jpg'
import axios from 'axios'

class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            email: null,
            password: null
        }
    }

    validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false){
            //console.log("email")
            alert("Please enter a valid email address!")
            //this.setState({email: text})
            return false;
        } else {
            return true;
        }
    }

    loginProcess = () => {
        const data = {
            "email": this.state.email,
            "password": this.state.password
        }
        axios.post('http://10.0.2.2:8000/api/users/login', data)
            .then((response) => {
                console.log(response.data)
                console.log(JSON.stringify(response.data))
                if (JSON.stringify(response.data)==='{"error":"Invalid user credentials. Could not find user"}'){
                    alert('Invalid user credentials. Could not find user!')
                } else {
                    if (JSON.stringify(response.data)==='{"error":"Invalid password, user login failed"}'){
                        alert('Invalid password, user login failed! ')
                    } else {
                        this.setState({
                            userId: response.data.userId
                        })
                        console.log(this.state.userId)
                        this.props.navigation.navigate('HomeScreen', {
                            userId: this.state.userId
                        })
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    validations = () => {
        if (this.state.email===null || this.state.password===null){
            alert("Please fill all the fields!")
        } else {
            if (this.validateEmail(this.state.email)){
                console.log("Done")
                this.loginProcess()
            }
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
                <TouchableOpacity style={styles.button} onPress={() => this.validations()}>
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
