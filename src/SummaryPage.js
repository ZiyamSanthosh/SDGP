import * as React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import axios from 'axios';

class SummaryPage extends Component {

    constructor(props) {
        super(props);
        const {fullName, email, password, userId, dateOfBirth, height, weight, ageOfFirstPeriod, maritalStatus,
            breastFeeding, alcohol, smoking, menstrualCycle, breastCancerHistory} = this.props.route.params
        this.state = {
            fullName: fullName,
            email: email,
            password: password,
            userId: userId,
            dateOfBirth: dateOfBirth,
            height: height,
            weight: weight,
            ageOfFirstPeriod: ageOfFirstPeriod,
            maritalStatus: maritalStatus,
            breastFeeding: breastFeeding,
            alcohol: alcohol,
            smoking: smoking,
            menstrualCycle: menstrualCycle,
            breastCancerHistory: breastCancerHistory,
            result: null
        }
    }

    //function to send data to the backend for prediction and receive result as response, then navigate to next page after
    //start prediction button press
    startPrediction = () => {
        const data = {
            "userId": this.state.userId,
            "dob": this.state.dateOfBirth.toISOString(),
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
        axios.post("http://10.0.2.2:8000/api/detail/", data)
            .then((response) => {
                this.setState({
                    result: response.data.result
                })
                console.log(this.state.result)
                //navigating from SummaryPage to HomeScreen
                this.props.navigation.navigate("ResultsPage", {
                    fullName: this.state.fullName,
                    email: this.state.email,
                    password: this.state.password,
                    userId: this.state.userId,
                    result: this.state.result
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render () {
        return(
            <View style={{backgroundColor: '#e0dede', flex:1, justifyContent: 'center'}}>
                <View style={{flex:1.2, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Summary</Text>
                </View>
                <View style={{flex:14, justifyContent: 'center', padding: 20}}>
                    {/*<View style={{flexDirection: 'row', alignSelf: 'center', padding: 20, marginTop: 20, backgroundColor: 'white', borderRadius: 25}}>
                        <View>
                            <Text style={styles.finalPageText1}>Date Of Birth</Text>
                            <Text style={styles.finalPageText1}>Height</Text>
                            <Text style={styles.finalPageText1}>Weight</Text>
                            <Text style={styles.finalPageText1}>Age Of First Period</Text>
                            <Text style={styles.finalPageText1}>Marital Status</Text>
                            <Text style={styles.finalPageText1}>Breast Feeding</Text>
                            <Text style={styles.finalPageText1}>Alcohol</Text>
                            <Text style={styles.finalPageText1}>Smoking</Text>
                            <Text style={styles.finalPageText1}>Menstrual Cycle</Text>
                            <Text style={styles.finalPageText1}>Breast Cancer History</Text>
                        </View>
                        <View>
                            <Text style={styles.finalPageText2}>{this.state.dateOfBirth.toLocaleDateString()}</Text>
                            <Text style={styles.finalPageText2}>{this.state.height}m</Text>
                            <Text style={styles.finalPageText2}>{this.state.weight}kg</Text>
                            <Text style={styles.finalPageText2}>{this.state.ageOfFirstPeriod} years</Text>
                            <Text style={styles.finalPageText2}>{this.state.maritalStatus}</Text>
                            <Text style={styles.finalPageText2}>{this.state.breastFeeding}</Text>
                            <Text style={styles.finalPageText2}>{this.state.alcohol}</Text>
                            <Text style={styles.finalPageText2}>{this.state.smoking}</Text>
                            <Text style={styles.finalPageText2}>{this.state.menstrualCycle}</Text>
                            <Text style={styles.finalPageText2}>{this.state.breastCancerHistory}</Text>
                        </View>
                    </View>*/}
                    <ScrollView>
                        <View style={{backgroundColor: 'white', flex: 1, borderRadius: 25, padding: 15}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>What is your Date of Birth?</Text>
                            <Text style={{fontSize: 18, marginTop: 5}}>{this.state.dateOfBirth.toDateString()}</Text>
                        </View>
                        <View style={{backgroundColor: 'white', flex: 1, borderRadius: 25, padding: 15, marginTop: 15}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>What is your Height?</Text>
                            <Text style={{fontSize: 18, marginTop: 5}}>{this.state.height} meters</Text>
                        </View>
                        <View style={{backgroundColor: 'white', flex: 1, borderRadius: 25, padding: 15, marginTop: 15}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>What is your Weight?</Text>
                            <Text style={{fontSize: 18, marginTop: 5}}>{this.state.weight} kilograms</Text>
                        </View>
                        <View style={{backgroundColor: 'white', flex: 1, borderRadius: 25, padding: 15, marginTop: 15}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>What is your Age at First Period?</Text>
                            <Text style={{fontSize: 18, marginTop: 5}}>{this.state.ageOfFirstPeriod} years</Text>
                        </View>
                        <View style={{backgroundColor: 'white', flex: 1, borderRadius: 25, padding: 15, marginTop: 15}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>What is your Marital Status?</Text>
                            <Text style={{fontSize: 18, marginTop: 5}}>{this.state.maritalStatus}</Text>
                        </View>
                        <View style={{backgroundColor: 'white', flex: 1, borderRadius: 25, padding: 15, marginTop: 15}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Have you ever done Breast Feeding?</Text>
                            <Text style={{fontSize: 18, marginTop: 5}}>{this.state.breastFeeding}</Text>
                        </View>
                        <View style={{backgroundColor: 'white', flex: 1, borderRadius: 25, padding: 15, marginTop: 15}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Are you an Alcoholic?</Text>
                            <Text style={{fontSize: 18, marginTop: 5}}>{this.state.alcohol}</Text>
                        </View>
                        <View style={{backgroundColor: 'white', flex: 1, borderRadius: 25, padding: 15, marginTop: 15}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Do you Smoke?</Text>
                            <Text style={{fontSize: 18, marginTop: 5}}>{this.state.smoking}</Text>
                        </View>
                        <View style={{backgroundColor: 'white', flex: 1, borderRadius: 25, padding: 15, marginTop: 15}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Do you have a Menstrual Cycle?</Text>
                            <Text style={{fontSize: 18, marginTop: 5}}>{this.state.menstrualCycle}</Text>
                        </View>
                        <View style={{backgroundColor: 'white', flex: 1, borderRadius: 25, padding: 15, marginTop: 15}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Is there any close relation of yours had breast cancer history?</Text>
                            <Text style={{fontSize: 18, marginTop: 5}}>{this.state.breastCancerHistory}</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={{flex:2}}>
                    <TouchableOpacity style={styles.predictButton} onPress={() => this.startPrediction()}>
                        <Text style={styles.buttonText}>Start Prediction</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default SummaryPage;

//CSS styles
const styles = StyleSheet.create({
    finalPageText1: {
        fontSize: 20,
        padding: 5,
        color: "#ED3030",
        fontWeight: "bold"
    },
    finalPageText2: {
        fontSize: 20,
        padding: 5,
    },
    summaryTitle: {
        fontWeight: 'bold',
        fontSize: 35,
        textAlign: 'center',
        paddingBottom: 50,
        paddingTop: 20
    },
    predictButton: {
        alignItems: 'center',
        backgroundColor: '#ED3030',
        padding: 10,
        //marginBottom: 10,
        width: 350,
        borderRadius: 25,
        alignSelf: 'center',
        marginTop: 20
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    },
})
