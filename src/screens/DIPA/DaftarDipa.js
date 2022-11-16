import React from 'react'
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../utils/colors'
import Header from '../../components/Header'

const dummyDipa = [
    {
        nama: 'Nama DIPA',
        nrp: 'NRP',
        pangkat: 'Pangkat',
        jabatan: 'Jabatan',
        bagian: 'Bagian',
        img: require('../../assets/images/pp.jpg')
    },
    {
        nama: 'Nama DIPA',
        nrp: 'NRP',
        pangkat: 'Pangkat',
        jabatan: 'Jabatan',
        bagian: 'Bagian',
        img: require('../../assets/images/pp.jpg')
    },
    {
        nama: 'Nama DIPA',
        nrp: 'NRP',
        pangkat: 'Pangkat',
        jabatan: 'Jabatan',
        bagian: 'Bagian',
        img: require('../../assets/images/pp.jpg')
    },
]

const DaftarDipa = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Header title='Daftar DIPA' />
      {/* Content */}
        <ScrollView style={{ backgroundColor: COLORS.WHITE }} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
            { dummyDipa.map((item, index) => (
                <Pressable
                    key={index}
                    style={styles.card}
                    onPress={() => navigation.navigate('Detail Dipa', item)}
                >
                    <Text style={styles.anggotaTitle}>{item.nama}</Text>
                    <Text style={styles.anggotaTitle}>{item.nrp}</Text>
                    <Text style={styles.anggotaText}>{item.pangkat}</Text>
                    <Text style={styles.anggotaText}>{item.bagian}</Text>
                </Pressable>
            ))}
        </View>
        </ScrollView>
    </View>
  )
}

export default DaftarDipa

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