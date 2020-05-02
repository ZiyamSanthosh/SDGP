import * as React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import safe from './Images/Ratings/safe.png'
import moderate from './Images/Ratings/moderate.png'
import beAlert from './Images/Ratings/BeAlert.png'
import atRisk from './Images/Ratings/AtRisk.png'
import critical from './Images/Ratings/critical.png'
import axios from 'axios'

class ResultsPage extends Component {

    constructor(props) {
        super(props);
        const {fullName, email, password, userId, result} = this.props.route.params
        this.state = {
            fullName: fullName,
            email: email,
            password: password,
            userId: userId,
            result: result,
            factor: null,
            factorMessage: null
        }
    }

    //receive data from backend to display
    componentDidMount() {
        const data = {
            "userId": this.state.userId
        }
        axios.put("http://10.0.2.2:8000/api/track/", data)
            .then((response) => {
                this.setState({
                    factor: response.data.Artical.Keyword,
                    factorMessage: response.data.Artical.Description
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //function to choose the rating image according to the rating
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

    //function to choose the correct term according to the rating
    renderRating = (rating) => {
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

    //function to choose the message according to the rating
    renderSubMessage = (rating) => {
        if (rating===1){
            return "Your risk possibility is between 0-20%"
        } else if (rating===2){
            return "Your risk possibility is between 20-40%"
        } else if (rating===3){
            return "Your risk possibility is between 40-60%"
        } else if (rating===4){
            return "Your risk possibility is between 60-80%"
        } else if (rating===5){
            return "Your risk possibility is between 80-100%"
        }
    }

    render () {
        return (
            <View style={{flex: 1, backgroundColor: '#e0dede'}}>
                <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Results</Text>
                </View>
                <View style={{flex: 14, padding: 20}}>
                    <View style={{flex: 4.5, backgroundColor: 'white', borderRadius: 25, alignItems: 'center', padding: 15, paddingTop: 30}}>
                        <Image source={this.selectRatingImage(this.state.result)} style={{width: 180, height: 180}}/>
                        <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: 15}}>{this.renderRating(this.state.result)}</Text>
                        <Text>{this.renderSubMessage(this.state.result)}</Text>
                    </View>
                    <View style={{flex: 3.5, backgroundColor: 'white', borderRadius: 25, marginTop: 15, padding: 20}}>
                        <ScrollView>
                            <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center', marginBottom: 5}}>{this.state.factor}</Text>
                            <Text style={{textAlign: 'justify',}}>{this.state.factorMessage}</Text>
                        </ScrollView>
                    </View>
                    <View style={{flex: 1, marginTop: 15}}>
                        <TouchableOpacity style={styles.button} onPress={() => {
                                this.props.navigation.navigate("HomeScreen", {userId: this.state.userId})
                            }
                        }>
                            <Text style={styles.buttonText}>Back to Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default ResultsPage

//CSS Styles
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
        marginBottom: 10
    },
})
