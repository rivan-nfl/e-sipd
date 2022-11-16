import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../utils/colors'
import Header from '../../components/Header'
import profilePhoto from '../../assets/images/pp.jpg' 

const Akun = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Header title='Admin' type={true} />
      {/* Content */}
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <View style={styles.photoContainer}>
            <Image source={profilePhoto} style={styles.photoProfile} />
          </View>
          <View style={styles.rightProfileMenu}>
            <Text style={styles.textProfileMenu}>Nama</Text>
            <Text style={styles.textProfileMenu}>Pangkat / NRP</Text>
            <Text style={styles.textProfileMenu}>Jabatan</Text>
          </View>
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
    backgroundColor: COLORS.WHITE
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: COLORS.BLACK,
    paddingBottom: 20
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
  rightProfileMenu: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-around'
  },
  textProfileMenu: {
    textAlign: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.BLACK
  }
})