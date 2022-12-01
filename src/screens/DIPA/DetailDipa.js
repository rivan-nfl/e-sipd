import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../service/userService';

import { COLORS } from '../../utils/colors';
import Layout from '../../components/Layout';
import CustomButton from '../../components/Button';

const DetailDipa = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const user = useSelector(state => state.userManagement)

    const { params } = route;

    useEffect(() => {
        getProfile(params.id, token)
        .then(res => {
            dispatch({type: 'SAVE_CURRENT_USER', data: {
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
    }, [])

    return (
        <Layout title='Detail DIPA'>
            <View style={{ width: '80%', flex: 1, paddingTop: 50 }}>
                <Text style={styles.text}>{user.nama}</Text>
                <Text style={styles.text}>{user.nrp}</Text>
                <Text style={styles.text}>{user.pangkat}</Text>
                <Text style={styles.text}>{user.jabatan}</Text>
                <Text style={styles.text}>{user.bagian}</Text>
            </View>
            <View style={styles.footer}>
                <CustomButton title='Edit' buttonStyle={styles.editBtn} onPress={() => navigation.navigate('Edit Dipa', user)} />
                <CustomButton title='Delete' buttonStyle={styles.deleteBtn} style={styles.editBtnTxt} />
            </View>
        </Layout>
    )
}

export default DetailDipa

const styles = StyleSheet.create({
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