/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
//import FrontPage from './src/FrontPage';
import LogIn from './src/LogIn';
import SignUp from './src/SignUp';
import FrontPage from './src/FrontPage';
import initialDetails from './src/InitialDetails';

AppRegistry.registerComponent(appName, () => App);
