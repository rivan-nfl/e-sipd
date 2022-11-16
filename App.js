import 'react-native-gesture-handler';
import React from 'react'
import { LogBox, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigation/AppStack';

// LogBox.ignoreAllLogs()

const App = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})