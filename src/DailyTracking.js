import * as React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Image, TextInput, ScrollView} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

class DailyTracking extends Component {

    constructor(props) {
        super(props);
        const{userId} = this.props.route.params
        this.state = {
            userId: userId,
            height: null,
            weight: null,
            alcohol: null,
            smoking: null
        }
    }

    updateDataAndPredict = () => {
        const data = {
            "userId": this.state.userId,
            "height": this.state.height,
            "weight": this.state.weight,
            "alcohol": this.state.alcohol,
            "smoking": this.state.smoking
        }
        axios.post('http://10.0.2.2:8000/api/track/', data)
            .then((response) =>{
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
        console.log("First done")
        const data2 = {
            "userId": this.state.userId
        }
        axios.get('http://10.0.2.2:8000/api/track/', data2)
            .then((response2) => {
                console.log(response2)
                console.log(response2.data)
            })
            .catch((err2) => {
                console.log(err2)
            })
        console.log("Second done")

    }

    render () {
        return (
            <View style={{flex:1, backgroundColor: '#e0dede'}}>
                <ScrollView>
                    <View style={{padding: 10, flex:1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Daily Tracking</Text>
                    </View>
                    <View style={{flex: 14, padding: 20}}>
                        <View style={{flex: 1, backgroundColor: 'white', borderRadius: 25, padding: 15, marginBottom: 20}}>
                            <Text style={{fontWeight: 'bold', fontSize: 25}}>Enter height</Text>
                            <TextInput
                                style={styles.textBox}
                                placeholder = "Enter in meters"
                                onChangeText={(value) => {
                                    this.setState({
                                        height: value
                                    })
                                }}
                            />
                        </View>
                        <View style={{flex: 1, backgroundColor: 'white', borderRadius: 25, padding: 15, marginBottom: 20}}>
                            <Text style={{fontWeight: 'bold', fontSize: 25}}>Enter weight</Text>
                            <TextInput
                                style={styles.textBox}
                                placeholder = "Enter in kilograms"
                                onChangeText={(value) => {
                                    this.setState({
                                        weight: value
                                    })
                                }}
                            />
                        </View>
                        <View style={{flex: 1, backgroundColor: 'white', borderRadius: 25, padding: 15, marginBottom: 20}}>
                            <Text style={{fontWeight: 'bold', fontSize: 25}}>Did you take alcohol today?</Text>
                            <RNPickerSelect
                                onValueChange={(value) => {this.setState({alcohol: value})}}
                                items={[
                                    {label: 'Yes', value:'Yes'},
                                    {label: 'No', value: 'No'},
                                ]}
                            />
                        </View>
                        <View style={{flex: 1, backgroundColor: 'white', borderRadius: 25, padding: 15, marginBottom: 20}}>
                            <Text style={{fontWeight: 'bold', fontSize: 25}}>Did you smoke today?</Text>
                            <RNPickerSelect
                                onValueChange={(value) => {this.setState({smoking: value})}}
                                items={[
                                    {label: 'Yes', value:'Yes'},
                                    {label: 'No', value: 'No'},
                                ]}
                            />
                        </View>
                        <View style={{flex: 1.1, borderRadius: 25}}>
                            <TouchableOpacity style={styles.button} onPress={ () => this.updateDataAndPredict() }>
                                <Text style={styles.buttonText}>Get New Prediction Results</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Update Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default DailyTracking

const styles = StyleSheet.create({
    textBox: {
        height: 40,
        borderColor: 'silver',
        borderBottomWidth: 3,
        marginBottom: 20
    },
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
        marginBottom: 10
    },
})
