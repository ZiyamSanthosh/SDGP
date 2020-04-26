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
            result: null
        }
    }

    componentDidMount() {
        const data = {
            "userId": this.state.userId
        }
        axios.post('http://10.0.2.2:8000/api/track/predict/', data)
            .then((response) =>{
                console.log(response.data)
                console.log(response.data.LastData)
                this.setState({
                    dateOfBirth: response.data.DOB,
                    height: response.data.height,
                    weight: response.data.weight,
                    ageOfFirstPeriod: response.data.LastData.Age_at_first_period,
                    maritalStatus: response.data.LastData.Marital_Status,
                    breastFeeding: response.data.LastData.BreastFeeding,
                    alcohol: response.data.LastData.Alcohol,
                    smoking: response.data.LastData.Smoking,
                    menstrualCycle: response.data.LastData.Menstrual_Cycle,
                    breastCancerHistory: response.data.LastData.Breast_Cancer_History
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    updateDataAndPredict = () => {
        const data = {
            "userId": this.state.userId,
            "dob": this.state.dateOfBirth,
            "height": this.state.height,
            "weight": this.state.weight,
            "ageAtFirstPeriod": this.state.ageOfFirstPeriod,
            "maritalStatus": this.state.maritalStatus,
            "breastFeeding": this.state.breastFeeding,
            "alcohol": this.state.alcohol,
            "smoking": this.state.smoking,
            "menstrualCycle": this.state.menstrualCycle,
            "breastCancerHistory": this.state.breastCancerHistory
        }
        axios.post('http://10.0.2.2:8000/api/track/', data)
            .then((response) => {
                const data2 = {
                    'userId': this.state.userId
                }
                axios.post('http://10.0.2.2:8000/api/track/result/', data2)
                    .then((response) => {
                        this.setState({
                            result: response.data.result
                        })
                        this.props.navigation.navigate('ResultsPage', {
                            userId: this.state.userId,
                            result: this.state.result
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    updateDataOnly= () => {
        const data = {
            "userId": this.state.userId,
            "dob": this.state.dateOfBirth,
            "height": this.state.height,
            "weight": this.state.weight,
            "ageAtFirstPeriod": this.state.ageOfFirstPeriod,
            "maritalStatus": this.state.maritalStatus,
            "breastFeeding": this.state.breastFeeding,
            "alcohol": this.state.alcohol,
            "smoking": this.state.smoking,
            "menstrualCycle": this.state.menstrualCycle,
            "breastCancerHistory": this.state.breastCancerHistory
        }
        axios.post('http://10.0.2.2:8000/api/track/', data)
            .then((response) => {
                console.log(response)
                console.log(response.data)
                console.log("Latest Data Saved Successfully")
                this.props.navigation.navigate('HomeScreen', {userId: this.state.userId})

            })
            .catch((err) => {
                console.log(err)
            })
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
                                onValueChange={(value) => {
                                    if (value==='Yes') {
                                        this.setState({
                                            alcohol: 1
                                        })
                                    } else{
                                        this.setState({
                                            alcohol: 0
                                        })
                                    }

                                }}
                                items={[
                                    {label: 'Yes', value:'Yes'},
                                    {label: 'No', value: 'No'},
                                ]}
                            />
                        </View>
                        <View style={{flex: 1, backgroundColor: 'white', borderRadius: 25, padding: 15, marginBottom: 20}}>
                            <Text style={{fontWeight: 'bold', fontSize: 25}}>Did you smoke today?</Text>
                            <RNPickerSelect
                                onValueChange={(value) => {
                                    if (value==='Yes'){
                                        this.setState({
                                            smoking: 1
                                        })
                                    } else {
                                        this.setState({
                                            smoking: 0
                                        })
                                    }

                                }}
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
                            <TouchableOpacity style={styles.button} onPress={ () => this.updateDataOnly()}>
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
