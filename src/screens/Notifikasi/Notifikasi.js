import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import { COLORS } from '../../utils/colors'
import Header from '../../components/Header.js'
import { useDispatch, useSelector } from 'react-redux'
import { editNotification, getAllNotifications } from '../../service/notificationService'

const Notifikasi = ({ navigation }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const userRole = useSelector(state => state.user.role)
    const dataNotifikasi = useSelector(state => state.notifikasi)

    const editNotif = (id) => {
      editNotification(id, token, { status: "open" })
      .then(response => {
        getAllNotifications(token).then(res => dispatch({type: 'SAVE_NOTIFIKASI', data: res.data.data}))
      })
      .catch(err => {
          console.log('err =', err.response.data)
          alert(err.response.data.message)
      })
    }
    return (
      <View style={{ flex: 1 }}>
        {/* Header */}
        <Header title='Notifikasi' />
        {/* Content */}
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            { dataNotifikasi.map((item, index) => (
              <Pressable
                key={index}
                style={styles.notifCard}
                onPress={() => {
                  editNotif(item.id)
                  navigation.navigate('Notifikasi Detail', item)
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  { item.status == 'close' && <View style={{ width: 20, height: 20, borderRadius: 20, marginRight: 10, backgroundColor: COLORS.RED }} /> }
                  <Text style={styles.notifTitle}>{item.title}</Text>
                </View>
                <Text style={styles.notifDesc}>{item.deskripsi}</Text>
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