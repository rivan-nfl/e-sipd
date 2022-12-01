import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';

import { getAllUsers } from '../../service/userService';
import { createPerjalanan, getAllTransportasi } from '../../service/e-sipdService';
import { COLORS } from '../../utils/colors'

import Layout from '../../components/Layout'
import Input from '../../components/Input'
import CustomButton from '../../components/Button';

const ESIPD = ({ navigation }) => {
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
    const [selectedJenisPerjalanan, setSelectedJenisPerjalanan] = useState();
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
    const [selectedProvinsi, setSelectedProvinsi] = useState();
    const [daftarProvinsi, setDaftarProvinsi] = useState([
        {
            provinsi: 'Pilih Provinsi'
        },
        {
            id: 'jawa_timur',
            provinsi: 'Jawa Timur'
        },
        {
            id: 'jawa_tengah',
            provinsi: 'Jawa Tengah',
        },
    ]);

    // Kota
    const [kota, setKota] = useState();
    const [selectedKota, setSelectedKota] = useState([]);
    const [daftarKota, setDaftarKota] = useState([
        {
            kota: 'Pilih Kota'
        },
        {
            kotaId: 1,
            provinsiId: 'jawa_timur',
            provinsi: 'Jawa Timur',
            kota: 'Surabaya'
        },
        {
            kotaId: 2,
            provinsiId: 'jawa_timur',
            provinsi: 'Jawa Timur',
            kota: 'Madiun'
        },
        {
            kotaId: 3,
            provinsiId: 'jawa_timur',
            provinsi: 'Jawa Timur',
            kota: 'Jember'
        },
        {
            kotaId: 4,
            provinsiId: 'jawa_tengah',
            provinsi: 'Jawa Tengah',
            kota: 'Semarang'
        },
        {
            kotaId: 5,
            provinsiId: 'jawa_tengah',
            provinsi: 'Jawa Tengah',
            kota: 'Solo'
        },
        {
            kotaId: 6,
            provinsiId: 'jawa_tengah',
            provinsi: 'Jawa Tengah',
            kota: 'Tegal'
        }
    ]);

    // Transportasi
    const [transportasi, setTransportasi] = useState();
    const [selectedTransportasi, setSelectedTransportasi] = useState();
    const [daftarTransportasi, setDaftarTransportasi] = useState([
        {
            nama: 'Pilih Transportasi'
        },
    ]);

    // Lokasi Asal
    const [lokasiAsal, setLokasiAsal] = useState();
    const [selectedLokasiAsal, setSelectedLokasiAsal] = useState();
    const [daftarLokasiAsal, setDaftarLokasiAsal] = useState([
        {
            lokasi_awal: 'Pilih Lokasi Asal'
        }
    ]);

    // Lokasi Tujuan
    const [lokasiTujuan, setLokasiTujuan] = useState();
    const [selectedLokasiTujuan, setSelectedLokasiTujuan] = useState();
    const [daftarLokasiTujuan, setDaftarLokasiTujuan] = useState([
        {
            lokasi_tujuan: 'Pilih Tujuan'
        }
    ]);

    // Functions
    const handleSubmit = () => {
        const data = {
            keterangan,
            nomor_sprint: nomorSprint,
            nomor_sppd: nomorSPPD,
            jenis_perjalanan: jenisPerjalanan,
            daerah_tujuan: provinsi,
            tgl_berangkat: String(tanggalBerangkat),
            tgl_kembali: String(tanggalKembali),
            penerima: anggota
        }

        createPerjalanan(token, data)
        .then(res => {
            // console.log(res.data.data)
            Alert.alert(
                "Sukses",
                "Berhasil Membuat Perjalanan",
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

    // Loads
    useEffect(() => {
        if(provinsi) {
            setSelectedKota(daftarKota.filter(item => item.provinsiId == provinsi))
            setKota((daftarKota.filter(item => item.provinsiId == provinsi))[0].kotaId)
        }
    }, [provinsi])

    useEffect(() => {
        if(provinsi && kota) {
            getAllTransportasi(token, {
                type: jenisPerjalanan
            })
            .then(res => {
                let newTransportasi = []
                let newLokasiAwal = []
                let newLokasiTujuan = []

                for(let i = 0; i < res.data.data.length; i++) {
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
                console.log('err =', err.response.data)
                alert(err.response.data.message)
            })
        }
    }, [provinsi, kota])

    useEffect(() => {
        if(transportasi, lokasiAsal, lokasiTujuan) {
            getAllTransportasi(token, {
                type: jenisPerjalanan,
                lokasi_asal: lokasiAsal || daftarLokasiAsal[0].lokasi_awal,
                lokasi_tujuan: lokasiTujuan || daftarLokasiTujuan[0].lokasi_tujuan,
                transportasi
            })
            .then(res => res.data.data.length ? setJarak(res.data.data[0].jarak) : setJarak(0))
            .catch(err => {
                console.log('err =', err.response.data[0])
                alert(err.response.data.message)
            })
        }
    }, [transportasi, lokasiAsal, lokasiTujuan])

    useEffect(() => {
        getAllUsers(token)
        .then(res => {
            setDaftarAnggota(res.data.data)
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
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Nama Anggota</Text>
                    <View
                        style={styles.picker}
                    >
                        <Picker
                            selectedValue={anggota}
                            onValueChange={itemValue => {
                                setSelectedAnggota(daftarAnggota.find(item => item.id == itemValue));
                                setAnggota(itemValue)
                            }}
                        >   
                            { daftarAnggota.map((item, index) => item.role == 'anggota' &&
                                <Picker.Item 
                                    key={index} 
                                    label={item.nama} 
                                    value={item.id} 
                                    style={{ fontSize: 17 }} 
                                />
                            )}
                        </Picker>
                    </View>
                </View>
                
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
                    <Input placeholder={'Nomor Sprint...'} style={{ flex: 1 }} value={nomorSprint} onChangeText={text => setNomorSprint(text)} />
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Nomor SPPD</Text>
                    <Input placeholder={'Nomor Sprint...'} style={{ flex: 1 }} value={nomorSPPD} onChangeText={text => setNomorSPPD(text)} />
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
                <View style={[styles.menu, {zIndex: 3}]}>
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
                            { daftarJenisPerjalanan.map((item, index) =>
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
                            { daftarProvinsi.map((item, index) =>
                                <Picker.Item 
                                    key={index} 
                                    label={item.provinsi} 
                                    value={item.id} 
                                    style={{ fontSize: 17, color: index == 0 ? COLORS.GRAY : COLORS.BLACK }} 
                                />
                            )}
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
                            { provinsi
                                ? selectedKota.map((item, index) => 
                                    <Picker.Item 
                                        key={index} 
                                        label={item.kota} 
                                        value={item.kotaId} 
                                        style={{ fontSize: 17, color: COLORS.BLACK }} 
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
                            { daftarTransportasi.map((item, index) =>
                                <Picker.Item 
                                    key={index} 
                                    label={item.nama} 
                                    value={item.nama} 
                                    style={{ fontSize: 17, color: index == 0 ? COLORS.GRAY : COLORS.BLACK }} 
                                />
                            )}
                        </Picker>
                    </View>
                </View>
                <View style={[styles.menu, {zIndex: 2}]}>
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
                            { daftarLokasiAsal.map((item, index) =>
                                <Picker.Item 
                                    key={index} 
                                    label={item.lokasi_awal} 
                                    value={item.lokasi_awal} 
                                    style={{ fontSize: 17, color: index == 0 ? COLORS.GRAY : COLORS.BLACK }} 
                                />
                            )}
                        </Picker>
                    </View>
                </View>
                <View style={[styles.menu, {zIndex: 1}]}>
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
                            { daftarLokasiTujuan.map((item, index) =>
                                <Picker.Item 
                                    key={index} 
                                    label={item.lokasi_tujuan} 
                                    value={item.lokasi_tujuan} 
                                    style={{ fontSize: 17, color: index == 0 ? COLORS.GRAY : COLORS.BLACK }} 
                                />
                            )}
                        </Picker>
                    </View>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Jarak</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <Input placeholder={'Jarak'} keyboardType='number-pad' style={{ flex: 1 }} /> */}
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

export default ESIPD

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