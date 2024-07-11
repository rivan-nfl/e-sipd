import React, { useEffect } from 'react'
import { Alert, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { deleteAnggota, getProfile } from '../../service/userService';

import { COLORS } from '../../utils/colors';
import Layout from '../../components/Layout';
import CustomButton from '../../components/Button';
import axios from 'axios';
import { baseUrl } from '../../service/apiConfig';
import photoProfile from '../../assets/images/pp.png'

const DetailDipa = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const user = useSelector(state => state.userManagement)

    const { params } = route;

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

    const handleDeleteAnggota = () => {
        deleteAnggota(params.id, token)
            .then(res => {
                alert('Berhasil Menghapus Dipa')
                getAllDipa()
                navigation.navigate('Home')
            })
            .catch(err => {
                console.log('err =', err.response.data)
                alert(err.response.data.message)
            })
    }

    useEffect(() => {
        getProfile(params.id, token)
            .then(res => {
                dispatch({
                    type: 'SAVE_CURRENT_USER', data: {
                        id: res.data.data.id,
                        nama: res.data.data.nama,
                        username: res.data.data.username,
                        nrp: res.data.data.nrp,
                        alamat: res.data.data.alamat,
                        pangkat: res.data.data.pangkat,
                        bagian: res.data.data.bagian,
                        foto: res.data.data.foto,
                        jabatan: res.data.data.jabatan,
                        role: res.data.data.role,
                        aktif: res.data.data.active
                    }
                })
            })
            .catch(err => {
                console.log('err =', err.response.data)
                alert(err.response.data.message)
            })
    }, [])

    return (
        <Layout title='Detail DIPA'>
            <View style={styles.photoContainer}>
                <Image source={user.foto ? { uri: user.foto } : photoProfile} style={styles.photo} />
            </View>
            <View style={{ width: '80%', flex: 1, paddingTop: 10 }}>
                <Text style={styles.text}>{user.nama}</Text>
                <Text style={styles.text}>{user.nrp}</Text>
                <Text style={styles.text}>{user.pangkat}</Text>
                <Text style={styles.text}>{user.jabatan}</Text>
                <Text style={styles.text}>{user.bagian}</Text>
                <Text style={[styles.text, { color: user.aktif ? COLORS.GREEN : COLORS.RED }]}>{user.aktif ? 'Aktif' : 'Non Aktif'}</Text>
            </View>
            <View style={styles.footer}>
                <CustomButton title='Edit' buttonStyle={styles.editBtn} onPress={() => navigation.navigate('Edit Dipa', user)} />
                <CustomButton title='Delete' buttonStyle={styles.deleteBtn} style={styles.editBtnTxt} onPress={() => {
                    Alert.alert(
                        "Hapus",
                        "Yakin ingin menghapus ?",
                        [
                            { text: "Hapus", onPress: handleDeleteAnggota },
                            { text: "Batal", onPress: null },
                        ]
                    );
                }} />
            </View>
        </Layout>
    )
}

export default DetailDipa

const styles = StyleSheet.create({
    photoContainer: {
        backgroundColor: COLORS.WHITE,
        elevation: 10,
        borderColor: COLORS.GRAY,
        borderRadius: 8,
        overflow: 'hidden',
        width: '70%',
        height: Dimensions.get('screen').height * 0.3,
        marginBottom: 15
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.BLACK,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.GRAY,
        width: '100%',
        textAlign: 'center',
        padding: 10,
        marginBottom: 15
    },
    footer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    editBtn: {
        width: '45%',
    },
    deleteBtn: {
        width: '45%',
        backgroundColor: COLORS.WHITE,
        borderWidth: 1,
    },
    editBtnTxt: {
        color: COLORS.BLACK
    }
})