import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../utils/colors'

const Header = ({ title, type = '' }) => {
  return (
    <View style={{ paddingVertical: 20, paddingHorizontal: 14, backgroundColor: COLORS.GREEN, flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ height: 20, width: '20%', backgroundColor: 'red'}} />
      { !type && <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.WHITE }}>{title}</Text>}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})