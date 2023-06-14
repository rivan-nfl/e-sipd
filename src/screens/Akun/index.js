import React, { useEffect } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { COLORS } from '../../utils/colors'
import Header from '../../components/Header'
import profilePhoto from '../../assets/images/pp.png'
import CustomButton from '../../components/Button'

const Akun = () => {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.user)
  const token = useSelector(state => state.auth.token)

  const getProfile = () => {
    axios({
      method: 'GET',
      url: `http://10.0.2.2:4000/users/${profile.id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch({type: 'SAVE_USER', data: {
        id: res.data.data.id,
        nama: res.data.data.nama,
        username: res.data.data.username,
        nrp: res.data.data.nrp,
        alamat: res.data.data.alamat,
        pangkat: res.data.data.pangkat,
        bagian: res.data.data.bagian,
        foto: res.data.data.foto,
        jabatan: res.data.data.jabatan,
        role: res.data.data.role
      }})
    })
    .catch(err => {
      console.log('err =', err.response.data)
      alert(err.response.data.message)
    })
  }

  useEffect(() => getProfile(), [])

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Header title='Admin' type={true} />
      {/* Content */}
      <View style={styles.content}>
        <View style={styles.photoContainer}>
          <Image source={profile.foto ? { uri: profile.foto } : profilePhoto} style={styles.photoProfile} />
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.textProfileMenu}>{profile.nama}</Text>
          <Text style={styles.textProfileMenu}>{profile.nrp}</Text>
          <Text style={styles.textProfileMenu}>{profile.pangkat}</Text>
          <Text style={styles.textProfileMenu}>{profile.jabatan}</Text>
          { profile?.bagian && profile?.role !== 'anggota' && <Text style={styles.textProfileMenu}>{profile.bagian}</Text> }
        </View>
        <View style={styles.footer}>
            <CustomButton title='Logout' onPress={() => dispatch({type: 'LOGOUT'})} />
        </View>
      </View>
    </View>
  )
}

export default Akun

const styles = StyleSheet.create({
  content: {
    flex: 1, 
    padding: 14, 
    backgroundColor: COLORS.WHITE,
    alignItems: 'center'
  },
  profileContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: COLORS.BLACK,
    paddingTop: 20,
    marginTop: 20
  },
  photoContainer: {
    backgroundColor: COLORS.WHITE,
    elevation: 10,
    borderColor: COLORS.GRAY,
    borderRadius: 8,
    overflow: 'hidden',
    width: '50%',
    height: Dimensions.get('screen').height * 0.2,
  },
  photoProfile: {
    width: '100%',
    height: '100%'
  },
  textProfileMenu: {
    textAlign: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 15
  },
  footer: {
    width: '100%',
    marginTop: 20
  },
})