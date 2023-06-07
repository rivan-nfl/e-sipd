import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Modal, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

import { getAllPerjalanan, getAnggaran, getPangkat, updatePerjalanan } from '../../service/e-sipdService';
import { COLORS } from '../../utils/colors';

import Layout from '../../components/Layout';
import CustomButton from '../../components/Button';
import Input from '../../components/Input';

const DetailPerjalanan = ({ route }) => {
    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)
    const userRole = useSelector(state => state.user.role)
    const user = useSelector(state => state.user)

    const { params } = route;

    const [modalVisible, setModalVisible] = useState(false);
    const [keterangan, setKeterangan] = useState('')
    const [status, setStatus] = useState(params.status)
    const [anggaran, setAnggaran] = useState('')

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

    const handleGetAnggaran = () => {
        getPangkat(token, { pangkat: user.pangkat })
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
        .catch(err => {
            console.log('Masuk');
            console.log('err =', err.response.data)
            alert(err.response.data.message)
        })
    }

    useEffect(() => {
        handleGetAnggaran()
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
                    <Text style={styles.text}>{params.penerima}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Diajukan Pada</Text>
                    <Text style={styles.text}>{new Date(params.created_at).toLocaleDateString()}</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Anggaran</Text>
                    <View style={styles.anggaranCover}>
                        <Text style={styles.anggaranText}>Rp. {anggaran}</Text>
                        <Text style={styles.anggaranText}>Total : Rp. {anggaran}</Text>
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