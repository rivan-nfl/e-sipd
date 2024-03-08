import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../utils/colors'

const Content = ({ children, style }) => {
  return (
    <View style={[styles.content, style]}>
      { children }
    </View>
  )
}

export default Content

const styles = StyleSheet.create({content: {
    flex: 1, 
    padding: 14, 
    backgroundColor: COLORS.WHITE,
    alignItems: 'center'
},})