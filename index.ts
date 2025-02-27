import { registerRootComponent } from 'expo';
import App from './App';
import { AppRegistry } from 'react-native';

const appName = "sharekin"; // Set your app name here manually

AppRegistry.registerComponent(appName, () => App);
registerRootComponent(App);

