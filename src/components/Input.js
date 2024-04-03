import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Input = ({ 
  placeholder = 'Input Here...',
  style, 
  value, 
  onChangeText, 
  secureTextEntry, 
  noBorder =false,
  ...props 
}) => {
  return <TextInput 
            placeholder={placeholder} 
            style={[styles.input, style, noBorder && { borderWidth: 0 }]} 
            secureTextEntry={secureTextEntry} 
            placeholderTextColor='gray' 
            value={value} 
            onChangeText={onChangeText} 
            {...props}
          />
}

export default Input

const styles = StyleSheet.create({
    input: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 9,
        paddingVertical: 7,
        color: 'black',
        fontSize: 17,
    }
})