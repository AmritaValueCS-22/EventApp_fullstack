/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppWrapper from './appWrapper';

AppRegistry.registerComponent(appName, () => AppWrapper);
