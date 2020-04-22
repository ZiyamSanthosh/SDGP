import * as React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Image, TextInput, ScrollView} from 'react-native';
import iCureCropped from './Images/iCure-Cropped.jpg';
import infoIcon from './Images/infoIcon.png';
import userIcon from './Images/user.png';
import iCureText from './Images/iCure-TextOnly.jpg';
import safe from './Images/Ratings/safe.png'
import moderate from './Images/Ratings/moderate.png'
import beAlert from './Images/Ratings/BeAlert.png'
import atRisk from './Images/Ratings/AtRisk.png'
import critical from './Images/Ratings/critical.png'

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "Scarlett Johannson",
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
            breastCancerHistory: null,
            lastPredictedDate: new Date(),
            lastRatingString: 'safe'
        }
    }

    selectRatingImage = (rating) => {
        if (rating==="safe"){
            return safe
        } else if (rating==="moderate"){
            return moderate
        } else if (rating==="be alert"){
            return beAlert
        } else if (rating==="at risk"){
            return atRisk
        } else if (rating==="critical"){
            return critical
        }
    }

    renderSubMessage = (rating) => {
        if (rating==="safe"){
            return "Your risk possibility was between 0-20%"
        } else if (rating==="moderate"){
            return "Your risk possibility was between 21-40%"
        } else if (rating==="be alert"){
            return "Your risk possibility was between 41-60%"
        } else if (rating==="at risk"){
            return "Your risk possibility was between 61-80%"
        } else if (rating==="critical"){
            return "Your risk possibility was between 81-100%"
        }
    }

    render () {
        return (
            <View style={{flex: 1, backgroundColor: '#e0dede'}}>
                <View style={{flex: 0.8, flexDirection: 'row', backgroundColor: 'white', height: 25, paddingLeft: 6, paddingRight: 6}}>
                    <View style={{flex: 9, justifyContent: 'center'}}>
                        <TouchableOpacity>
                            <Image source={iCureCropped} style={{width: 110, height: 35, resizeMode: 'contain'}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', paddingRight: 3}}>
                        <TouchableOpacity>
                            <Image source={userIcon} style={{width: 25, height: 25}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex: 4.2, backgroundColor: 'white', borderRadius: 25, margin: 18, padding: 15}}>
                    <View style={{flex:1, marginBottom: 30}}>
                        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Hello,</Text>
                        <Text style={{fontSize: 30, fontWeight: 'bold'}}>{this.state.fullName}!</Text>
                    </View>
                    <View style={{flex: 4.5, marginTop: 20}}>
                        <Text>Last Predicted: {this.state.lastPredictedDate.toDateString()}</Text>
                        <View style={{flexDirection: 'row', marginTop: 15,}}>
                            <View style={{flex:0.8}}>
                                <Image source={this.selectRatingImage(this.state.lastRatingString)} style={{width: 130, height: 130}}/>
                            </View>
                            <View style={{flex: 1.2, justifyContent: 'center'}}>
                                <Text style={{fontSize: 30, fontWeight: 'bold',}}>{this.state.lastRatingString.toUpperCase()}</Text>
                                <Text>{this.renderSubMessage(this.state.lastRatingString)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{flex: 3.2, backgroundColor: 'white', borderRadius: 25, padding: 20, margin: 15, marginTop: 0, marginBottom: 25}}>
                    <ScrollView>
                        <Text style={{textAlign: 'justify'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan,
                            turpis id luctus vestibulum, neque ex tempor sapien, sit amet molestie eros neque quis arcu.
                            Sed fringilla vulputate justo, eu ornare erat euismod vel. Nam tincidunt quam lectus,
                            nec bibendum nisi ornare ac. Etiam at blandit tellus. Vestibulum condimentum orci est,
                            sed vestibulum odio consectetur ut. Proin commodo magna ac maximus tempus. Donec vel
                            pellentesque nisi. Donec et velit venenatis, gravida orci nec, laoreet est. Pellentesque
                            vel justo semper, tempus dolor vel, pellentesque lectus. Sed consequat pulvinar urna eget
                            condimentum. Donec finibus ullamcorper ex, et vehicula tellus. Nullam imperdiet, est vel
                            molestie fringilla, ante leo hendrerit odio, vitae vestibulum nunc leo vel mi. In tincidunt
                            ultricies tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
                            cubilia curae; Phasellus vitae neque eget lectus tincidunt vestibulum.
                        </Text>
                    </ScrollView>
                </View>
                <View style={{flex: 2,}}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Update Today's Activity</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>View Previous Results</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default HomeScreen;

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
