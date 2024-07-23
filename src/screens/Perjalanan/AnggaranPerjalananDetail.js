import React from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../utils/colors'
import Header from '../../components/Header'
import CustomButton from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../../service/apiConfig';
import { getAnggaran } from '../../service/e-sipdService';

const AnggaranPerjalananDetail = ({ navigation }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const params = useSelector(state => state.anggaran.detail)

    const handleDeleteAnggaran = async () => {
        try {
            const res = await axios({
                method: 'DELETE',
                url: `${baseUrl}/anggaran/${params.id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const allData = await getAnggaran(token)
            dispatch({ type: 'SAVE_ANGGARAN', data: allData.data.data })
            navigation.goBack()
        } catch (error) {
            console.log(error)
        }
    }

    if (!params?.id) {
        return (
            <View style={{ flex: 1 }}>
                {/* Header */}
                <Header title='Detail Anggaran' />
                {/* Content */}
                <ScrollView style={{ backgroundColor: COLORS.WHITE }} showsVerticalScrollIndicator={false}>
                    <Text style={{ textAlign: 'center', marginTop: 50 }}>Tidak ada Data</Text>
                </ScrollView>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <Header title='Detail Anggaran' />
            {/* Content */}
            <ScrollView style={{ backgroundColor: COLORS.WHITE, padding: 18 }} showsVerticalScrollIndicator={false}>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Tingkat</Text>
                    <Text style={styles.text}>{params.tingkat}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Golongan</Text>
                    <Text style={styles.text}>{params.golongan}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Anggaran Luar Kota</Text>
                    <Text style={styles.text}>{Number(params.anggaran_luar_kota).toLocaleString()}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Anggaran Dalam Kota</Text>
                    <Text style={styles.text}>{Number(params.anggaran_dalam_kota).toLocaleString()}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Uang Penginapan</Text>
                    <Text style={styles.text}>{Number(params.uang_penginapan).toLocaleString()}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Uang Representasi Luar Kota</Text>
                    <Text style={styles.text}>{Number(params.uang_representasi_luar_kota).toLocaleString()}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Uang Representasi Dalam Kota</Text>
                    <Text style={styles.text}>{Number(params.uang_representasi_dalam_kota).toLocaleString()}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <CustomButton
                        title='Edit Anggaran'
                        buttonStyle={{ width: '45%' }}
                        onPress={() => navigation.navigate('Edit Anggaran', params)}
                    />
                    <CustomButton
                        title='Delete'
                        buttonStyle={{ width: '45%' }}
                        onPress={() => Alert.alert(
                            "Hapus",
                            "Yakin ingin menghapus anggaran ini ?",
                            [
                                { text: "Batal", onPress: () => null },
                                { text: "Hapus", onPress: handleDeleteAnggaran }
                            ]
                        )}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default AnggaranPerjalananDetail

const styles = StyleSheet.create({
    menu: {
        marginBottom: 10,
    },
    menuTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.BLACK,
        marginBottom: 5
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
    },
})