import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../utils/colors';

import Layout from '../../components/Layout';
import CustomButton from '../../components/Button';
import photoProfile from '../../assets/images/pp.png'

const DetailAnggota = ({ route, navigation }) => {
    const { params } = route;

    return (
        <Layout>
            <View style={styles.photoContainer}>
                <Image source={params.foto ? {uri: params.foto} : photoProfile} style={styles.photo} />
            </View>
            <View style={{ width: '80%', flex: 1 }}>
                <Text style={styles.text}>{params.nama}</Text>
                <Text style={styles.text}>{params.nrp}</Text>
                <Text style={styles.text}>{params.pangkat}</Text>
                <Text style={styles.text}>{params.jabatan}</Text>
            </View>
            <View style={styles.footer}>
                <CustomButton title='Edit' buttonStyle={styles.editBtn} onPress={() => navigation.navigate('Edit Anggota', params)} />
                <CustomButton title='Delete' buttonStyle={styles.deleteBtn} style={styles.editBtnTxt} />
            </View>
        </Layout>
    )
}

export default DetailAnggota

const styles = StyleSheet.create({
    photoContainer: {
        backgroundColor: COLORS.WHITE,
        elevation: 10,
        borderColor: COLORS.GRAY,
        borderRadius: 8,
        overflow: 'hidden',
        width: '70%',
        height: Dimensions.get('screen').height * 0.3,
        marginBottom: 35
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