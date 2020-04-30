import * as React from 'react';
import {Component} from 'react';
import {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Image, TextInput, Platform, Alert,} from 'react-native';
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
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {RadioGroup, RadioButton} from 'react-native-custom-radio-button';
import { TagSelect } from 'react-native-tag-select';
import {color, set} from 'react-native-reanimated';
import DatePicker from 'react-native-datepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DialogProgress from 'react-native-dialog-progress'

const stack = createStackNavigator();

class InitialDetails extends Component {

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
        };
    }

    render() {
        return (
            /*<NavigationContainer>*/
                <stack.Navigator>
                    <stack.Screen
                        name="InitialPage"
                        component={GatherInfo}
                        options={{headerShown: false,}}
                        initialParams={{
                            fullName: this.state.fullName,
                            email: this.state.email,
                            password: this.state.password,
                            userId: this.state.userId
                        }}
                    />
                    <stack.Screen
                        name="Question 1"
                        component={Question1}
                        options={{
                            title: "1 of 10",
                            headerStyle: {backgroundColor: '#ED3030'},
                            headerTintColor: 'white',
                        }}
                        initialParams={{
                            fullName: this.state.fullName,
                            email: this.state.email,
                            password: this.state.password,
                            userId: this.state.userId
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
                        initialParams={{
                            fullName: this.state.fullName,
                            email: this.state.email,
                            password: this.state.password,
                            userId: this.state.userId,
                            dateOfBirth: this.state.dateOfBirth
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
                        initialParams={{
                            fullName: this.state.fullName,
                            email: this.state.email,
                            password: this.state.password,
                            userId: this.state.userId,
                            dateOfBirth: this.state.dateOfBirth,
                            height: this.state.height
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
                        initialParams={{
                            fullName: this.state.fullName,
                            email: this.state.email,
                            password: this.state.password,
                            userId: this.state.userId,
                            dateOfBirth: this.state.dateOfBirth,
                            height: this.state.height,
                            weight: this.state.weight
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
                        initialParams={{
                            fullName: this.state.fullName,
                            email: this.state.email,
                            password: this.state.password,
                            userId: this.state.userId,
                            dateOfBirth: this.state.dateOfBirth,
                            height: this.state.height,
                            weight: this.state.weight,
                            ageOfFirstPeriod: this.state.ageOfFirstPeriod
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
                        initialParams={{
                            fullName: this.state.fullName,
                            email: this.state.email,
                            password: this.state.password,
                            userId: this.state.userId,
                            dateOfBirth: this.state.dateOfBirth,
                            height: this.state.height,
                            weight: this.state.weight,
                            ageOfFirstPeriod: this.state.ageOfFirstPeriod,
                            maritalStatus: this.state.maritalStatus
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
                        initialParams={{
                            fullName: this.state.fullName,
                            email: this.state.email,
                            password: this.state.password,
                            userId: this.state.userId,
                            dateOfBirth: this.state.dateOfBirth,
                            height: this.state.height,
                            weight: this.state.weight,
                            ageOfFirstPeriod: this.state.ageOfFirstPeriod,
                            maritalStatus: this.state.maritalStatus,
                            breastFeeding: this.state.breastFeeding
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
                        initialParams={{
                            fullName: this.state.fullName,
                            email: this.state.email,
                            password: this.state.password,
                            userId: this.state.userId,
                            dateOfBirth: this.state.dateOfBirth,
                            height: this.state.height,
                            weight: this.state.weight,
                            ageOfFirstPeriod: this.state.ageOfFirstPeriod,
                            maritalStatus: this.state.maritalStatus,
                            breastFeeding: this.state.breastFeeding,
                            alcohol: this.state.alcohol,
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
                        initialParams={{
                            fullName: this.state.fullName,
                            email: this.state.email,
                            password: this.state.password,
                            userId: this.state.userId,
                            dateOfBirth: this.state.dateOfBirth,
                            height: this.state.height,
                            weight: this.state.weight,
                            ageOfFirstPeriod: this.state.ageOfFirstPeriod,
                            maritalStatus: this.state.maritalStatus,
                            breastFeeding: this.state.breastFeeding,
                            alcohol: this.state.alcohol,
                            smoking: this.state.smoking,
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
                        initialParams={{
                            fullName: this.state.fullName,
                            email: this.state.email,
                            password: this.state.password,
                            userId: this.state.userId,
                            dateOfBirth: this.state.dateOfBirth,
                            height: this.state.height,
                            weight: this.state.weight,
                            ageOfFirstPeriod: this.state.ageOfFirstPeriod,
                            maritalStatus: this.state.maritalStatus,
                            breastFeeding: this.state.breastFeeding,
                            alcohol: this.state.alcohol,
                            smoking: this.state.smoking,
                            menstrualCycle: this.state.menstrualCycle
                        }}
                    />
                </stack.Navigator>
            /*</NavigationContainer>*/
        );
    }
}

function GatherInfo({navigation, route}) {
    DialogProgress.hide()
    const {fullName, email, password, userId} = route.params
    return (
        /*<View style={styles.mainView}>
            <Text>{userId}</Text>
            <Text style={styles.title}>Hello {fullName}</Text>
            {/!*<Text>{fullName}</Text>
            <Text>{email}</Text>
            <Text>{password}</Text>
            <Text>{confirmPassword}</Text>*!/}
            <Image source={infoIcon2} style={styles.infoIcon}/>
            <Text style={styles.subTitle}>Let's begin with some information gathering!</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Question 1', {
                fullName: fullName,
                email: email,
                password: password,
                userId: userId,
            })}>
                <Text style={styles.buttonText} >Get Started</Text>
            </TouchableOpacity>
        </View>*/
        <View style={{flex: 1, backgroundColor: '#e0dede'}}>
            <View style={{flex:1.2, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Initial Tracking</Text>
            </View>
            <View style={{flex: 14, padding: 20}}>
                <View style={{flex: 1.3, backgroundColor: 'white', borderRadius: 25, padding: 20, marginBottom: 20}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold'}}>Hello,</Text>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>{fullName}!</Text>
                </View>
                <View style={{flex: 6.7, backgroundColor: 'white', borderRadius: 25, padding: 20}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{marginRight: 10}}>
                            <Image source={infoIcon2} style={{height: 100, width: 100}} />
                        </View>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={{fontSize: 28, fontWeight: 'bold'}}>Information</Text>
                            <Text style={{fontSize: 28, fontWeight: 'bold'}}>Gathering</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: "#e0dede", marginTop: 20, borderRadius: 25, padding: 15}}>
                        <Text style={{fontSize: 15, textAlign: 'justify'}}>
                            Following information is gathered in order to predict the possibility of being diagnosed
                            with breast cancer. All the data which is gathered will be solely used to calculate the prediction.
                            As for the research done by professionals it is clear that sensitive details such as consumption of alcohol,
                            smoking and breast feeding have a direct impact on creating cancer cells,So in this section sensitive data likewise
                            will be collected from the user to make the prediction more accurate and reliable.
                        </Text>
                    </View>
                </View>
                <View style={{flex: 2, justifyContent: 'center'}}>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        backgroundColor: '#ED3030',
                        padding: 10,
                        marginBottom: 10,
                        width: 370,
                        borderRadius: 25,
                        alignSelf: 'center',
                        marginTop: 20
                    }} onPress={() => navigation.navigate('Question 1', {
                        fullName: fullName,
                        email: email,
                        password: password,
                        userId: userId,
                    })}>
                        <Text style={styles.buttonText} >Get Started</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

function Question1({navigation, route}) {
    const {fullName, email, password, userId} = route.params

    const [date, setDate] = useState(new Date());
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
    }

    return (
        <View style={styles.Q1View}>
            {/*<Text>{fullName}</Text>
            <Text>{email}</Text>
            <Text>{password}</Text>
            <Text>{confirmPassword}</Text>*/}
            <Image source={dateIcon} style={styles.dateIcon}/>
            <Text style={styles.questionText}>What is your Date of Birth?</Text>
            <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
                <Text style={styles.dateButtonText}>Show Date Picker</Text>
            </TouchableOpacity>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={new Date()}
                    mode={mode}
                    is24hours={true}
                    display="spinner"
                    onChange={onChange}
                    maximumDate={new Date()}
                />
            )}

            {/*<DatePicker
                style={{width: 300, alignSelf: 'center'}}
                date={new Date()}
                mode="date"
                placeholder="Select DOB"
                format="DD-MM-YYYY"
                maxDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                }}
                onDateChange={(value) => {console.log(value)}}
            />*/}

            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 2', {
                fullName: fullName,
                email: email,
                password: password,
                userId: userId,
                dateOfBirth: date,
            })}>
                <Text style={styles.buttonText}>Next Question</Text>
            </TouchableOpacity>
        </View>
    )
}

function Question2({navigation, route}) {
    const {fullName, email, password, userId, dateOfBirth } = route.params
    const [answer, setAnswer] = useState(null)
    return (
        <View style={styles.Q2View}>
            <Image source={dateIcon} style={styles.dateIcon}/>
            {/*<Text>{fullName}</Text>
            <Text>{email}</Text>
            <Text>{password}</Text>
            <Text>{confirmPassword}</Text>
            <Text>{dateOfBirth.toDateString()}</Text>*/}
            <Text style={styles.questionText}>What's your Height? </Text>
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
                onChangeText={(value) => {
                    setAnswer(value)
                }}
            />
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 3', {
                fullName: fullName,
                email: email,
                password: password,
                userId: userId,
                dateOfBirth: dateOfBirth,
                height: answer
            })}>
                <Text style={styles.buttonText}>Next Question</Text>
            </TouchableOpacity>
        </View>
    );
}

function Question3({navigation, route}) {
    const {fullName, email, password, userId, dateOfBirth, height } = route.params
    const [answer, setAnswer] = useState(null)
    return (
        <View style={styles.Q2View}>
            {/*<Text>{fullName}</Text>
            <Text>{email}</Text>
            <Text>{password}</Text>
            <Text>{confirmPassword}</Text>
            <Text>{dateOfBirth.toDateString()}</Text>
            <Text>{height}</Text>*/}
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
                onChangeText={(value) => {
                    setAnswer(value)
                }}
            />
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 4', {
                fullName: fullName,
                email: email,
                password: password,
                userId: userId,
                dateOfBirth: dateOfBirth,
                height: height,
                weight: answer
            })}>
                <Text style={styles.buttonText}>Next Question</Text>
            </TouchableOpacity>
        </View>
    );
}

function Question4({navigation, route}) {
    const {fullName, email, password, userId, dateOfBirth, height, weight} = route.params
    const [answer, setAnswer] = useState(null);
    return (
        <View style={styles.Q2View}>
            {/*<Text>{fullName}</Text>
            <Text>{email}</Text>
            <Text>{password}</Text>
            <Text>{confirmPassword}</Text>
            <Text>{dateOfBirth.toDateString()}</Text>
            <Text>{height}</Text>
            <Text>{weight}</Text>*/}
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
                onChangeText={(value) => {
                    setAnswer(value)
                }}
            />
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 5', {
                fullName: fullName,
                email: email,
                password: password,
                userId: userId,
                dateOfBirth: dateOfBirth,
                height: height,
                weight: weight,
                ageOfFirstPeriod: answer
            })}>
                <Text style={styles.buttonText}>Next Question</Text>
            </TouchableOpacity>
        </View>
    );
}

function Question5({navigation, route}) {
    const {fullName, email, password, userId, dateOfBirth, height, weight, ageOfFirstPeriod} = route.params
    return (
        <View style={styles.Q2View}>
            <Image source={maritalStatusIcon} style={styles.dateIcon}/>
            <Text style={styles.questionText}>What's your marital status?</Text>
            {/*<Text>{fullName}</Text>
            <Text>{email}</Text>
            <Text>{password}</Text>
            <Text>{confirmPassword}</Text>
            <Text>{dateOfBirth.toDateString()}</Text>
            <Text>{height}</Text>
            <Text>{weight}</Text>
            <Text>{ageOfFirstPeriod}</Text>*/}
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 6', {
                fullName: fullName,
                email: email,
                password: password,
                userId: userId,
                dateOfBirth: dateOfBirth,
                height: height,
                weight: weight,
                ageOfFirstPeriod: ageOfFirstPeriod,
                maritalStatus: "Married"
            })}>
                <Text style={styles.buttonText}>Married</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 6', {
                fullName: fullName,
                email: email,
                password: password,
                userId: userId,
                dateOfBirth: dateOfBirth,
                height: height,
                weight: weight,
                ageOfFirstPeriod: ageOfFirstPeriod,
                maritalStatus: "Living together"
            })}>
                <Text style={styles.buttonText}>Living together</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 6', {
                fullName: fullName,
                email: email,
                password: password,
                userId: userId,
                dateOfBirth: dateOfBirth,
                height: height,
                weight: weight,
                ageOfFirstPeriod: ageOfFirstPeriod,
                maritalStatus: "Single"
            })}>
                <Text style={styles.buttonText}>Single</Text>
            </TouchableOpacity>
        </View>
    );
}

