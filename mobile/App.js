import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar, YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

import Routes from './src/routes';

export default function App() {
  return (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
    <Routes />
  </>
  );
}

