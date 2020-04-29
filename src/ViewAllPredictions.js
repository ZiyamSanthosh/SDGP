import * as React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Image, TextInput,ScrollView} from 'react-native';
import axios from 'axios'
import safe from './Images/Ratings/safe.png'
import moderate from './Images/Ratings/moderate.png'
import beAlert from './Images/Ratings/BeAlert.png'
import atRisk from './Images/Ratings/AtRisk.png'
import critical from './Images/Ratings/critical.png'

class ViewAllPredictions extends Component {

    constructor(props) {
        super(props);
        const {userId} = this.props.route.params
        this.state = {
            userId: userId,
            allPredictions: []
        }
    }

    componentDidMount() {
        const data = {
            "userId": this.state.userId
        }
        axios.patch('http://10.0.2.2:8000/api/track/', data)
            .then((response) => {
                //console.log(response)
                //console.log(response.data)
                //console.log(response.data.allPredictions)
                console.log(data)
                this.setState({
                    allPredictions: response.data.allPredictions
                }, ()=> console.log(this.state.allPredictions))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getResultName = (result) => {
        if (result===1){
            return 'Safe'
        } else if (result===2){
            return 'Moderate'
        } else if (result===3){
            return 'Be Alert'
        } else if (result===4){
            return 'At Risk'
        } else if (result===5){
            return 'Critical'
        }
    }

    getResultIcon = (result) => {
        if (result===1){
            return safe
        } else if (result===2){
            return moderate
        } else if (result===3){
            return beAlert
        } else if (result===4){
            return atRisk
        } else if (result===5){
            return critical
        }
    }

    render () {
        return (
            <View style={{backgroundColor: '#e0dede', flex:1}}>
                <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>All Predictions</Text>
                </View>
                <View style={{flex: 11.5, padding: 20}}>
                    <ScrollView>
                        <View>
                            {this.state.allPredictions.map(
                                (val, key) =>
                                    <View key={key} style={{backgroundColor: 'white', marginBottom: 10, borderRadius: 25, padding: 15, flexDirection: 'row'}}>
                                        <View>
                                            <Image source={this.getResultIcon(val.AveragePrediction)} style={{width: 100, height: 100}} />
                                        </View>
                                        <View style={{padding: 20}}>
                                            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{this.getResultName(val.AveragePrediction)}</Text>
                                            <Text>Predicted Date: {val.PredictedDate}</Text>
                                        </View>
                                    </View>
                            )}
                        </View>
                    </ScrollView>
                </View>
                <View style={{flex: 1.5}}>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        backgroundColor: '#ED3030',
                        padding: 10,
                        marginBottom: 10,
                        width: 370,
                        borderRadius: 25,
                        alignSelf: 'center',
                    }} onPress={() => this.props.navigation.goBack()}>
                        <Text style={{
                            fontSize: 20,
                            color: 'white'
                        }}>Back to home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default ViewAllPredictions;
