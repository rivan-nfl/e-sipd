import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Container = ({ children, style }) => {
  return (
    <View style={[{ flex: 1, backgroundColor: 'white' }, style]}>
      { children }
    </View>
  )
}

export default Container

const styles = StyleSheet.create({})