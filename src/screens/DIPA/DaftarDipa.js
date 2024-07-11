import React, { useState, useEffect } from 'react'
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { baseUrl } from '../../service/apiConfig'
import { COLORS } from '../../utils/colors'
import Header from '../../components/Header'
import photoProfile from '../../assets/images/pp.png'

const DaftarDipa = ({ navigation }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const dataDipa = useSelector(state => state.dipa)

    const getAllDipa = () => {
        axios({
            method: 'GET',
            url: `${baseUrl}/users`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                role: 'dipa'
            },
        })
            .then(res => {
                dispatch({ type: 'SAVE_DIPA', data: res.data.data })
            })
            .catch(err => {
                console.log('err =', err.response.data)
                alert(err.response.data.message)
            })
    }

    useEffect(() => getAllDipa(), [])

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <Header title='Daftar DIPA' />
            {/* Content */}
            <ScrollView style={{ backgroundColor: COLORS.WHITE }} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {dataDipa.map((item, index) => (
                        <Pressable
                            key={index}
                            style={styles.card}
                            onPress={() => navigation.navigate('Detail Dipa', item)}
                        >
                            <View style={styles.photoContainer}>
                                <Image source={item.foto ? { uri: item.foto } : photoProfile} style={styles.photo} />
                            </View>
                            <Text style={styles.anggotaTitle}>{item.nama}</Text>
                            <Text style={styles.anggotaTitle}>{item.nrp}</Text>
                            <Text style={styles.anggotaText}>{item.pangkat}</Text>
                            <Text style={styles.anggotaText}>{item.bagian}</Text>
                            <Text
                                style={[styles.anggotaTitle, { color: item.active ? COLORS.GREEN : COLORS.RED }]}
                            >
                                {item.active ? 'Aktif' : 'Non Aktif'}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
            <Pressable
                style={styles.btn}
                onPress={() => navigation.navigate('Register', 'dipa')}
            >
                <Text style={styles.btnText}>+</Text>
            </Pressable>
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