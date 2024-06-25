import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Modal, Linking } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { getAllPerjalanan, getAnggaran, getPangkat, setSelesaiPerjalanan, updatePerjalanan } from '../../service/e-sipdService';
import { getUserById } from '../../service/userService';
import { COLORS } from '../../utils/colors';

import Layout from '../../components/Layout';
import CustomButton from '../../components/Button';
import Input from '../../components/Input';
import { getDateSignFormat } from '../../utils/string';

const DetailPerjalanan = ({ route, navigation }) => {
    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)
    const userRole = useSelector(state => state.user.role)

    const { params } = route;

    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [keterangan, setKeterangan] = useState('')
    const [status, setStatus] = useState(params.status)
    const [anggaran, setAnggaran] = useState('')
    const [anggaranBody, setAnggaranBody] = useState({})

    const downloadReport = async () => {
        setIsLoading(true)

        const pejalan = JSON.parse(params?.pejalan)
        const anggaran = JSON.parse(params?.anggaran)
        const data = {
            nama: pejalan[0]?.nama,
            pangkat: pejalan[0]?.pangkat,
            nrp: pejalan[0]?.nrp,
            jabatan: pejalan[0]?.jabatan,
            kesatuan: '',
            daftarPengikut: [],
            sprint: params?.nomor_sprint,
            sppd: params?.nomor_sppd,
            perjalananDinas: `${params.kota_asal} ke ${params.kota_tujuan} (PP)`,
            biaya: anggaran
        }
        const semuaJabatan = {}
        let totalPengikut = 0
        pejalan?.map(item => {
            semuaJabatan[item.jabatan] = semuaJabatan[item.jabatan] + 1 || 1
            totalPengikut += 1
        })

        const signDate = getDateSignFormat(new Date(params.updated_at))

        let parameters = {};

        // Input HTML code to be converted. Required.
        parameters["html"] = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-size: 12px;
                    font-family: Arial, Helvetica, sans-serif;
                }
                .pdf-container {
                    width: 992px;
                    min-height: 1403px;
                    border: 1px solid grey;
                }
                .header {
                    height: 50px;
                    border-bottom: 1px solid grey;
                    padding: 10px 30px;
                    display: flex;
                    justify-content: space-between;
                    font-weight: bold;
                }
                .content {
                    padding: 10px 30px;
                }
                .top-title {
                    text-align: center;
                    font-weight: bold;
                    margin-bottom: 15px;
                }
                .top-desc {
                    display: flex;
                    margin-bottom: 5px;
                }
                .top-desc-1 {
                    width: 30%;
                }
                .top-desc-2 {
                    width: 60%;
                    border-bottom: 1px dashed black;
                }
                table {
                    border-collapse: collapse;
                    width: 100%;
                    margin: 15px 0;
                    text-align: center;
                }
                table, th, td {
                    border: 1px solid;
                    padding: 5px;
                }
                .date-sign {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 30px;
                    margin-bottom: 10px;
                }
                .sign-container {
                    display: flex;
                    justify-content: space-between;
                }
                .sign-content {
                    text-align: center;
                }
                .sign-content p {
                    margin-bottom: 8px;
                }
            </style>
        </head>
        <body>
            <!-- PDF -->
            <section class="pdf-container">
                <div class="header">
                    <p>KOPSTUK</p>
                    <p>KU - 4</p>
                </div>
                <div class="content">
                    <p class="top-title">DAFTAR PERHITUNGAN BIAYA PERJALANAN DINAS</p>
                    <div class="top-desc">
                        <p class="top-desc-1">1. Nama</p>
                        <p style="width: 3%;">:</p>
                        <p class="top-desc-2">${data.nama}</p>
                    </div>
                    <div class="top-desc">
                        <p class="top-desc-1">2. Pangkat/Gol, NRP/NIP</p>
                        <p style="width: 3%;">:</p>
                        <p class="top-desc-2">${data.pangkat}, NRP ${data.nrp}</p>
                    </div>
                    <div class="top-desc">
                        <p class="top-desc-1">3. Jabatan</p>
                        <p style="width: 3%;">:</p>
                        <p class="top-desc-2">${data.jabatan}</p>
                    </div>
                    <div class="top-desc">
                        <p class="top-desc-1">4. Kesatuan</p>
                        <p style="width: 3%;">:</p>
                        <p class="top-desc-2">${data.kesatuan || ''}</p>
                    </div>
                    <div class="top-desc">
                        <p class="top-desc-1">5. Daftar Pengikut</p>
                        <p style="width: 3%;">:</p>
                        <p class="top-desc-2">${totalPengikut} Orang</p>
                    </div>
                    <table>
                        <thead>
                            <th>PERJALANAN DINAS JABATAN</th>
                            <th>PERJALANAN DINAS ORANG</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    ${Object.entries(semuaJabatan).map(([key, value]) => `
                                    <p>${key}</p>
                                    `).join('')}
                                </td>
                                <td>
                                    ${Object.entries(semuaJabatan).map(([key, value]) => `
                                    <p>${value}</p>
                                    `).join('')}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Jumlah Pengikut : ${totalPengikut} Orang
                                </td>
                                <td>
                                    Jumlah Pengikut : ${totalPengikut} Orang
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="top-desc">
                        <p class="top-desc-1">6. Surat Perintah (Sprin)</p>
                        <p style="width: 3%;">:</p>
                        <p class="top-desc-2">Dari Pangdam V/Brw ${data.sprint} tanggal ${new Date(params.tgl_berangkat).toLocaleDateString()}</p>
                    </div>
                    <div class="top-desc">
                        <p class="top-desc-1">7. Surat Perjalanan Dinas (SPPD)</p>
                        <p style="width: 3%;">:</p>
                        <p class="top-desc-2">Dari Pangdam V/Brw ${data.sppd} tanggal ${new Date(params.tgl_berangkat).toLocaleDateString()}</p>
                    </div>
                    <div class="top-desc">
                        <p class="top-desc-1">8. Perjalanan Dinas Dari</p>
                        <p style="width: 3%;">:</p>
                        <p class="top-desc-2">${data.perjalananDinas}</p>
                    </div>
                    <div class="top-desc">
                        <p class="top-desc-1">9. Hak atas biaya perjalanan dinas</p>
                        <p style="width: 3%;">:</p>
                    </div>
                    <table>
                        <thead>
                            <th>PERHITUNGAN BIAYA</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <p>${anggaran?.biayaHarianInfo}</p>
                                    <p>${anggaran?.biayaPenginapanInfo}</p>
                                    <p>${anggaran?.uangRepresentasiInfo}</p>
                                    <p>${anggaran?.biayaBBMDanPelumasInfo || anggaran?.biayaTransportInfo}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    JUMLAH ${Number(anggaran?.total).toLocaleString()}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="top-desc">
                        <p class="top-desc-1">Keterangan</p>
                        <p style="width: 3%;">:</p>
                        <p class="top-desc-2"></p>
                    </div>
                    <div class="date-sign">
                        <p>Surabaya, ${signDate}</p>
                    </div>
                    <div class="sign-container">
                        <div class="sign-content">
                            <p>Mengetahui</p>
                            <p>Pejabat Pembuat Komitmen</p>
                        </div>
                        <div class="sign-content">
                            <p>Yang Membuat Perhitungan</p>
                            <p>Bendahara Pengeluaran</p>
                        </div>
                    </div>
                </div>
            </section>
        </body>
        </html>`;
        // Name of resulting file
        parameters["name"] = `Laporan-${data.sprint || ''}-${data.sppd || ''}.pdf`;
        // Set to css style margins like 10 px or 5px 5px 5px 5px.
        parameters["margins"] = "0px 0px 0px 0px";
        // Can be Letter, A4, A5, A6 or custom size like 200x200
        parameters["paperSize"] = "A4";
        // Set to Portrait or Landscape. Portrait by default.
        parameters["orientation"] = "Portrait";
        // true by default. Set to false to disbale printing of background.
        parameters["printBackground"] = true;
        parameters["mediaType"] = 'screen';
        // If large input document, process in async mode by passing true
        // parameters["async"] = true;
        // Set to HTML for header to be applied on every page at the header.
        // parameters["header"] = "";
        // Set to HTML for footer to be applied on every page at the bottom.
        // parameters["footer"] = "";

        // Convert JSON object to string
        var jsonPayload = JSON.stringify(parameters);

        const response = await fetch('https://api.pdf.co/v1/pdf/convert/from/html', {
            method: 'POST',
            headers: {
                "x-api-key": 's160417166@student.ubaya.ac.id_Dr1T2oZkkAW0146B8RcFi4S88JZrD5x2Z7Nfi1jFz0gU8bU2L41FDiyANhu3Apd2',
                "Content-Type": "application/json",
            },
            body: jsonPayload
        }).then(res => res.json())

        setIsLoading(false)
        if (response?.status !== 200) {
            return alert(`Terjadi kesalahan saat mendownload Laporan :\n${response.message}`)
        } else if (response?.status === 200) {
            // console.log(response.url)
            await Linking.openURL(response.url);
        }
    }

    const handlePickImage = () => {
        const options = {
            mediaType:'photo'
        }

        launchCamera(options, (res) => {
            if(res.didCancel) {
                console.log('User Canceled')
            } else {
                // console.log('Cam', res.assets[0])
                handleSelesaiPerjalanan()
            }
        });
    }

    const handleUpdatePerjalanan = (status) => {
        const data = {
            status,
            keterangan
        }

        updatePerjalanan(token, params.id, data)
        .then(res => {
            setStatus(res.data.data.status)
            res.data.data.status == 'rejected' && setModalVisible(!modalVisible)
            alert('Sukses Memberi Pengajuan')
            getAllPerjalanan(token)
            .then(res => {
                dispatch({type: 'SAVE_PERJALANAN', data: res.data.data})
            })
            .catch(err => {
                console.log('err =', err.response.data)
                alert(err.response.data.message)
            })
        })
        .catch(err => {
            console.log('err =', err.response.data)
            alert(err.response.data.message)
        })
    }

    const handleSelesaiPerjalanan = () => {
        setSelesaiPerjalanan(token, params.id)
        .then(res => {
            alert('Sukses Menyelesaikan Perjalanan')
            getAllPerjalanan(token)
            .then(res => {
                dispatch({type: 'SAVE_PERJALANAN', data: res.data.data})
                navigation.navigate('Home')
            })
        })
        .catch(err => {
            console.log('err =', err.response.data)
            alert(err.response.data.message)
        })
    }

    const handleGetAnggaran = () => {
        getUserById(token, params.penerima_id)
        .then(ress => {
            getPangkat(token, { pangkat: ress.data.data.pangkat })
            .then(res => {
                if(res.data.data.length) {
                    getAnggaran(token, { tingkat: res.data.data[0].tingkat })
                    .then(response => {
                        params?.jenis_perjalanan == 'luar_kota'
                        ? setAnggaran(response.data.data[0].anggaran_luar_kota)
                        : setAnggaran(response.data.data[0].anggaran_dalam_kota)
                    })
                }
            })
        })
        .catch(err => {
            console.log('err =', err.response.data)
            alert(err.response.data.message)
        })
    }

    useEffect(() => {
        handleGetAnggaran()
        setAnggaranBody(JSON.parse(params?.anggaran))
    }, [])

    return (
        <>
        <Layout title='Detail Perjalanan'>
            <View style={{ paddingVertical: 20, width: '95%', flex: 1 }}>
            <ScrollView style={{ backgroundColor: COLORS.WHITE }} showsVerticalScrollIndicator={false}>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Nomor Sprint</Text>
                    <Text style={styles.text}>{params.nomor_sprint}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Nomor SPPD</Text>
                    <Text style={styles.text}>{params.nomor_sppd}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Jenis Perjalanan</Text>
                    <Text style={styles.text}>{params?.jenis_perjalanan == 'luar_kota' ? 'Luar Kota' : 'Dalam Kota'}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Daerah Tujuan</Text>
                    <Text style={styles.text}>{params.daerah_tujuan}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Kota Asal</Text>
                    <Text style={styles.text}>{params.kota_asal}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Kota Tujuan</Text>
                    <Text style={styles.text}>{params.kota_tujuan}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Tanggal Berangkat</Text>
                    <Text style={styles.text}>{new Date(params.tgl_berangkat).toLocaleDateString()}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Tanggal Kembali</Text>
                    <Text style={styles.text}>{new Date(params.tgl_kembali).toLocaleDateString()}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Pejalan</Text>
                    {params?.pejalan && (JSON.parse(params?.pejalan)).map((item, index) => (
                        <Text key={index} style={[styles.text, { marginBottom: 8 }]}>{item.nama}, {item.pangkat}, {item.jabatan}</Text>
                    ))}
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Diajukan Pada</Text>
                    <Text style={styles.text}>{new Date(params.created_at).toLocaleDateString()}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Anggaran</Text>
                    <View style={styles.anggaranCover}>
                        <Text style={[styles.anggaranText, { textAlign: 'left' }]}>Biaya Harian : Rp. {Number(anggaranBody?.biayaHarian).toLocaleString()}</Text>
                        <Text style={[styles.anggaranText, { fontSize: 14,textAlign: 'left' }]}>{anggaranBody?.biayaHarianInfo}</Text>

                        <View style={{ height: 2, marginBottom: 10 }} />

                        <Text style={[styles.anggaranText, { textAlign: 'left' }]}>Biaya Penginapan : Rp. {Number(anggaranBody?.biayaPenginapan).toLocaleString()}</Text>
                        <Text style={[styles.anggaranText, { fontSize: 14, textAlign: 'left' }]}>{anggaranBody?.biayaPenginapanInfo}</Text>

                        <View style={{ height: 2, marginBottom: 10 }} />

                        {anggaranBody?.biayaBBMDanPelumas && <>
                                <Text style={[styles.anggaranText, { textAlign: 'left' }]}>BBM :</Text>
                                <Text style={[styles.anggaranText, { textAlign: 'left', fontSize: 16 }]}>PP : Rp. {Number(anggaranBody?.biayaBBMDanPelumas?.BBM?.PP).toLocaleString()}</Text>
                                <Text style={[styles.anggaranText, { textAlign: 'left', fontSize: 16 }]}>Jatah Harian : Rp. {Number(anggaranBody?.biayaBBMDanPelumas?.BBM?.jathar).toLocaleString()}</Text>

                                <View style={{ height: 2, marginBottom: 10 }} />

                                <Text style={[styles.anggaranText, { textAlign: 'left' }]}>Pelumas :</Text>
                                <Text style={[styles.anggaranText, { textAlign: 'left', fontSize: 16 }]}>PP : Rp. {Number(anggaranBody?.biayaBBMDanPelumas?.pelumas?.PP).toLocaleString()}</Text>
                                <Text style={[styles.anggaranText, { textAlign: 'left', fontSize: 16 }]}>Jatah Harian : Rp. {Number(anggaranBody?.biayaBBMDanPelumas?.pelumas?.jathar).toLocaleString()}</Text>

                                <View style={{ height: 2, marginBottom: 3 }} />


                             <Text style={[styles.anggaranText, { fontSize: 14, textAlign: 'left' }]}>{anggaranBody?.biayaBBMDanPelumasInfo}</Text>
                        </>}

                        {anggaranBody?.biayaTransport && <>
                            <Text style={[styles.anggaranText, { textAlign: 'left' }]}>Biaya Transport : Rp. {Number(anggaranBody?.biayaTransport).toLocaleString()}</Text>
                            <Text style={[styles.anggaranText, { fontSize: 14, textAlign: 'left' }]}>{anggaranBody?.biayaTransportInfo}</Text>
                        </>}

                        <View style={{ height: 2, marginTop: 10 }} />
                        
                        <Text style={[styles.anggaranText, { textAlign: 'left' }]}>Uang Representasi : Rp. {Number(anggaranBody?.uangRepresentasi).toLocaleString()}</Text>
                        <Text style={[styles.anggaranText, { fontSize: 14, textAlign: 'left' }]}>{anggaranBody?.uangRepresentasiInfo}</Text>

                        <View style={{ height: 2, backgroundColor: 'grey', marginVertical: 10 }} />

                        <Text style={styles.anggaranText}>Total : Rp. {Number(anggaranBody?.total).toLocaleString()}</Text>
                    </View>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Status</Text>
                    <Text style={styles.text}>{status}</Text>
                </View>
            </ScrollView>
            </View>
            { (status == 'pending' && userRole == 'dipa') && (
                <View style={styles.footer}>
                    <CustomButton title='Approve' buttonStyle={styles.editBtn} onPress={() => handleUpdatePerjalanan('approved')} />
                    <CustomButton title='Reject' buttonStyle={styles.deleteBtn} style={styles.editBtnTxt} onPress={() => setModalVisible(!modalVisible)} />
                </View>
            )}

            { (status == 'approved' && userRole == 'anggota') && (
                <View style={styles.footer}>
                    {/* <CustomButton title='Selesai Perjalanan' buttonStyle={{ width: '100%' }} onPress={() => handleSelesaiPerjalanan()} /> */}
                    <CustomButton disabled={isLoading} title='Download Laporan' buttonStyle={{ width: '100%', marginBottom: 8 }} onPress={downloadReport} />
                    <CustomButton title='Selesai Perjalanan' buttonStyle={{ width: '100%' }} onPress={handlePickImage} />
                </View>
            )}

        </Layout>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <View style={styles.modalView}>
                <View style={styles.modalCard}>
                    <Text style={styles.menuTxt}>Berikan Keterangan</Text>
                    <Input
                        placeholder={'...'}
                        multiline
                        numberOfLines={10}
                        maxLength={1000}
                        textAlignVertical='top' 
                        value={keterangan} 
                        onChangeText={text => setKeterangan(text)} 
                    />
                    <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-around', marginTop: 15, width: '100%'}}>
                        <CustomButton title='Cancel' buttonStyle={styles.deleteBtn} style={styles.editBtnTxt} onPress={() => setModalVisible(!modalVisible)} />
                        <CustomButton title='Confirm' buttonStyle={styles.editBtn} onPress={() => handleUpdatePerjalanan('rejected')} />
                    </View>
                </View>
            </View>
        </Modal>
      </>
    )
}

export default DetailPerjalanan

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
    footer: {
        // flexDirection: 'row', 
        width: '100%',
        justifyContent: 'space-around', 
    },
    editBtn: {
        width: '100%',
        marginBottom: 8
    },
    deleteBtn: {
        width: '100%',
        backgroundColor: COLORS.WHITE,
        borderWidth: 1,
    },
    editBtnTxt: {
        color: COLORS.BLACK
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 15
    },
    modalCard: {
        backgroundColor: COLORS.WHITE,
        padding: 20,
        borderRadius: 8,
        elevation: 10
    },
    anggaranCover: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.GRAY,
        width: '100%',
        padding: 10,
    },
    anggaranText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.BLACK,
        textAlign: 'center',
    },
})