import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../utils/colors';

import Layout from '../../components/Layout';
import CustomButton from '../../components/Button';

const DetailDipa = ({ route, navigation }) => {
    const { params } = route;

    return (
        <Layout title='Detail DIPA'>
            <View style={{ width: '80%', flex: 1, paddingTop: 50 }}>
                <Text style={styles.text}>{params.nama}</Text>
                <Text style={styles.text}>{params.nrp}</Text>
                <Text style={styles.text}>{params.pangkat}</Text>
                <Text style={styles.text}>{params.jabatan}</Text>
                <Text style={styles.text}>{params.bagian}</Text>
            </View>
            <View style={styles.footer}>
                <CustomButton title='Edit' buttonStyle={styles.editBtn} onPress={() => navigation.navigate('Edit Dipa', params)} />
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