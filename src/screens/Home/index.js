import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../utils/colors'
import Header from '../../components/Header'
import logoTni from '../../assets/images/tni.png'

const dummyAdminMenu = [
  {
    label: 'Daftar Anggota',
    path: 'Daftar Anggota'
  },
  {
    label: 'E - SIPD',
    path: 'ESIPD'
  },
  {
    label: 'Daftar Perjalanan',
    path: ''
  },
  {
    label: 'Daftar DIPA',
    path: 'Daftar Dipa'
  },
]
const dummyAdminBottomMenu = ['Anggaran Perjalanan Dinas', 'Laporan Perjalanan Dinas']

const dummyDipaBottomMenu = ['Daftar Perjalanan', 'Anggaran Perjalanan Dinas', 'Laporan Perjalanan Dinas']
const dummyAnggotaBottomMenu = ['Daftar Perjalanan', 'Laporan Perjalanan Dinas']

const Home = ({ navigation }) => {
  const [role, setRole] = useState('admin')
  // const [role, setRole] = useState('dipa')
  // const [role, setRole] = useState('anggota')

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Header title='Admin' />
      {/* Content */}
      <View style={styles.content}>
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.menuText}>Visi</Text>
          </View>
          <View style={styles.bannerContent}>
            <Text style={styles.menuText}>Misi</Text>
          </View>
          <View style={styles.bannerContent}>
            <Image source={logoTni} style={styles.logoTni} />
          </View>
        </View>
        {/* Admin Top Menu */}
        <View style={styles.topMenu}>
          {/* Admin Menu Card */}
          { role == 'admin' && dummyAdminMenu.map((item, index) => (
            <Pressable 
              key={index} 
              style={styles.menuItems}
              onPress={() => item.label != 'Daftar Perjalanan' ? navigation.navigate(item.path) : alert('On Development')}
            >
              <Text style={styles.menuText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
        {/* Admin Bottom Menu */}
        <View style={styles.bottomMenu}>
          { role == 'admin' && dummyAdminBottomMenu.map((item, index) => (
            <View key={index} style={styles.menuItems}>
              <Text style={styles.menuText}>{item}</Text>
            </View>
          ))}
        </View>
        {/* DIPA Bottom Menu */}
        <View style={styles.bottomMenu}>
          { role == 'dipa' && dummyDipaBottomMenu.map((item, index) => (
            <View key={index} style={styles.menuItems}>
              <Text style={styles.menuText}>{item}</Text>
            </View>
          ))}
        </View>
        {/* anggota Bottom Menu */}
        <View style={styles.bottomMenu}>
          { role == 'anggota' && dummyAnggotaBottomMenu.map((item, index) => (
            <View key={index} style={styles.menuItems}>
              <Text style={styles.menuText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  content: {
    flex: 1, 
    padding: 14, 
    backgroundColor: COLORS.WHITE
  },
  banner: {
    borderWidth: 1, 
    borderColor: COLORS.GRAY, 
    borderRadius: 8, 
    padding: 10, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    height: '20%'
  },
  bannerContent: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1
  },
  logoTni: {
    width: '90%',
    height: '90%'
  },
  topMenu: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-around', 
    marginTop: 20
  },
  menuItems: {
    width: '45%', 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: COLORS.BLACK, 
    padding: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 20
  },
  bottomMenu: {
    marginTop: 10, 
    alignItems: 'center'
  },
  menuText: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
})