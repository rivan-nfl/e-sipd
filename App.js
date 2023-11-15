import 'react-native-gesture-handler';
import React from 'react'
import { LogBox, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import store from './src/state';
import AppStack from './src/navigation/AppStack';

// LogBox.ignoreAllLogs()

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})