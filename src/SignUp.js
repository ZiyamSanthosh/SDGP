import * as React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Image, TextInput, ActivityIndicator} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import logo from './Images/icure.jpg'
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import DialogProgress from 'react-native-dialog-progress'

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: null,
            email: null,
            password: null,
            confirmPassword: null,
            userId: null,
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

    validatePasswords = (pass1,pass2) => {
        if(pass1!==pass2){
            //console.log("password")
            alert("Both passwords that you have entered don't match!")
            return false;
        } else {
            return true;
        }
    }

    sendData = () => {
        const data = {
            "fullName": this.state.fullName,
            "email": this.state.email,
            "password": this.state.password
        }
        axios.post('http://10.0.2.2:8000/api/users/register', data)
            .then((response) => {
                console.log(response)
                console.log(response.data)
                console.log(response.data.userId)
                this.setState({
                    userId: response.data.userId,
                })
                console.log(this.state.userId)
                this.props.navigation.navigate("InitialDetails", {
                    fullName: this.state.fullName,
                    email: this.state.email,
                    password: this.state.password,
                    userId: this.state.userId
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    validations = () => {
        //console.log(this.validateEmail(this.state.email))
        //console.log(this.validatePasswords(this.state.password,this.state.confirmPassword))
        if (this.state.fullName!==null && this.state.email!==null && this.state.password!==null && this.state.confirmPassword!==null){
            if (this.validateEmail(this.state.email) && this.validatePasswords(this.state.password,this.state.confirmPassword)){
                console.log("All done")
                const options = {
                    title: "Loading",
                    message: "This is a message",
                    isCancelable: true
                }
                DialogProgress.show(options)
                this.sendData()
            } else {
                console.log("Not done")
            }
        } else {
            alert("Please fill all the fields!")
        }
    }

    render () {
        return(
            <View style={styles.mainView}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.textBox}
                    placeholder = "Full name"
                    onChangeText={(value) => {
                        this.setState({
                            fullName: value
                        })
                    }}
                />
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
                    placeholder = "New Password"
                    secureTextEntry={true}
                    onChangeText={(value) => {
                        this.setState({
                            password: value
                        })
                    }}
                />
                <TextInput
                    style={styles.textBox}
                    placeholder = "Confirm Password"
                    secureTextEntry={true}
                    onChangeText={(value) => {
                        this.setState({
                            confirmPassword: value
                        })
                    }}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.validations()}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default SignUp;

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
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
});
