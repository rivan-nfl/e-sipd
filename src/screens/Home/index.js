import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'

import { COLORS } from '../../utils/colors'
import Header from '../../components/Header'
import logoTni from '../../assets/images/tni.png'

const adminMenu = [
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
    path: 'Daftar Perjalanan'
  },
  {
    label: 'Daftar DIPA',
    path: 'Daftar Dipa'
  },
]

const adminBottomMenu = [
  {
    label: 'Anggaran Perjalanan Dinas',
    path: 'Anggaran Perjalanan'
  },
  {
    label: 'Laporan Perjalanan Dinas',
    path: 'Laporan Perjalanan'
  },
]

const dipaBottomMenu = [
  {
    label: 'Daftar Perjalanan',
    path: 'Daftar Perjalanan'
  },
  {
    label: 'Anggaran Perjalanan Dinas',
    path: 'Anggaran Perjalanan'
  },
  {
    label: 'Laporan Perjalanan Dinas',
    path: 'Laporan Perjalanan'
  },
]

const anggotaBottomMenu = [
  {
    label: 'Daftar Perjalanan',
    path: 'Daftar Perjalanan'
  },
  {
    label: 'Laporan Perjalanan Dinas',
    path: 'Laporan Perjalanan'
  }
]

const Home = ({ navigation }) => {
  const role = useSelector(state => state.user.role)

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Header title='Home' />
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
          { role == 'admin' && adminMenu.map((item, index) => (
            <Pressable 
              key={index} 
              style={styles.menuItems}
              onPress={() => navigation.navigate(item.path)}
            >
              <Text style={styles.menuText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
        {/* Admin Bottom Menu */}
        <View style={styles.bottomMenu}>
          { role == 'admin' && adminBottomMenu.map((item, index) => (
            <Pressable 
              key={index} 
              style={styles.menuItems}
              onPress={() => navigation.navigate(item.path)}
            >
              <Text style={styles.menuText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
        {/* DIPA Bottom Menu */}
        <View style={styles.bottomMenu}>
          { role == 'dipa' && dipaBottomMenu.map((item, index) => (
            <Pressable 
              key={index} 
              style={styles.menuItems}
              onPress={() => navigation.navigate(item.path)}
            >
              <Text style={styles.menuText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
        {/* anggota Bottom Menu */}
        <View style={styles.bottomMenu}>
          { role == 'anggota' && anggotaBottomMenu.map((item, index) => (
            <Pressable 
              key={index} 
              style={styles.menuItems}
              onPress={() => navigation.navigate(item.path)}
            >
              <Text style={styles.menuText}>{item.label}</Text>
            </Pressable>
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
    backgroundColor: COLORS.WHITE,
    elevation: 10,
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