function Question6({navigation, route}) {
    const {fullName, email, password, userId, dateOfBirth, height, weight, ageOfFirstPeriod,
        maritalStatus} = route.params
    return (
        <View style={styles.Q2View}>
            <Image source={breastFeedingIcon} style={styles.dateIcon}/>
            <Text style={styles.questionText}>Have you ever done breastfeeding?</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 7', {
                fullName: fullName,
                email: email,
                password: password,
                userId: userId,
                dateOfBirth: dateOfBirth,
                height: height,
                weight: weight,
                ageOfFirstPeriod: ageOfFirstPeriod,
                maritalStatus: maritalStatus,
                breastFeeding: "Yes"
            })}>
                <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 7', {
                fullName: fullName,
                email: email,
                password: password,
                userId: userId,
                dateOfBirth: dateOfBirth,
                height: height,
                weight: weight,
                ageOfFirstPeriod: ageOfFirstPeriod,
                maritalStatus: maritalStatus,
                breastFeeding: "No"
            })}>
                <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
        </View>
    );
}

function Question7({navigation, route}) {
    const {fullName, email, password, userId, dateOfBirth, height, weight, ageOfFirstPeriod,
        maritalStatus, breastFeeding} = route.params
    return (
        <View style={styles.Q2View}>
            <Image source={alcoholIcon} style={styles.dateIcon}/>
            <Text style={styles.questionText}>Are you an alcoholic?</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 8', {
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
                alcohol: "Yes"
            })}>
                <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 8', {
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
                alcohol: "No"
            })}>
                <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
        </View>
    );
}

