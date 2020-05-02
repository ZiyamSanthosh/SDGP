import * as React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import iCureCropped from './Images/iCure-Cropped.jpg';
import userIcon from './Images/user.png';
import safe from './Images/Ratings/safe.png'
import moderate from './Images/Ratings/moderate.png'
import beAlert from './Images/Ratings/BeAlert.png'
import atRisk from './Images/Ratings/AtRisk.png'
import critical from './Images/Ratings/critical.png'
import axios from 'axios'

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        const {userId} = this.props.route.params
        this.state = {
            userId: userId,
            fullName: "Scarlett Johannson",
            email: null,
            password: null,
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
            lastPredictedDate: null,
            lastPrediction: null,
        }
    }

    //function to get data from the backend whenever the page gets focused
    componentDidMount() {
        this.initialDataRouting()
        this.fetchData = this.props.navigation.addListener('focus', () => {
            console.log('Focused')
            this.initialDataRouting()
        });
    }

    //function to unmount whenever the page gets unfocused
    componentWillUnmount() {
        this.fetchData()
    }

    //function to get details from the backend
    initialDataRouting = () => {
        axios.get("http://10.0.2.2:8000/api/users/"+this.state.userId)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    fullName: response.data.fullName,
                    email: response.data.email,
                    password: response.data.password
                })
            })
            .catch((err) => {
                console.log(err)
            })
        const data = {
            "userId": this.state.userId
        }
        axios.patch('http://10.0.2.2:8000/api/track/', data)
            .then((response) => {
                console.log(response.data.latestPrediction.AveragePrediction)
                console.log(response.data.latestPrediction.PredictedDate)
                this.setState({
                    lastPrediction: response.data.latestPrediction.AveragePrediction,
                    lastPredictedDate: response.data.latestPrediction.PredictedDate
                })
                console.log(this.state.lastPrediction)
                console.log(this.state.lastPredictedDate)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //function to get correct rating image according to the rating
    selectRatingImage = (rating) => {
        if (rating===1){
            return safe
        } else if (rating===2){
            return moderate
        } else if (rating===3){
            return beAlert
        } else if (rating===4){
            return atRisk
        } else if (rating===5){
            return critical
        }
    }

    //function to get correct message according to the rating
    renderSubMessage = (rating) => {
        if (rating===1){
            return "Your risk possibility was between 0-20%"
        } else if (rating===2){
            return "Your risk possibility was between 20-40%"
        } else if (rating===3){
            return "Your risk possibility was between 40-60%"
        } else if (rating===4){
            return "Your risk possibility was between 60-80%"
        } else if (rating===5){
            return "Your risk possibility was between 80-100%"
        }
    }

    //function to get correct term according to the rating
    renderMessage = (rating) => {
        if (rating===1){
            return "SAFE"
        } else if (rating===2){
            return "MODERATE"
        } else if (rating===3){
            return "BE ALERT"
        } else if (rating===4){
            return "AT RISK"
        } else if (rating===5){
            return "CRITICAL"
        }
    }

    render () {
        return (
            <View style={{flex: 1, backgroundColor: '#e0dede'}}>
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'white', height: 25, paddingLeft: 6, paddingRight: 6}}>
                    <View style={{flex: 9, justifyContent: 'center'}}>
                        <TouchableOpacity onPress = {() => {this.props.navigation.navigate('AboutUs')}}>
                            <Image source={iCureCropped} style={{width: 110, height: 35, resizeMode: 'contain'}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', paddingRight: 3}}>
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Profile', {userId: this.state.userId})}}>
                            <Image source={userIcon} style={{width: 25, height: 25}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex: 10, backgroundColor: 'white', borderRadius: 25, margin: 18, padding: 15}}>
                    <View style={{flex:1, marginBottom: 10}}>
                        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Hello,</Text>
                        <Text style={{fontSize: 30, fontWeight: 'bold'}}>{this.state.fullName}!</Text>
                    </View>
                    <View style={{flex: 4.5,}}>
                        <Text>Last Predicted: {this.state.lastPredictedDate}</Text>
                        <View style={{flexDirection: 'row', marginTop: 15, flex:1.2, padding: 5, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{flex:0.9, alignItems: 'center'}}>
                                <Image source={this.selectRatingImage(this.state.lastPrediction)} style={{width: 130, height: 130}}/>
                            </View>
                            <View style={{flex: 1.1, justifyContent: 'center'}}>
                                <Text style={{fontSize: 30, fontWeight: 'bold',}}>{this.renderMessage(this.state.lastPrediction)}</Text>
                                <Text>{this.renderSubMessage(this.state.lastPrediction)}</Text>
                            </View>
                        </View>
                        <View style={{backgroundColor: '#e0dede', flex: 1.8, borderRadius: 25, marginTop:20, padding: 20}}>
                            <ScrollView>
                                <Text style={{textAlign: 'justify'}}>
                                    Breast cancer is an uncontrolled growth of breast cells. To better understand breast cancer, it helps to understand how any cancer can develop.

                                    Cancer occurs as a result of mutations, or abnormal changes, in the genes responsible for regulating the growth of cells and keeping them healthy. The genes are in each cell’s nucleus, which acts as the “control room” of each cell. Normally, the cells in our bodies replace themselves through an orderly process of cell growth: healthy new cells take over as old ones die out. But over time, mutations can “turn on” certain genes and “turn off” others in a cell. That changed cell gains the ability to keep dividing without control or order, producing more cells just like it and forming a tumor.

                                    A tumor can be benign (not dangerous to health) or malignant (has the potential to be dangerous). Benign tumors are not considered cancerous: their cells are close to normal in appearance, they grow slowly, and they do not invade nearby tissues or spread to other parts of the body. Malignant tumors are cancerous. Left unchecked, malignant cells eventually can spread beyond the original tumor to other parts of the body.
                                </Text>
                            </ScrollView>
                        </View>
                    </View>
                </View>
                <View style={{flex: 3,}}>
                    <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('DailyTracking', {
                        userId: this.state.userId,
                        fullName: this.state.fullName,
                        email: this.state.email,
                        password: this.state.password
                    })}}>
                        <Text style={styles.buttonText}>Update Today's Activity</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('ViewAllPredictions', {
                        userId: this.state.userId
                    })}}>
                        <Text style={styles.buttonText}>View Previous Results</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default HomeScreen;

//CSS styles
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
