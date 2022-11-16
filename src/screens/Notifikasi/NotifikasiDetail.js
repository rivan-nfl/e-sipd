import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../utils/colors'
import Header from '../../components/Header'

const NotifikasiDetail = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Header title='Notifikasi Detail' />
      {/* Content */}
      <View style={styles.content}>
        {/* Notif Header */}
        <View style={styles.header}>
          <Text style={styles.titleText}>Notifikasi Title</Text>
        </View>
        {/* Notif Content */}
        <View style={styles.notifContent}>
          <Text style={styles.contentText}>Notifikasi Detail</Text>
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