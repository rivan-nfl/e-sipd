import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { COLORS } from '../../utils/colors'
import { getAnggaran, getPangkat } from '../../service/e-sipdService'
import { useDispatch, useSelector } from 'react-redux'
import { Picker } from '@react-native-picker/picker'
import Input from '../../components/Input'
import axios from 'axios'
import { baseUrl } from '../../service/apiConfig'
import CustomButton from '../../components/Button'

const CreateAnggaran = ({ navigation }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    // Data
    const [allPangkat, setAllPangkat] = useState([])
    // Payload
    const [pangkatId, setPangkatId] = useState()
    const [anggaranLuarKota, setAnggaranLuarKota] = useState()
    const [anggaranDalamKota, setAnggaranDalamKota] = useState()
    const [uangPenginapan, setUangPenginapan] = useState()
    const [uangRepresentasiLuarKota, setUangRepresentasiLuarKota] = useState()
    const [uangRepresentasiDalamKota, setUangRepresentasiDalamKota] = useState()

    const handleEditAnggaran = async () => {
        try {
            const res = await axios({
                method: 'POST',
                url: `${baseUrl}/anggaran`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    pangkat_id: pangkatId,
                    anggaran_luar_kota: Number(anggaranLuarKota),
                    anggaran_dalam_kota: Number(anggaranDalamKota),
                    uang_penginapan: Number(uangPenginapan),
                    uang_representasi_luar_kota: Number(uangRepresentasiLuarKota),
                    uang_representasi_dalam_kota: Number(uangRepresentasiDalamKota)
                }
            })
            const allData = await getAnggaran(token)
            dispatch({ type: 'SAVE_ANGGARAN', data: allData.data.data })

            Alert.alert(
                "Sukses",
                "Berhasil Menambah Anggaran",
                [
                    { text: "Kembali", onPress: () => navigation.goBack() }
                ]
            );
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        getPangkat(token)
            .then(res => {
                setAllPangkat(res.data.data)
            })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <Header title='Create Anggaran' />
            {/* Content */}
            <ScrollView
                style={{ backgroundColor: COLORS.WHITE, padding: 18 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Pangkat</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={pangkatId}
                            style={{ color: 'black' }}
                            onValueChange={itemValue => setPangkatId(itemValue)}
                        >
                            {allPangkat.map((item, index) =>
                                <Picker.Item
                                    key={index}
                                    label={`${item.sub_pangkat}, Tingkat ${item.tingkat}, Golongan ${item.golongan}`}
                                    value={item.id}
                                    style={{ fontSize: 16 }}
                                />
                            )}
                        </Picker>
                    </View>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Anggaran Luar Kota</Text>
                    <Input
                        placeholder={'Anggaran Luar Kota'}
                        keyboardType='decimal-pad'
                        maxLength={1000}
                        value={anggaranLuarKota}
                        onChangeText={text => setAnggaranLuarKota(text)}
                    />
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Anggaran Dalam Kota</Text>
                    <Input
                        placeholder={'Anggaran Dalam Kota'}
                        keyboardType='decimal-pad'
                        maxLength={1000}
                        value={anggaranDalamKota}
                        onChangeText={text => setAnggaranDalamKota(text)}
                    />
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Uang Penginapan</Text>
                    <Input
                        placeholder={'Uang Penginapan'}
                        keyboardType='decimal-pad'
                        maxLength={1000}
                        value={uangPenginapan}
                        onChangeText={text => setUangPenginapan(text)}
                    />
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Uang Representasi Luar Kota</Text>
                    <Input
                        placeholder={'Uang Representasi Luar Kota'}
                        keyboardType='decimal-pad'
                        maxLength={1000}
                        value={uangRepresentasiLuarKota}
                        onChangeText={text => setUangRepresentasiLuarKota(text)}
                    />
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Uang Representasi Dalam Kota</Text>
                    <Input
                        placeholder={'Uang Representasi Dalam Kota'}
                        keyboardType='decimal-pad'
                        maxLength={1000}
                        value={uangRepresentasiDalamKota}
                        onChangeText={text => setUangRepresentasiDalamKota(text)}
                    />
                </View>
                <CustomButton
                    title='Simpan'
                    buttonStyle={{ marginTop: 20 }}
                    onPress={handleEditAnggaran}
                />
            </ScrollView>
        </View>
    )
}

export default CreateAnggaran

const styles = StyleSheet.create({
    menu: {
        marginBottom: 10
    },
    menuTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.BLACK,
        marginBottom: 5
    },
    picker: {
        borderColor: COLORS.GRAY,
        borderWidth: 1,
        borderRadius: 8,
    },
})