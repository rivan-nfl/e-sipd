import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';

import { getUserById } from '../../service/userService';
import { editPerjalanan, getAllTransportasi, getAllPerjalanan } from '../../service/e-sipdService';
import { COLORS } from '../../utils/colors'

import Layout from '../../components/Layout'
import Input from '../../components/Input'
import CustomButton from '../../components/Button';

const EditESIPD = ({ navigation, route }) => {
    const { params } = route
    const token = useSelector(state => state.auth.token)

    // Jarak
    const [jarak, setJarak] = useState(0)
    
    // Keterangan
    const [keterangan, setKeterangan] = useState('')

    // Nomor Sprint & SPPD
    const [nomorSprint, setNomorSprint] = useState('')
    const [nomorSPPD, setNomorSPPD] = useState('')

    // Tanggal Berangkat
    const [tanggalBerangkat, setTanggalBerangkat] = useState(new Date());
    const [showTanggalBerangkat, setShowTanggalBerangkat] = useState(false);

    const onChangeBerangkatDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowTanggalBerangkat(false);
        setTanggalBerangkat(currentDate);
    };

    // Tanggal Kembali
    const [tanggalKembali, setTanggalKembali] = useState(new Date());
    const [showTanggalKembali, setShowTanggalKembali] = useState(false);

    const onChangeKembaliDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowTanggalKembali(false);
        setTanggalKembali(currentDate);
    };

    // Anggota
    const [anggota, setAnggota] = useState();
    const [selectedAnggota, setSelectedAnggota] = useState();
    const [daftarAnggota, setDaftarAnggota] = useState([]);

    // Perjalanan Dinas
    const [jenisPerjalanan, setJenisPerjalanan] = useState();
    const [daftarJenisPerjalanan, setDaftarJenisPerjalanan] = useState([
        {
            jenis: 'Pilih Jenis Perjalanan'
        },
        {
            id: 'luar_kota',
            jenis: 'Luar Kota'
        },
        {
            id: 'dalam_kota',
            jenis: 'Dalam Kota'
        },
    ]);

    // Provinsi
    const [provinsi, setProvinsi] = useState();
    const [daftarProvinsi, setDaftarProvinsi] = useState([
        {
            provinsi: 'Pilih Provinsi'
        },
        {
            id: 'Jawa Timur',
            provinsi: 'Jawa Timur'
        },
        {
            id: 'Jawa Tengah',
            provinsi: 'Jawa Tengah',
        },
    ]);

    // Kota
    const [kota, setKota] = useState();
    const [selectedKota, setSelectedKota] = useState([]);
    const [daftarKota, setDaftarKota] = useState([]);

    // Transportasi
    const [transportasi, setTransportasi] = useState();
    const [daftarTransportasi, setDaftarTransportasi] = useState([]);

    // Lokasi Asal
    const [lokasiAsal, setLokasiAsal] = useState();
    const [daftarLokasiAsal, setDaftarLokasiAsal] = useState([]);

    // Lokasi Tujuan
    const [lokasiTujuan, setLokasiTujuan] = useState();
    const [daftarLokasiTujuan, setDaftarLokasiTujuan] = useState([]);

    // Functions
    const handleSubmit = () => {
        if(!jarak) {
            alert('Transportasi tidak tersedia !')
        } else {
            const data = {
                transportasi
            }
    
            editPerjalanan(token, params, data)
            .then(res => {
                Alert.alert(
                    "Sukses",
                    "Berhasil Mengedit Perjalanan",
                    [
                        { text: "Kembali ke Beranda", onPress: () => navigation.navigate("Home") }
                    ]
                );
            })
            .catch(err => {
                console.log('err =', err.response.data)
                alert(err.response.data.message)
            })
        }
    }

    useEffect(() => {
        getAllPerjalanan(token, { perjalanan_id: params })
        .then(res => {
            setNomorSprint(res.data.data[0].nomor_sprint)
            setNomorSPPD(res.data.data[0].nomor_sppd)
            setKeterangan(res.data.data[0].keterangan)
            setJenisPerjalanan(res.data.data[0].jenis_perjalanan)
            setProvinsi(res.data.data[0].daerah_tujuan)
            setKota(res.data.data[0].kota_tujuan)
            setTanggalBerangkat(new Date(res.data.data[0].tgl_berangkat))
            setTanggalKembali(new Date(res.data.data[0].tgl_kembali))
            setLokasiAsal(res.data.data[0].kota_asal)
            setLokasiTujuan(res.data.data[0].kota_tujuan)

            getUserById(token, res.data.data[0].penerima_id)
            .then(response => setSelectedAnggota(response.data.data))
        })
        .catch(err => {
            console.log('err =', err.response.data)
            alert(err.response.data.message)
        })
    }, [])

    useEffect(() => {
        if(lokasiAsal, lokasiTujuan) {
            getAllTransportasi(token, {
                type: jenisPerjalanan,
                lokasi_asal: lokasiAsal,
                lokasi_tujuan: lokasiTujuan,
            })
            .then(res => {
                res.data.data.length ? setJarak((res.data.data.find(item => item.nama == transportasi)).jarak) : setJarak(0)
                setTransportasi((res.data.data.find(item => item.nama == transportasi)).nama)
                setDaftarTransportasi(res.data.data)
            })
            .catch(err => {
                console.log('err =', err.response.data[0])
                alert(err.response.data.message)
            })
        }
    }, [transportasi])

    return (
        <ScrollView style={{ backgroundColor: COLORS.WHITE }} showsVerticalScrollIndicator={false}>
        <Layout title='Edit E - SIPD' contentStyle={{}}>
            <View style={{ width: '90%' }}>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Nama</Text>
                    <Text style={styles.text}>{selectedAnggota?.nama}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Pangkat</Text>
                    <Text style={styles.text}>{selectedAnggota?.pangkat}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Jabatan</Text>
                    <Text style={styles.text}>{selectedAnggota?.jabatan}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Nomor Sprint</Text>
                    <Text style={styles.text}>{nomorSprint}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Nomor SPPD</Text>
                    <Text style={styles.text}>{nomorSPPD}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Maksud Perjalanan Dinas</Text>
                    <Text style={styles.text}>{keterangan}</Text>
                </View>
                <View style={[styles.menu, {zIndex: 3}]}>
                    <Text style={styles.menuTxt}>Jenis Perjalanan Dinas</Text>
                    <Text style={styles.text}>{jenisPerjalanan == 'luar_kota' ? 'Luar kota' : 'Dalam kota'}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Daerah Tujuan</Text>
                    <Text style={styles.text}>{provinsi}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.text}>{kota}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Tanggal Berangkat</Text>
                    <View>
                        <Text style={styles.text}>{tanggalBerangkat.toLocaleDateString()}</Text>
                    </View>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Tanggal Kembali</Text>
                    <View>
                        <Text style={styles.text}>{tanggalKembali.toLocaleDateString()}</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, width: '100%', borderColor: COLORS.GRAY, marginVertical: 10 }} />
                <View style={[styles.menu, {zIndex: 3}]}>
                    <Text style={styles.menuTxt}>Transportasi</Text>
                    <View
                        style={styles.picker}
                    >
                        <Picker
                            selectedValue={transportasi}
                            onValueChange={itemValue => {
                                setTransportasi(itemValue)
                            }}
                        >   
                            { transportasi
                                ? daftarTransportasi.map((item, index) =>
                                    <Picker.Item 
                                        key={index} 
                                        label={item.nama} 
                                        value={item.nama} 
                                        style={{ fontSize: 17, color: COLORS.BLACK }} 
                                    />
                                )
                                : <Picker.Item 
                                    label={'Pilih Transportasi'}
                                    value={''} 
                                    style={{ fontSize: 17, color: COLORS.GRAY }} 
                                />
                            }
                        </Picker>
                    </View>
                </View>
                <View style={[styles.menu, {zIndex: 2}]}>
                    <Text style={styles.menuTxt}>Lokasi Asal</Text>
                    <Text style={styles.text}>{lokasiAsal}</Text>
                </View>
                <View style={[styles.menu, {zIndex: 1}]}>
                    <Text style={styles.menuTxt}>Lokasi Tujuan</Text>
                    <Text style={styles.text}>{lokasiTujuan}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Jarak</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.text, { flex: 1 }]}>{jarak}</Text>
                        <Text style={[styles.menuTxt, { marginLeft: 10 }]}>KM</Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <CustomButton title='Submit' buttonStyle={styles.submitBtn} onPress={handleSubmit} />
                </View>
            </View>
        </Layout>
        </ScrollView>
    )
}

export default EditESIPD

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
    text: {
        fontSize: 17,
        fontWeight: 'bold',
        color: COLORS.BLACK,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.GRAY,
        width: '100%',
        textAlign: 'center',
        padding: 10,
    },
    footer: {
        flexDirection: 'row',
        marginTop: 40
    },
        submitBtn: {
        width: '100%',
    },
})