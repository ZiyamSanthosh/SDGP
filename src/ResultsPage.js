import * as React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Image, TextInput, ScrollView} from 'react-native';
import safe from './Images/Ratings/safe.png'
import moderate from './Images/Ratings/moderate.png'
import beAlert from './Images/Ratings/BeAlert.png'
import atRisk from './Images/Ratings/AtRisk.png'
import critical from './Images/Ratings/critical.png'

class ResultsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ratingString: 'moderate'
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

    render () {
        return (
            <View style={{flex: 1, backgroundColor: '#e0dede'}}>
                <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Results</Text>
                </View>
                <View style={{flex: 14, padding: 20}}>
                    <View style={{flex: 5, backgroundColor: 'white', borderRadius: 25, alignItems: 'center', padding: 15, paddingTop: 30}}>
                        <Image source={this.selectRatingImage(this.state.ratingString)} style={{width: 180, height: 180}}/>
                        <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: 15}}>{this.state.ratingString.toUpperCase()}</Text>
                        <Text>{this.renderSubMessage(this.state.ratingString)}</Text>
                    </View>
                    <View style={{flex: 3, backgroundColor: 'white', borderRadius: 25, marginTop: 15, padding: 20}}>
                        <ScrollView>
                            <Text style={{textAlign: 'justify',}}>
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
                                Nulla sed magna quis dolor malesuada placerat. Curabitur ullamcorper non odio ac tempus.
                                Fusce vestibulum ornare nibh id auctor. Nunc tristique sed justo quis molestie. Aliquam
                                purus sapien, iaculis sed lacus vitae, porttitor rutrum massa. Cras commodo odio quis
                                dignissim elementum. Orci varius natoque penatibus et magnis dis parturient montes,
                                nascetur ridiculus mus. Fusce vestibulum lectus finibus turpis efficitur, ut
                                venenatis metus ultricies. Nulla id purus sit amet neque congue dictum vel id lacus.
                                Donec non efficitur dui. Donec lobortis rhoncus tortor, eu laoreet leo auctor vel.
                                Quisque ornare aliquam metus, sed facilisis sapien fringilla eu. Integer rutrum
                                ullamcorper ante, et placerat leo finibus vel. Maecenas a risus et nisl ullamcorper
                                posuere ac et metus. Aliquam erat volutpat.
                            </Text>
                        </ScrollView>
                    </View>
                    <View style={{flex: 1, marginTop: 15}}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Back to Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default ResultsPage

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