function Question8({navigation, route}) {
    const {fullName, email, password, userId, dateOfBirth, height, weight, ageOfFirstPeriod,
        maritalStatus, breastFeeding, alcohol} = route.params
    return (
        <View style={styles.Q2View}>
            <Image source={smokeIcon} style={styles.dateIcon}/>
            <Text style={styles.questionText}>Do you smoke?</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 9', {
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
                smoking: "Yes"
            })}>
                <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 9', {
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
                smoking: "No"
            })}>
                <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
        </View>
    );
}

function Question9({navigation, route}) {
    const {fullName, email, password, confirmPassword, dateOfBirth, height, weight, ageOfFirstPeriod,
        maritalStatus, breastFeeding, alcohol, smoking} = route.params
    return (
        <View style={styles.Q2View}>
            <Image source={menstruationIcon} style={styles.dateIcon}/>
            <Text style={styles.questionText}>Do you have a menstrual cycle?</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 10', {
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
                menstrualCycle: "Yes"
            })}>
                <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Question 10', {
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
                menstrualCycle: "No"
            })}>
                <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
        </View>
    );
}

function Question10({navigation, route}) {
    const {fullName, email, password, userId, dateOfBirth, height, weight, ageOfFirstPeriod,
        maritalStatus, breastFeeding, alcohol, smoking, menstrualCycle} = route.params
    return (
        <View style={styles.Q2View}>
            <Image source={medicalHistoryIcon} style={styles.dateIcon}/>
            <Text style={styles.questionText}>Is there any close relation of yours had breast cancer history?</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('SummaryPage', {
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
                breastCancerHistory: "Yes"
            })}>
                <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('SummaryPage', {
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
                breastCancerHistory: "No"
            })}>
                <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
        </View>
    );
}

export default InitialDetails;

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
    },
});
