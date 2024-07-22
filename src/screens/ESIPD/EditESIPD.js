import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { ScrollView, StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';

import { getUserById } from '../../service/userService';
import { createPerjalanan, editPerjalanan, getAllPerjalanan, getAllTransportasi } from '../../service/e-sipdService';
import { COLORS } from '../../utils/colors'

import Layout from '../../components/Layout'
import Input from '../../components/Input'
import CustomButton from '../../components/Button';

const EditESIPD = ({ navigation, route }) => {
    const { params } = route;
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
    const [pengikut, setPengikut] = useState([]);
    const [daftarAnggota, setDaftarAnggota] = useState([]);

    // Perjalanan Dinas
    const [jenisPerjalanan, setJenisPerjalanan] = useState();
    const [daftarJenisPerjalanan, setDaftarJenisPerjalanan] = useState([
        {
            id: null,
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

    const [daftarTujuan, setDaftarTujuan] = useState([]);

    // Provinsi
    const [provinsi, setProvinsi] = useState();
    const [daftarProvinsi, setDaftarProvinsi] = useState([{ provinsi: 'Pilih Provinsi' }]);

    // Kota
    const [kota, setKota] = useState();
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
        if (!jarak) {
            alert('Transportasi tidak tersedia !')
        } else {
            const data = {
                keterangan,
                nomor_sprint: `SPRIN-${nomorSprint}`,
                nomor_sppd: `SPPD-${nomorSPPD}`,
                jenis_perjalanan: jenisPerjalanan,
                daerah_tujuan: provinsi,
                kota_asal: lokasiAsal,
                kota_tujuan: kota.lokasi_tujuan || kota,
                tgl_berangkat: String(tanggalBerangkat),
                tgl_kembali: String(tanggalKembali),
                transportasi: transportasi,
                penerima: pengikut[0]?.id || selectedAnggota.id,
                pejalan: pengikut
            }

            editPerjalanan(token, params, data)
                .then(res => {
                    Alert.alert(
                        "Sukses",
                        "Berhasil Merubah Perjalanan",
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

    // Loads
    useEffect(() => {
        if (jenisPerjalanan) {
            getAllTransportasi(token, {
                type: jenisPerjalanan
            })
                .then(res => {
                    const newDaftarProvinsi = new Array()
                    for (let i = 0; i < res.data.data.length; i++) {
                        const newProvinsi = newDaftarProvinsi.find(item => item.provinsi == res.data.data[i].provinsi)
                        !newProvinsi ? newDaftarProvinsi.push(res.data.data[i]) : null
                    }
                    setDaftarProvinsi([{ provinsi: 'Pilih Provinsi' }, ...newDaftarProvinsi])
                    setDaftarTujuan(res.data.data)
                    if (jenisPerjalanan == 'dalam_kota') {
                        setProvinsi(newDaftarProvinsi[0].provinsi)
                        setDaftarKota(res.data.data)
                    } else {
                        setProvinsi()
                        setDaftarKota([{ lokasi_tujuan: 'Pilih Kota' }])
                    }
                })
                .catch(err => {
                    console.log('err =', err.response.data)
                    alert(err.response.data.message)
                })
        }
    }, [jenisPerjalanan])

    useEffect(() => {
        if (provinsi) {
            if (jenisPerjalanan == 'dalam_kota') {
                setKota(daftarTujuan[0])
                setDaftarKota(
                    daftarTujuan.reduce((acc, current) => {
                        const isDuplicate = acc.some(item => item.lokasi_tujuan === current.lokasi_tujuan);
                        if (!isDuplicate) {
                            acc.push(current);
                        }
                        return acc;
                    }, [])
                )
            } else if (jenisPerjalanan == 'luar_kota' && provinsi != 'Pilih Provinsi') {
                const newDaftarTujuan =
                    daftarTujuan
                        .filter(item => item.provinsi == provinsi)
                        .reduce((acc, current) => {
                            const isDuplicate = acc.some(item => item.lokasi_tujuan === current.lokasi_tujuan);
                            if (!isDuplicate) {
                                acc.push(current);
                            }
                            return acc;
                        }, []);
                setKota(newDaftarTujuan[0])
                setDaftarKota(newDaftarTujuan)
            } else {
                setDaftarKota([{ lokasi_tujuan: 'Pilih Kota' }])
            }
        }
    }, [provinsi])

    useEffect(() => {
        if (kota) {
            getAllTransportasi(token, {
                type: jenisPerjalanan,
                lokasi_asal: kota.lokasi_awal,
                lokasi_tujuan: kota.lokasi_tujuan,
            })
                .then(res => {
                    let newTransportasi = []
                    let newLokasiAwal = []
                    let newLokasiTujuan = []

                    for (let i = 0; i < res.data.data.length; i++) {
                        const newTransport = newTransportasi.find(item => item.nama == res.data.data[i].nama)
                        const newAwal = newLokasiAwal.find(item => item.lokasi_awal == res.data.data[i].lokasi_awal)
                        const newTujuan = newLokasiTujuan.find(item => item.lokasi_tujuan == res.data.data[i].lokasi_tujuan)

                        !newTransport ? newTransportasi.push(res.data.data[i]) : null
                        !newAwal ? newLokasiAwal.push(res.data.data[i]) : null
                        !newTujuan ? newLokasiTujuan.push(res.data.data[i]) : null
                    }

                    setDaftarTransportasi(newTransportasi)
                    setTransportasi(newTransportasi[0].nama)

                    setDaftarLokasiAsal(newLokasiAwal)
                    setLokasiAsal(newLokasiAwal[0].lokasi_awal)

                    setDaftarLokasiTujuan(newLokasiTujuan)
                    setLokasiTujuan(newLokasiTujuan[0].lokasi_tujuan)
                })
                .catch(err => {
                    console.log('err =', err.response.data[0])
                    alert(err.response.data.message)
                })
        }
    }, [kota])

    useEffect(() => {
        if (transportasi, lokasiAsal, lokasiTujuan) {
            getAllTransportasi(token, {
                type: jenisPerjalanan,
                lokasi_asal: lokasiAsal || daftarLokasiAsal[0].lokasi_awal,
                lokasi_tujuan: lokasiTujuan || daftarLokasiTujuan[0].lokasi_tujuan,
                transportasi
            })
                .then(res => {
                    res.data.data.length ? setJarak(res.data.data[0].jarak) : setJarak(0)
                })
                .catch(err => {
                    console.log('err =', err.response.data[0])
                    alert(err.response.data.message)
                })
        }
    }, [transportasi, lokasiAsal, lokasiTujuan])

    useEffect(() => {
        getAllPerjalanan(token, { perjalanan_id: params })
            .then(res => {
                setNomorSprint(res.data.data[0].nomor_sprint?.slice(7))
                setNomorSPPD(res.data.data[0].nomor_sppd?.slice(5))
                setKeterangan(res.data.data[0].keterangan)
                setJenisPerjalanan(res.data.data[0].jenis_perjalanan)
                setProvinsi(res.data.data[0].daerah_tujuan)
                setKota(res.data.data[0].kota_tujuan)
                setTanggalBerangkat(new Date(res.data.data[0].tgl_berangkat))
                setTanggalKembali(new Date(res.data.data[0].tgl_kembali))
                setPengikut(JSON.parse(res.data.data[0].pejalan))

                getUserById(token, res.data.data[0].penerima_id)
                    .then(response => {
                        setSelectedAnggota(response.data.data);
                    })
            })
            .catch(err => {
                console.log('err =', err.response.data)
                alert(err.response.data.message)
            })
    }, [])

    return (
        <ScrollView style={{ backgroundColor: COLORS.WHITE }} showsVerticalScrollIndicator={false}>
            <Layout title='E - SIPD' contentStyle={{}}>
                <View style={{ width: '90%' }}>
                    {/* <View style={styles.menu}>
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
                </View> */}
                    <View style={styles.menu}>
                        <Text style={styles.menuTxt}>Pejalan</Text>
                        {pengikut?.map((item, index) => (
                            <View key={index} style={{
                                marginBottom: 8,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: COLORS.GRAY,
                                padding: 10,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{ flexGrow: 1 }}>
                                    <Text style={{
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                        color: COLORS.BLACK,
                                        textAlign: 'center',
                                    }}>{item.nama}</Text>
                                    <Text style={{
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                        color: COLORS.BLACK,
                                        textAlign: 'center',
                                    }}>{item.pangkat}</Text>
                                    <Text style={{
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                        color: COLORS.BLACK,
                                        textAlign: 'center',
                                    }}>{item.jabatan}</Text>
                                </View>
                                {/* <Pressable onPress={() => setPengikut(pengikut.filter(it => it.id !== item.id))}>
                                <Icon name={'trash'} color={COLORS.RED} size={25} />
                            </Pressable> */}
                            </View>
                        ))}
                    </View>
                    <View style={styles.menu}>
                        <Text style={styles.menuTxt}>Nomor Sprin</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: 'gray',
                            paddingHorizontal: 9
                        }}>
                            <Text style={{
                                color: 'black',
                                fontSize: 17
                            }}>SPRINT -</Text>
                            <Input
                                noBorder
                                placeholder={'Nomor Sprint...'}
                                style={{ flex: 1, paddingHorizontal: 3 }}
                                value={nomorSprint}
                                onChangeText={text => setNomorSprint(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.menu}>
                        <Text style={styles.menuTxt}>Nomor SPPD</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: 'gray',
                            paddingHorizontal: 9
                        }}>
                            <Text style={{
                                color: 'black',
                                fontSize: 17
                            }}>SPPD -</Text>
                            <Input
                                noBorder
                                placeholder={'Nomor SPPD...'}
                                style={{ flex: 1, paddingHorizontal: 3 }}
                                value={nomorSPPD}
                                onChangeText={text => setNomorSPPD(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.menu}>
                        <Text style={styles.menuTxt}>Maksud Perjalanan Dinas</Text>
                        <Input
                            placeholder={'...'}
                            multiline
                            maxLength={1000}
                            value={keterangan}
                            onChangeText={text => setKeterangan(text)}
                        />
                    </View>
                    <View style={[styles.menu, { zIndex: 3 }]}>
                        <Text style={styles.menuTxt}>Jenis Perjalanan Dinas</Text>
                        <View
                            style={styles.picker}
                        >
                            <Picker
                                selectedValue={jenisPerjalanan}
                                onValueChange={itemValue => {
                                    setJenisPerjalanan(itemValue)
                                }}
                            >
                                {daftarJenisPerjalanan.map((item, index) =>
                                    <Picker.Item
                                        key={index}
                                        label={item.jenis}
                                        value={item.id}
                                        style={{ fontSize: 17, color: index == 0 ? COLORS.GRAY : COLORS.BLACK }}
                                    />
                                )}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.menu}>
                        <Text style={styles.menuTxt}>Tanggal Berangkat</Text>
                        <Pressable onPress={() => setShowTanggalBerangkat(!showTanggalBerangkat)}>
                            <Text style={styles.text}>{tanggalBerangkat.toLocaleDateString()}</Text>
                        </Pressable>
                        {showTanggalBerangkat && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={tanggalBerangkat}
                                mode={'date'}
                                is24Hour={true}
                                onChange={onChangeBerangkatDate}
                                minimumDate={new Date()}
                            />
                        )}
                    </View>
                    <View style={styles.menu}>
                        <Text style={styles.menuTxt}>Tanggal Kembali</Text>
                        <Pressable onPress={() => setShowTanggalKembali(!showTanggalKembali)}>
                            <Text style={styles.text}>{tanggalKembali.toLocaleDateString()}</Text>
                        </Pressable>
                        {showTanggalKembali && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={tanggalKembali}
                                mode={'date'}
                                is24Hour={true}
                                onChange={onChangeKembaliDate}
                                minimumDate={tanggalBerangkat}
                            />
                        )}
                    </View>
                    <View style={{ borderWidth: 1, width: '100%', borderColor: COLORS.GRAY, marginVertical: 10 }} />
                    <View style={styles.menu}>
                        <Text style={styles.menuTxt}>Daerah Tujuan</Text>
                        <View
                            style={styles.picker}
                        >
                            <Picker
                                selectedValue={provinsi}
                                onValueChange={itemValue => {
                                    setProvinsi(itemValue)
                                }}
                            >
                                {jenisPerjalanan
                                    ? daftarProvinsi.map((item, index) =>
                                        <Picker.Item
                                            key={index}
                                            label={item.provinsi}
                                            value={item.provinsi}
                                            style={{ fontSize: 17, color: index == 0 ? COLORS.GRAY : COLORS.BLACK }}
                                        />
                                    )
                                    : <Picker.Item
                                        label={'Pilih Provinsi'}
                                        value={''}
                                        style={{ fontSize: 17, color: COLORS.GRAY }}
                                    />
                                }
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.menu}>
                        <View
                            style={styles.picker}
                        >
                            <Picker
                                selectedValue={kota}
                                onValueChange={itemValue => {
                                    setKota(itemValue)
                                }}
                            >
                                {provinsi && provinsi != 'Pilih Provinsi'
                                    ? daftarKota.map((item, index) =>
                                        <Picker.Item
                                            key={index}
                                            label={item.lokasi_tujuan}
                                            value={item}
                                            style={{ fontSize: 17, color: COLORS.BLACK }}
                                        />
                                    )
                                    : <Picker.Item
                                        label={'Pilih Kota'}
                                        value={''}
                                        style={{ fontSize: 17, color: COLORS.GRAY }}
                                    />
                                }
                            </Picker>
                        </View>
                    </View>
                    <View style={[styles.menu, { zIndex: 3 }]}>
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
                                {transportasi
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
                    {/* <View style={[styles.menu, { zIndex: 2 }]}>
                        <Text style={styles.menuTxt}>Lokasi Asal</Text>
                        <View
                            style={styles.picker}
                        >
                            <Picker
                                selectedValue={lokasiAsal}
                                onValueChange={itemValue => {
                                    setLokasiAsal(itemValue)
                                }}
                            >
                                {lokasiAsal
                                    ? daftarLokasiAsal.map((item, index) =>
                                        <Picker.Item
                                            key={index}
                                            label={item.lokasi_awal}
                                            value={item.lokasi_awal}
                                            style={{ fontSize: 17, color: COLORS.BLACK }}
                                        />
                                    )
                                    : <Picker.Item
                                        label={'Pilih Lokasi Asal'}
                                        value={''}
                                        style={{ fontSize: 17, color: COLORS.GRAY }}
                                    />
                                }
                            </Picker>
                        </View>
                    </View>
                    <View style={[styles.menu, { zIndex: 1 }]}>
                        <Text style={styles.menuTxt}>Lokasi Tujuan</Text>
                        <View
                            style={styles.picker}
                        >
                            <Picker
                                selectedValue={lokasiTujuan}
                                onValueChange={itemValue => {
                                    setLokasiTujuan(itemValue)
                                }}
                            >
                                {lokasiTujuan
                                    ? daftarLokasiTujuan.map((item, index) =>
                                        <Picker.Item
                                            key={index}
                                            label={item.lokasi_tujuan}
                                            value={item.lokasi_tujuan}
                                            style={{ fontSize: 17, color: COLORS.BLACK }}
                                        />
                                    )
                                    : <Picker.Item
                                        label={'Pilih Tujuan'}
                                        value={''}
                                        style={{ fontSize: 17, color: COLORS.GRAY }}
                                    />
                                }
                            </Picker>
                        </View>
                    </View> */}
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