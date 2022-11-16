import React from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import { COLORS } from '../../utils/colors'
import Header from '../../components/Header.js'

const dummyNotif = [
  {
    title: 'Notif Title',
    description: 'Notif Description'
  },
  {
    title: 'Notif Title',
    description: 'Notif Description'
  },
  {
    title: 'Notif Title',
    description: 'Notif Description'
  },
]

const Notifikasi = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Header title='Notifikasi' />
      {/* Content */}
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          { dummyNotif.map((item, index) => (
            <Pressable
              key={index}
              style={styles.notifCard}
              onPress={() => navigation.navigate('Notifikasi Detail')}
            >
              <Text style={styles.notifTitle}>{item.title}</Text>
              <Text style={styles.notifDesc}>{item.description}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

export default Notifikasi

const styles = StyleSheet.create({
  content: {
    flex: 1, 
    padding: 14, 
    backgroundColor: COLORS.WHITE
  },
  notifCard: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    padding: 16,
    marginBottom: 18
  },
  notifTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.BLACK
  },
  notifDesc: {
    fontSize: 14,
    color: COLORS.BLACK
  }
})