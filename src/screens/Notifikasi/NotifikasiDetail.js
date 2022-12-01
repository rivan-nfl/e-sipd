import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../utils/colors'
import Header from '../../components/Header'

const NotifikasiDetail = ({ route }) => {
  const { params } = route

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Header title='Notifikasi Detail' />
      {/* Content */}
      <View style={styles.content}>
        {/* Notif Header */}
        <View style={styles.header}>
          <Text style={styles.titleText}>{params.title}</Text>
        </View>
        <View style={styles.header}>
          <Text style={[styles.contentText, { fontWeight: 'bold' }]}>{params.deskripsi}</Text>
        </View>
        {/* Notif Content */}
        <View style={styles.notifContent}>
          <Text style={styles.contentText}>{params.detail}</Text>
        </View>
      </View>
    </View>
  )
}

export default NotifikasiDetail

const styles = StyleSheet.create({
  content: {
    flex: 1, 
    padding: 14, 
    backgroundColor: COLORS.WHITE
  },
  header: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    padding: 16,
    marginBottom: 18
  },
  notifContent: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    padding: 16,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.BLACK
  },
  contentText: {
    fontSize: 14,
    color: COLORS.BLACK,
    lineHeight: 20
  }
})