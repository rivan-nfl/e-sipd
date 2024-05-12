import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { COLORS } from '../utils/colors'

const CustomButton = ({ title = 'Button', style, buttonStyle, onPress, disabled }) => {
  return (
    <Pressable onPress={onPress} style={[styles.btn, disabled && { backgroundColor: COLORS.GRAY }, buttonStyle]} disabled={disabled}>
      <Text style={[styles.buttonText, style]}>{title}</Text>
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.GREEN,
    borderRadius: 8,
    padding: 9,
  },
  buttonText: {
      fontSize: 17,
      color: 'white',
      fontWeight: 'bold',
      textAlign:'center'
  }
})