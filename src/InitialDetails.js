import * as React from 'react';
import {Component} from 'react';
import {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Image, TextInput, Platform, Alert} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StackNavigator from '@react-navigation/stack/src/navigators/createStackNavigator';
import infoIcon2 from './Images/info2.png';
import dateIcon from './Images/date.png';
import weightIcon from './Images/weight.png';
import firstPeriodIcon from './Images/firstPeriod.png';
import maritalStatusIcon from './Images/status.png';
import breastFeedingIcon from './Images/Breastfeeding.png';
import alcoholIcon from './Images/alcohol.png';
import smokeIcon from './Images/cigarette.png';
import menstruationIcon from './Images/menstruation.png';
import medicalHistoryIcon from './Images/medicalHistory.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import {RadioGroup, RadioButton} from 'react-native-custom-radio-button';
import { TagSelect } from 'react-native-tag-select';
import {color} from 'react-native-reanimated';
import DatePicker from 'react-native-datepicker';

const stack = createStackNavigator();

class initialDetails extends Component {

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
            breastCancerHistory: null
        }
    }

    render() {

        return (
            /*<NavigationContainer>*/
                <stack.Navigator>
                    <stack.Screen
                        name="InitialPage"
                        component={GatherInfo}
                        options={{headerShown: false,}}
                    />
                    <stack.Screen
                        name="Question 1"
                        component={Question1}
                        options={{
                            title: "1 of 10",
                            headerStyle: {backgroundColor: '#ED3030'},
                            headerTintColor: 'white',
                        }}
                    />
                    <stack.Screen
                        name="Question 2"
                        component={Question2}
                        options={{
                            title: "2 of 10",
                            headerStyle: {backgroundColor: '#ED3030'},
                            headerTintColor: 'white',
                        }}
                    />
                    <stack.Screen
                        name="Question 3"
                        component={Question3}
                        options={{
                            title: "3 of 10",
                            headerStyle: {backgroundColor: '#ED3030'},
                            headerTintColor: 'white',
                        }}
                    />
                    <stack.Screen
                        name="Question 4"
                        component={Question4}
                        options={{
                            title: "4 of 10",
                            headerStyle: {backgroundColor: '#ED3030'},
                            headerTintColor: 'white',
                        }}
                    />
                    <stack.Screen
                        name="Question 5"
                        component={Question5}
                        options={{
                            title: "5 of 10",
                            headerStyle: {backgroundColor: '#ED3030'},
                            headerTintColor: 'white',
                        }}
                    />
                    <stack.Screen
                        name="Question 6"
                        component={Question6}
                        options={{
                            title: "6 of 10",
                            headerStyle: {backgroundColor: '#ED3030'},
                            headerTintColor: 'white',
                        }}
                    />
                    <stack.Screen
                        name="Question 7"
                        component={Question7}
                        options={{
                            title: "7 of 10",
                            headerStyle: {backgroundColor: '#ED3030'},
                            headerTintColor: 'white',
                        }}
                    />
                    <stack.Screen
                        name="Question 8"
                        component={Question8}
                        options={{
                            title: "8 of 10",
                            headerStyle: {backgroundColor: '#ED3030'},
                            headerTintColor: 'white',
                        }}
                    />
                    <stack.Screen
                        name="Question 9"
                        component={Question9}
                        options={{
                            title: "9 of 10",
                            headerStyle: {backgroundColor: '#ED3030'},
                            headerTintColor: 'white',
                        }}
                    />
                    <stack.Screen
                        name="Question 10"
                        component={Question10}
                        options={{
                            title: "10 of 10",
                            headerStyle: {backgroundColor: '#ED3030'},
                            headerTintColor: 'white',
                        }}
                    />
                </stack.Navigator>
            /*</NavigationContainer>*/
        );
    }
}

function GatherInfo({navigation}) {
    return (
        <View style={styles.mainView}>
            <Text style={styles.title}>SignUp Successful!</Text>
            <Image source={infoIcon2} style={styles.infoIcon}/>
            <Text style={styles.subTitle}>Let's begin with some information gathering!</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Question 1')}>
                <Text style={styles.buttonText} >Get Started</Text>
            </TouchableOpacity>
        </View>
    );
}

function Question1({navigation}) {

    /*const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    }

    const showDatePicker = () => {
        showMode('date');
    }*/

    return (
        <View style={styles.Q1View}>
            <Image source={dateIcon} style={styles.dateIcon}/>
            <Text style={styles.questionText}>What is your Date of Birth?</Text>
            {/*<TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
                <Text style={styles.dateButtonText}>Show Date Picker</Text>
            </TouchableOpacity>*/}

            {/*{show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    mode={mode}
                    is24hours={true}
                    display="spinner"
                    onChange={onChange}
                    maximumDate={new Date()}
                />
            )}*/}

            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 2')}>
                <Text style={styles.buttonText}>Next Question</Text>
            </TouchableOpacity>
        </View>
    )
}

function Question2({navigation}) {
    return (
        <View style={styles.Q2View}>
            <Image source={dateIcon} style={styles.dateIcon}/>
            <Text style={styles.questionText}>What's your Height?</Text>
            <TextInput
                placeholder="Enter in meters"
                style={{
                    height: 50,
                    borderBottomWidth: 1,
                    borderColor: 'silver',
                    backgroundColor: '#e8e6e6',
                    marginTop: 10,
                    textAlign: 'center',
                    fontSize: 20,
                    borderRadius: 25,
                    width: 350,
                    alignSelf: 'center'
                }}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 3')}>
                <Text style={styles.buttonText}>Next Question</Text>
            </TouchableOpacity>
        </View>
    );
}

