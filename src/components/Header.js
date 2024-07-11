import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../utils/colors'
import { useSelector } from 'react-redux'

const Header = ({ title, type = '' }) => {
  const user = useSelector(state => state.user.nama)

  return (
    <View style={{ paddingVertical: 20, paddingHorizontal: 14, backgroundColor: COLORS.GREEN, flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.WHITE }}>Selamat Datang, {user}</Text>
      {!type && <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.WHITE }}>{title}</Text>}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})