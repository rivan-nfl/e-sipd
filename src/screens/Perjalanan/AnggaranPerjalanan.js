import React, { useEffect, useState } from 'react'
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'

import { getAnggaran } from '../../service/e-sipdService';
import { COLORS } from '../../utils/colors'
import Header from '../../components/Header'

const AnggaranPerjalanan = () => {
    const token = useSelector(state => state.auth.token)
    const [dataPerjalanan, setDataPerjalanan] = useState([])

    // Loads
    useEffect(() => {
        getAnggaran(token)
        .then(res => {
            setDataPerjalanan(res.data.data)
        })
        .catch(err => {
            console.log('err =', err.response.data)
            alert(err.response.data.message)
        })
    }, [])

    console.log(dataPerjalanan);

    return (
        <View style={{ flex: 1 }}>
        {/* Header */}
        <Header title='Anggaran Perjalanan' />
        {/* Content */}
            <ScrollView style={{ backgroundColor: COLORS.WHITE }} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                { dataPerjalanan.map((item, index) => (
                    <Pressable
                        key={index}
                        style={styles.card}
                    >
                        <Text style={styles.anggotaTitle}>{item.pangkat}</Text>
                        <Text style={styles.anggotaTitle}>{item.tingkat}</Text>
                        <Text style={styles.anggotaText}>Anggaran dalam kota : Rp. {item.anggaran_dalam_kota}</Text>
                        <Text style={styles.anggotaText}>Anggaran luar kota : Rp. {item.anggaran_luar_kota}</Text>
                    </Pressable>
                ))}
            </View>
            </ScrollView>
        </View>
    )
}

export default AnggaranPerjalanan

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