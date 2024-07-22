import React, { useEffect } from 'react'
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getAnggaran } from '../../service/e-sipdService';
import { COLORS } from '../../utils/colors'
import Header from '../../components/Header'

const AnggaranPerjalanan = ({ navigation }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const dataPerjalanan = useSelector(state => state.anggaran.allAnggaran)

    // Loads
    useEffect(() => {
        getAnggaran(token)
            .then(res => {
                dispatch({ type: 'SAVE_ANGGARAN', data: res.data.data })
            })
            .catch(err => {
                console.log('err =', err.response.data)
                alert(err.response.data.message)
            })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <Header title='Anggaran Perjalanan' />
            {/* Content */}
            <ScrollView style={{ backgroundColor: COLORS.WHITE }} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {dataPerjalanan.map((item, index) => (
                        <Pressable
                            key={index}
                            style={styles.card}
                            onPress={() => {
                                dispatch({ type: 'SAVE_CURRENT_ANGGARAN', data: item })
                                navigation.navigate('Anggaran Perjalanan Detail')
                            }}
                        >
                            <Text style={styles.anggotaTitle}>{item.tingkat}</Text>
                            <Text style={styles.anggotaText}>Anggaran dalam kota : Rp. {Number(item.anggaran_dalam_kota).toLocaleString()}</Text>
                            <Text style={styles.anggotaText}>Anggaran luar kota : Rp. {Number(item.anggaran_luar_kota).toLocaleString()}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
            <Pressable
                style={styles.btn}
                onPress={() => navigation.navigate('Create Anggaran')}
            >
                <Text style={styles.btnText}>+</Text>
            </Pressable>
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
    },
    btn: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        backgroundColor: COLORS.GREEN,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    btnText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: COLORS.WHITE
    }
})