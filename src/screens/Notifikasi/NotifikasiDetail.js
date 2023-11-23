import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../utils/colors'
import Header from '../../components/Header'
import CustomButton from '../../components/Button'
import { getAllPerjalanan } from '../../service/e-sipdService'
import { useSelector } from 'react-redux'

const NotifikasiDetail = ({ route, navigation }) => {
  const { params } = route
  const token = useSelector(state => state.auth.token)

  const handleDetailPerjalanan = () => {
    getAllPerjalanan(token, { perjalanan_id: params.id_perjalanan })
    .then(res => navigation.navigate('Detail Perjalanan', res.data.data[0]) )
    .catch(err => {
        console.log('err =', err.response.data)
        alert(err.response.data.message)
    })
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Header title='Notifikasi Detail' />
      {/* Content */}
      <View style={styles.content}>
        {/* Notif Header */}
        <View style={styles.header}>
          <Text style={[styles.titleText, { flex: 1 }]}>{params.title}</Text>
          <Text style={styles.titleText}>{new Date(params?.created_at).toLocaleDateString()}</Text>
        </View>
        <View style={styles.header}>
          <Text style={[styles.contentText, { fontWeight: 'bold', flex: 1 }]}>{params.deskripsi}</Text>
          <Text style={[styles.contentText, { fontWeight: 'bold' }]}>{new Date(params?.updated_at).toLocaleDateString()}</Text>
        </View>
        {/* Notif Content */}
        <View style={styles.notifContent}>
          <Text style={styles.contentText}>{params.detail}</Text>
        </View>
        {
          params.perjalanan_status == 'rejected'
          ? (
          <View style={styles.footer}>
            <CustomButton title='Pengajuan Ulang' buttonStyle={{ width: '100%' }} onPress={() => navigation.navigate('Edit ESIPD', params.id_perjalanan)} />
          </View>
          )
          :  (
            <View style={styles.footer}>
            <CustomButton title='Lihat Detail Perjalanan' buttonStyle={{ width: '100%' }} onPress={handleDetailPerjalanan} />
          </View>
          )
        }
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
    marginBottom: 18,
    flexDirection: 'row'
  },
  notifContent: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    padding: 16,
    marginBottom: 18
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
  },
  footer: {
    flexDirection: 'row', 
    width: '100%',
    justifyContent: 'space-around', 
  },
})