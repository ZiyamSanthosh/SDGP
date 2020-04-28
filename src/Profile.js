import * as React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Image, TextInput,ScrollView} from 'react-native';
import homeIcon from './Images/home.png';
import userIcon2 from './Images/user2.png';
import editIcon from './Images/edit.png';
import DialogInput from 'react-native-dialog-input';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

class Profile extends Component {

    constructor(props) {
        super(props);
        const {userId}=this.props.route.params
        this.state = {
            userId: userId,
            fullName: "Scarlett Johannsson",
            email: "scarlett@gmail.com",
            dateOfBirth: " ",
            height: 1.7,
            weight: 80,
            ageOfFirstPeriod: 14,
            maritalStatus: 'Living Together',
            breastFeeding: 'No',
            alcohol: 'Yes',
            smoking: 'No',
            menstrualCycle: 'Yes',
            breastCancerHistory: 'No',
            isNameAlertVisible: false,
            isHeightAlertVisible: false,
            isWeightAlertVisible: false,
            isFirstPeriodAlertVisible: false,
            isDeleteAlertVisible: false,
            password: " ",
        }
    }

    componentDidMount() {
        const data ={
            "userId": this.state.userId
        }
        axios.get("http://10.0.2.2:8000/api/users/"+this.state.userId)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    fullName: response.data.fullName,
                    email: response.data.email,
                })
                axios.post('http://10.0.2.2:8000/api/track/predict/', data)
                    .then((response) =>{
                        console.log(response.data)
                        console.log(response.data.LastData)
                        this.setState({
                            dateOfBirth: response.data.DOB,
                            height: response.data.height,
                            weight: response.data.weight,
                            ageOfFirstPeriod: response.data.LastData.Age_at_first_period,
                            maritalStatus: response.data.LastData.Marital_Status,
                            breastFeeding: response.data.LastData.BreastFeeding,
                            alcohol: response.data.LastData.Alcohol,
                            smoking: response.data.LastData.Smoking,
                            menstrualCycle: response.data.LastData.Menstrual_Cycle,
                            breastCancerHistory: response.data.LastData.Breast_Cancer_History
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getMaritalStatus = (maritalStatus)=>{
        if(maritalStatus===1){
            return 'Married'
        }else if (maritalStatus===2){
            return "Living together"
        }else if (maritalStatus===3){
            return "Single"
        }
    }

    getYesOrNo  = (factor)=>{
        if(factor===1){
            return "Yes"
        }else if(factor===0){
            return "No"
        }
    }

    updateDetails = () =>{
        const data= {
            "userId": this.state.userId,
            "dob": this.state.dateOfBirth,
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
        axios.post('http://10.0.2.2:8000/api/track/', data)
            .then((response)=>{
                console.log(response)
                this.props.navigation.navigate("HomeScreen",{userId: this.state.userId})
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    deleteAccount=()=>{
        console.log("Deleting")
        console.log(this.state.password)
        console.log(this.state.email)
        axios.delete('http://10.0.2.2:8000/api/users/remove', {data: {"email":this.state.email, "password": this.state.password}})
            .then((response)=>{
                console.log(response.data)
                console.log(JSON.stringify(response.data))
                if(JSON.stringify(response.data)==='{"error":"Invalid password, please re-check your password"}'){
                    alert("Invalid password: Please enter the correct password to delete your account!")
                }else{
                    console.log("I am gone")
                    alert("Account Deleted Successfully")
                    this.props.navigation.navigate("FrontPage")
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#e0dede'}}>
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'white', paddingLeft: 15, paddingRight: 15}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <TouchableOpacity>
                            <Image source={homeIcon} style={{width: 25, height: 25}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 9, justifyContent: 'center', paddingLeft: 130}}>
                        <Text style={{fontSize: 20}}>Profile</Text>
                    </View>
                </View>
                <View style={{flex: 13}}>
                    {/*<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={iCureLogoOnly} style={{height:100, width: 100}}/>
                    </View>*/}
                    <View style={{flex: 1.2, backgroundColor: 'white', margin: 20, borderRadius: 25, padding: 15, justifyContent: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1.3, justifyContent: 'center'}}>
                                <Image source={userIcon2} style={{height: 70, width: 70}} />
                            </View>
                            <View style={{ flex: 4, justifyContent: 'center'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{flex:2.4}}>
                                        <Text style={{fontSize: 25, fontWeight: 'bold'}}>{this.state.fullName}</Text>
                                    </View>
                                    <View style={{flex: 0.6, alignItems: 'center', justifyContent: 'center'}}>
                                        <TouchableOpacity onPress={()=>this.setState({isNameAlertVisible: true})}>
                                            <Image source={editIcon} style={{height: 20, width: 20}}/>
                                        </TouchableOpacity>
                                        <DialogInput
                                            isDialogVisible={this.state.isNameAlertVisible}
                                            title={"Edit Full Name"}
                                            //message={"Enter here"}
                                            hintInput={"Enter here"}
                                            submitInput={(inputText)=>{this.setState({fullName: inputText, isNameAlertVisible:false})}}
                                            closeDialog={()=>this.setState({isNameAlertVisible:false})}
                                            >

                                        </DialogInput>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{fontSize: 15}}>{this.state.email}</Text>
                                </View>
                            </View>
                            {/*<View style={{flex: 0.7, justifyContent: 'center',}}>
                                <TouchableOpacity onPress={() => this.setState({isNameAlertVisible: true})}>
                                    <Image source={editIcon} style={{height: 20, width: 20}} />
                                </TouchableOpacity>
                                <DialogInput
                                    isDialogVisible={this.state.isNameAlertVisible}
                                    title={"Edit Full Name"}
                                    //message={"Enter your name"}
                                    hintInput ={"Enter here"}
                                    submitInput={ (inputText) => {this.setState({fullName: inputText, isNameAlertVisible: false})} }
                                    closeDialog={ () =>this.setState({isNameAlertVisible:false})}
                                >
                                </DialogInput>
                            </View>*/}
                        </View>
                    </View>
                    <View style={{flex: 6.2, backgroundColor: 'white', margin: 20, marginTop: 0, borderRadius: 25, padding: 20}}>
                        <ScrollView>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 2.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Date Of Birth</Text>
                            </View>
                            <View style={{flex: 1.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18}}>{this.state.dateOfBirth.substr(0,10)}</Text>
                            </View>
                            <View style={{flex: 0.5, justifyContent: 'center'}}>
                                {/*<TouchableOpacity>
                                    <Image source={editIcon} style={{height: 20, width: 20}} />
                                </TouchableOpacity>*/}
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 20}}>
                            <View style={{flex: 2.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Height</Text>
                            </View>
                            <View style={{flex: 1.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18}}>{this.state.height}m</Text>
                            </View>
                            <View style={{flex: 0.5, justifyContent: 'center'}}>
                                <TouchableOpacity onPress={() => this.setState({isHeightAlertVisible: true})}>
                                    <Image source={editIcon} style={{height: 20, width: 20}} />
                                </TouchableOpacity>
                                <DialogInput
                                    isDialogVisible={this.state.isHeightAlertVisible}
                                    title={"Edit Height"}
                                    //message={"Enter your name"}
                                    hintInput ={"Enter here"}
                                    //textInputProps={{keyboardType: 'numeric'}}
                                    submitInput={ (inputText) => {this.setState({height: inputText, isHeightAlertVisible: false})} }
                                    closeDialog={ () =>this.setState({isHeightAlertVisible:false})}
                                >
                                </DialogInput>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 20}}>
                            <View style={{flex: 2.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Weight</Text>
                            </View>
                            <View style={{flex: 1.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18}}>{this.state.weight}kg</Text>
                            </View>
                            <View style={{flex: 0.5, justifyContent: 'center'}}>
                                <TouchableOpacity onPress={() => this.setState({isWeightAlertVisible: true})}>
                                    <Image source={editIcon} style={{height: 20, width: 20}} />
                                </TouchableOpacity>
                                <DialogInput
                                    isDialogVisible={this.state.isWeightAlertVisible}
                                    title={"Edit Weight"}
                                    //message={"Enter your name"}
                                    hintInput ={"Enter here"}
                                    //textInputProps={{keyboardType: 'numeric'}}
                                    submitInput={ (inputText) => {this.setState({weight: inputText, isWeightAlertVisible: false})} }
                                    closeDialog={ () =>this.setState({isWeightAlertVisible:false})}
                                >
                                </DialogInput>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 20}}>
                            <View style={{flex: 2.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Age at First Period</Text>
                                {/*<Text style={{fontSize: 18, fontWeight: 'bold'}}>Period</Text>*/}
                            </View>
                            <View style={{flex: 1.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18}}>{this.state.ageOfFirstPeriod}yrs</Text>
                            </View>
                            <View style={{flex: 0.5, justifyContent: 'center'}}>
                                <TouchableOpacity onPress={() => this.setState({isFirstPeriodAlertVisible: true})}>
                                    <Image source={editIcon} style={{height: 20, width: 20}} />
                                </TouchableOpacity>
                                <DialogInput
                                    isDialogVisible={this.state.isFirstPeriodAlertVisible}
                                    title={"Edit Age at First Period"}
                                    //message={"Enter your name"}
                                    hintInput ={"Enter here"}
                                    //textInputProps={{keyboardType: 'numeric'}}
                                    submitInput={ (inputText) => {this.setState({ageOfFirstPeriod: inputText, isFirstPeriodAlertVisible: false})} }
                                    closeDialog={ () =>this.setState({isFirstPeriodAlertVisible:false})}
                                >
                                </DialogInput>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View style={{flex: 2.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Marital Status</Text>
                            </View>
                            <View style={{flex: 1.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18}}>{this.getMaritalStatus(this.state.maritalStatus)}</Text>
                            </View>
                            <View style={{flex: 0.5, justifyContent: 'center'}}>
                                {/*<TouchableOpacity>
                                    <Image source={editIcon} style={{height: 20, width: 20}} />
                                </TouchableOpacity>*/}
                                <RNPickerSelect
                                    onValueChange={(value) => {this.setState({maritalStatus: value})}}
                                    items={[
                                        {label: 'Married', value:1},
                                        {label: 'Living Together', value: 2},
                                        {label: 'Single', value: 3}
                                    ]}
                                />
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 0}}>
                            <View style={{flex: 2.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Breast Feeding</Text>
                            </View>
                            <View style={{flex: 1.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18}}>{this.getYesOrNo(this.state.breastFeeding)}</Text>
                            </View>
                            <View style={{flex: 0.5, justifyContent: 'center'}}>
                                {/*<TouchableOpacity>
                                    <Image source={editIcon} style={{height: 20, width: 20}} />
                                </TouchableOpacity>*/}
                                <RNPickerSelect
                                    onValueChange={(value) => {this.setState({breastFeeding: value})}}
                                    items={[
                                        {label: 'Yes', value:1},
                                        {label: 'No', value: 0},
                                    ]}
                                />
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 0}}>
                            <View style={{flex: 2.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Alcohol Consumer</Text>
                            </View>
                            <View style={{flex: 1.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18}}>{this.getYesOrNo(this.state.alcohol)}</Text>
                            </View>
                            <View style={{flex: 0.5, justifyContent: 'center'}}>
                                {/*<TouchableOpacity>
                                    <Image source={editIcon} style={{height: 20, width: 20}} />
                                </TouchableOpacity>*/}
                                <RNPickerSelect
                                    onValueChange={(value) => {this.setState({alcohol: value})}}
                                    items={[
                                        {label: 'Yes', value:1},
                                        {label: 'No', value:0},
                                    ]}
                                />
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 0}}>
                            <View style={{flex: 2.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Smoker</Text>
                            </View>
                            <View style={{flex: 1.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18}}>{this.getYesOrNo(this.state.smoking)}</Text>
                            </View>
                            <View style={{flex: 0.5, justifyContent: 'center'}}>
                                {/*<TouchableOpacity>
                                    <Image source={editIcon} style={{height: 20, width: 20}} />
                                </TouchableOpacity>*/}
                                <RNPickerSelect
                                    onValueChange={(value) => {this.setState({smoking: value})}}
                                    items={[
                                        {label: 'Yes', value:1},
                                        {label: 'No', value: 0},
                                    ]}
                                />
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 0}}>
                            <View style={{flex: 2.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Menstrual Cycle</Text>
                            </View>
                            <View style={{flex: 1.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18}}>{this.getYesOrNo(this.state.menstrualCycle)}</Text>
                            </View>
                            <View style={{flex: 0.5, justifyContent: 'center'}}>
                                {/*<TouchableOpacity>
                                    <Image source={editIcon} style={{height: 20, width: 20}} />
                                </TouchableOpacity>*/}
                                <RNPickerSelect
                                    onValueChange={(value) => {this.setState({menstrualCycle: value})}}
                                    items={[
                                        {label: 'Yes', value:1},
                                        {label: 'No', value: 0},
                                    ]}
                                />
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 0}}>
                            <View style={{flex: 2.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Breast Cancer</Text>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>History for Close Relatives</Text>
                            </View>
                            <View style={{flex: 1.75, justifyContent: 'center'}}>
                                <Text style={{fontSize: 18}}>{this.getYesOrNo(this.state.breastCancerHistory)}</Text>
                            </View>
                            <View style={{flex: 0.5, justifyContent: 'center'}}>
                                {/*<TouchableOpacity>
                                    <Image source={editIcon} style={{height: 20, width: 20}} />
                                </TouchableOpacity>*/}
                                <RNPickerSelect
                                    onValueChange={(value) => {this.setState({breastCancerHistory: value})}}
                                    items={[
                                        {label: 'Yes', value:1},
                                        {label: 'No', value: 0},
                                    ]}
                                />
                            </View>
                        </View>
                        </ScrollView>
                    </View>
                    <View style={{flex: 2, alignItems: 'center'}}>
                        <TouchableOpacity style={styles.button} onPress={() => this.updateDetails()}>
                            <Text style={styles.buttonText}>Save or Return Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=>{this.setState({isDeleteAlertVisible:true})}}>
                            <Text style={styles.buttonText}>Delete Account</Text>
                        </TouchableOpacity>
                        <DialogInput
                            isDialogVisible={this.state.isDeleteAlertVisible}
                            title={"Confirm Deletion"}
                            message={"Enter your password"}
                            hintInput ={"Enter here"}
                            //textInputProps={{keyboardType: 'numeric'}}
                            submitInput={ (inputText) => {
                                console.log(inputText)
                                this.setState({
                                password: inputText,
                                isDeleteAlertVisible: false
                                },
                                    ()=>{this.deleteAccount()}
                            )
                            }}
                            closeDialog={ () =>this.setState({isDeleteAlertVisible:false})}
                        >
                        </DialogInput>
                    </View>
                </View>
            </View>
        );
    }
}

export default Profile

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
