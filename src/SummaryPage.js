import * as React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Image, TextInput} from 'react-native';
import style from 'react-native-datepicker/style';

class SummaryPage extends Component {

    constructor(props) {
        super(props);
        const {fullName, email, password, confirmPassword, dateOfBirth, height, weight, ageOfFirstPeriod, maritalStatus,
            breastFeeding, alcohol, smoking, menstrualCycle, breastCancerHistory} = this.props.route.params
        this.state = {
            fullName: fullName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
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
        }
    }

    render () {
        return(
            <View style={{backgroundColor: 'white', flex:1, justifyContent: 'center', padding: 15}}>
                <Text style={styles.summaryTitle}>Summary</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center', padding: 10}}>
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
                </View>
                <TouchableOpacity style={styles.predictButton}>
                    <Text style={styles.buttonText}>Start Prediction</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default SummaryPage;

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
        marginTop: 50
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    },
})
