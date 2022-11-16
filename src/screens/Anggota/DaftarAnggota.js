import React from 'react'
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../utils/colors'
import Header from '../../components/Header'

const dummyAnggota = [
    {
        nama: 'Nama Anggota',
        nrp: 'NRP',
        pangkat: 'Pangkat',
        jabatan: 'Jabatan',
        img: require('../../assets/images/pp.jpg')
    },
    {
        nama: 'Nama Anggota',
        nrp: 'NRP',
        pangkat: 'Pangkat',
        jabatan: 'Jabatan',
        img: require('../../assets/images/pp.jpg')
    },
    {
        nama: 'Nama Anggota',
        nrp: 'NRP',
        pangkat: 'Pangkat',
        jabatan: 'Jabatan',
        img: require('../../assets/images/pp.jpg')
    },
]

const DaftarAnggota = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Header title='Daftar Anggota' />
      {/* Content */}
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
            { dummyAnggota.map((item, index) => (
                <Pressable
                    key={index}
                    style={styles.card}
                    onPress={() => navigation.navigate('Detail Anggota', item)}
                >
                    <View style={styles.photoContainer}>
                        <Image source={item.img} style={styles.photo} />
                    </View>
                    <Text style={styles.anggotaTitle}>{item.nama}</Text>
                    <Text style={styles.anggotaTitle}>{item.nrp}</Text>
                    <Text style={styles.anggotaText}>{item.pangkat}</Text>
                </Pressable>
            ))}
        </View>
        </ScrollView>
    </View>
  )
}

export default DaftarAnggota

const styles = StyleSheet.create({
    content: {
        flex: 1, 
        padding: 14, 
        backgroundColor: COLORS.WHITE,
        alignItems: 'center'
    },
    card: {
        backgroundColor: COLORS.WHITE,
        elevation: 10,
        borderRadius: 8,
        padding: 16,
        marginBottom: 18,
        width: '90%',
        alignItems: 'center'
    },
    photoContainer: {
        backgroundColor: COLORS.WHITE,
        elevation: 10,
        borderColor: COLORS.GRAY,
        borderRadius: 8,
        overflow: 'hidden',
        width: '60%',
        height: Dimensions.get('screen').height * 0.2,
        marginBottom: 14
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    anggotaTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.BLACK
    },
    anggotaText: {
        fontSize: 15,
        color: COLORS.BLACK
    }
})