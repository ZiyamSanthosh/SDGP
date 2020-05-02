import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FrontPage from './src/FrontPage.js'
import LogIn from './src/LogIn';
import SignUp from './src/SignUp';
import InitialDetails from './src/InitialDetails';
import SummaryPage from './src/SummaryPage';
import HomeScreen from './src/HomeScreen';
import AboutUs from './src/AboutUs';
import ResultsPage from './src/ResultsPage';
import Profile from './src/Profile';
import DailyTracking from "./src/DailyTracking";
import ViewAllPredictions from "./src/ViewAllPredictions";

//For app navigation
const stack = createStackNavigator();

function app() {
    return (
        <NavigationContainer>
            <stack.Navigator
                initialRouteName="FrontPage"
            >
                <stack.Screen
                    name="FrontPage"
                    component={FrontPage}
                    options={{headerShown: false}}
                />
                <stack.Screen
                    name="LogIn"
                    component={LogIn}
                    options={{headerShown: false}}
                />
                <stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{headerShown: false}}
                />
                <stack.Screen
                    name="InitialDetails"
                    component={InitialDetails}
                    options={{headerShown: false}}
                />
                <stack.Screen
                    name="SummaryPage"
                    component={SummaryPage}
                    options={{headerShown: false}}
                />
                <stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{headerShown: false}}
                />
                <stack.Screen
                    name="AboutUs"
                    component={AboutUs}
                    options={{headerShown: false}}
                />
                <stack.Screen
                    name="ResultsPage"
                    component={ResultsPage}
                    options={{headerShown: false}}
                />
                <stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{headerShown: false}}
                />
                <stack.Screen
                    name="DailyTracking"
                    component={DailyTracking}
                    options={{headerShown: false}}
                />
                <stack.Screen
                    name="ViewAllPredictions"
                    component={ViewAllPredictions}
                    options={{headerShown: false}}
                />
            </stack.Navigator>
        </NavigationContainer>
    );
}

export default app;