function Question3({navigation}) {
    return (
        <View style={styles.Q2View}>
            <Image source={weightIcon} style={styles.dateIcon}/>
            <Text style={styles.questionText}>What's your Weight?</Text>
            <TextInput
                placeholder="Enter in kilograms"
                style={{
                    height: 50,
                    borderBottomWidth: 1,
                    borderColor: 'silver',
                    backgroundColor: '#e8e6e6',
                    marginTop: 10,
                    textAlign: 'center',
                    fontSize: 20,
                    borderRadius: 25,
                    width: 350,
                    alignSelf: 'center'
                }}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 4')}>
                <Text style={styles.buttonText}>Next Question</Text>
            </TouchableOpacity>
        </View>
    );
}

function Question4({navigation}) {
    return (
        <View style={styles.Q2View}>
            <Image source={firstPeriodIcon} style={styles.dateIcon}/>
            <Text style={styles.questionText}>What's your age at first period?</Text>
            <TextInput
                placeholder="Enter Here"
                style={{
                    height: 50,
                    borderBottomWidth: 1,
                    borderColor: 'silver',
                    backgroundColor: '#e8e6e6',
                    marginTop: 10,
                    textAlign: 'center',
                    fontSize: 20,
                    borderRadius: 25,
                    width: 350,
                    alignSelf: 'center'
                }}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 5')}>
                <Text style={styles.buttonText}>Next Question</Text>
            </TouchableOpacity>
        </View>
    );
}

function Question5({navigation}) {
    return (
        <View style={styles.Q2View}>
            <Image source={maritalStatusIcon} style={styles.dateIcon}/>
            <Text style={styles.questionText}>What's your marital status?</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 6')}>
                <Text style={styles.buttonText}>Married</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 6')}>
                <Text style={styles.buttonText}>Living together</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 6')}>
                <Text style={styles.buttonText}>Single</Text>
            </TouchableOpacity>
        </View>
    );
}

function Question6({navigation}) {
    return (
        <View style={styles.Q2View}>
            <Image source={breastFeedingIcon} style={styles.dateIcon}/>
            <Text style={styles.questionText}>Have you ever done breastfeeding?</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 7')}>
                <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 7')}>
                <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
        </View>
    );
}

function Question7({navigation}) {
    return (
        <View style={styles.Q2View}>
            <Image source={alcoholIcon} style={styles.dateIcon}/>
            <Text style={styles.questionText}>Are you an alcoholic?</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 8')}>
                <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 8')}>
                <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
        </View>
    );
}

function Question8({navigation}) {
    return (
        <View style={styles.Q2View}>
            <Image source={smokeIcon} style={styles.dateIcon}/>
            <Text style={styles.questionText}>Do you smoke?</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 9')}>
                <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 9')}>
                <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
        </View>
    );
}

function Question9({navigation}) {
    return (
        <View style={styles.Q2View}>
            <Image source={menstruationIcon} style={styles.dateIcon}/>
            <Text style={styles.questionText}>Do you have a menstrual cycle?</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 10')}>
                <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 10')}>
                <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
        </View>
    );
}

function Question10({navigation}) {
    return (
        <View style={styles.Q2View}>
            <Image source={medicalHistoryIcon} style={styles.dateIcon}/>
            <Text style={styles.questionText}>Is there any close relation of yours had breast cancer history?</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 10')}>
                <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 10')}>
                <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
        </View>
    );
}

export default initialDetails;

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 35,
        textAlign: 'center',
        paddingBottom: 100,
        paddingTop: 20
    },
    mainView: {
        padding: 15,
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    subTitle: {
        fontSize: 19,
        textAlign: 'center',
        marginTop: 10
    },
    infoIcon: {
        height:200,
        width:200,
        alignSelf: 'center'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#ED3030',
        padding: 10,
        marginBottom: 10,
        width: 350,
        borderRadius: 25,
        alignSelf: 'center',
        marginTop: 180
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    },
    Q1View: {
        backgroundColor: 'white',
        padding: 15,
        flex: 1,
        //justifyContent: 'center',
        paddingTop: 150
    },
    questionText: {
        textAlign: 'center',
        fontSize: 23,
        marginTop: 10
    },
    datePickerStyle: {
        alignItems: 'center',
        width: 300,
        marginTop: 30
    },
    dateButton: {
        alignItems: 'center',
        backgroundColor: '#e8e6e6',
        padding: 10,
        marginBottom: 10,
        width: 350,
        borderRadius: 25,
        alignSelf: 'center',
        marginTop: 30
    },
    dateButtonText: {
        fontSize: 20,
        color: 'black'
    },
    nextButton: {
        alignItems: 'center',
        backgroundColor: '#ED3030',
        padding: 10,
        //marginBottom: 10,
        width: 350,
        borderRadius: 25,
        alignSelf: 'center',
        marginTop: 10
    },
    dateIcon: {
        height:200,
        width:200,
        alignSelf: 'center'
    },
    Q2View: {
        backgroundColor: 'white',
        padding: 15,
        flex: 1,
        //justifyContent: 'center',
        paddingTop: 150
    }
});
