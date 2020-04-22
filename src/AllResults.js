import * as React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Image, TextInput, ScrollView} from 'react-native';
import safe from './Images/Ratings/safe.png';
import moderate from './Images/Ratings/moderate.png';
import beAlert from './Images/Ratings/BeAlert.png';
import atRisk from './Images/Ratings/AtRisk.png';
import critical from './Images/Ratings/critical.png';

class AllResults extends Component {

    constructor(props) {
        super(props);
        const results = [
            {rating: 'moderate', ratedDate: new Date(2020, 4, 10)},
            {rating: 'be alert', ratedDate: new Date()},
            {rating: 'safe', ratedDate: new Date(2020, 4, 10)},
            {rating: 'critical', ratedDate: new Date()},
            {rating: 'at risk', ratedDate: new Date(2020, 4, 10)},
            {rating: 'be alert', ratedDate: new Date()},
            {rating: 'moderate', ratedDate: new Date(2020, 4, 10)},
            {rating: 'be alert', ratedDate: new Date()},
        ]
        this.state = {
            resultsArray: results
        }
    }

    render () {

        const selectRatingImage = (rating) => {
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

        const renderSubMessage = (rating) => {
            if (rating==="safe"){
                return "Your risk possibility is between 0-20%"
            } else if (rating==="moderate"){
                return "Your risk possibility is between 21-40%"
            } else if (rating==="be alert"){
                return "Your risk possibility is between 41-60%"
            } else if (rating==="at risk"){
                return "Your risk possibility is between 61-80%"
            } else if (rating==="critical"){
                return "Your risk possibility is between 81-100%"
            }
        }

        const resultsList = this.state.resultsArray.map(
            (element, key) => {
                return (
                    <View style={{backgroundColor: 'white', borderRadius: 25, padding: 20, marginTop: 20, flexDirection: 'row'}}>
                        <View style={{flex: 1.3}}>
                            <Image source={selectRatingImage(element.rating)} style={{height: 90, width: 90}} />
                        </View>
                        <View style={{flex: 3, justifyContent: 'center'}}>
                            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{element.rating.toUpperCase()}</Text>
                            <Text style={{fontWeight: 'bold'}}>{element.ratedDate.toDateString()}</Text>
                            <Text>{renderSubMessage(element.rating)}</Text>
                        </View>
                    </View>
                );
            }
        )

        return (
            <View style={{flex: 1, backgroundColor: '#e0dede'}}>
                <View style={{flex: 1.3, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Past Predictions</Text>
                </View>
                <View style={{flex: 14, padding: 0, paddingTop: 0}}>
                    <ScrollView>
                        <View style={{flex: 1, padding: 20, paddingTop: 0}}>
                            {resultsList}
                        </View>
                    </ScrollView>
                </View>
                <View style={{flex: 1, padding: 20}}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Back To Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default AllResults

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
