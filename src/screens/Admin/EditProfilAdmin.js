import React, { useEffect, useState } from 'react'
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';

import { Dimensions, Image, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { editAnggota, getProfile } from '../../service/userService';

import { COLORS } from '../../utils/colors';
import Layout from '../../components/Layout';
import CustomButton from '../../components/Button';
import Input from '../../components/Input';
import { getPangkat } from '../../service/e-sipdService';
import axios from 'axios';
import { baseUrl } from '../../service/apiConfig';
import pp from '../../assets/images/pp.png';
const EditProfilAdmin = ({ route, navigation }) => {
    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)

    const { params } = route;

    // Pangkat
    const [pangkat, setPangkat] = useState(params?.pangkat)
    const [daftarPangkat, setDaftarPangkat] = useState([
        { label: 'Letnan', value: 'Letnan' },
        { label: 'Kapten', value: 'Kapten' },
        { label: 'Kolonel', value: 'Kolonel' },
        { label: 'Jenderal', value: 'Jenderal' }
    ]);

    // Bagian
    const [bagian, setBagian] = useState(params.bagian)

    // Data
    const [nama, setNama] = useState(params.nama)
    const [nrp, setNrp] = useState(params.nrp)
    const [jabatan, setJabatan] = useState(params.jabatan)
    const [image, setImage] = useState(params.foto)

    const getAdminProfile = () => {
        axios({
            method: 'GET',
            url: `${baseUrl}/users/${params.id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                dispatch({
                    type: 'SAVE_USER', data: {
                        id: res.data.data.id,
                        nama: res.data.data.nama,
                        username: res.data.data.username,
                        nrp: res.data.data.nrp,
                        alamat: res.data.data.alamat,
                        pangkat: res.data.data.pangkat,
                        bagian: res.data.data.bagian,
                        foto: res.data.data.foto,
                        jabatan: res.data.data.jabatan,
                        role: res.data.data.role,
                        aktif: res.data.data.active
                    }
                })
            })
            .catch(err => {
                console.log('err =', err.response.data)
                alert(err.response.data.message)
            })
    }

    const handleEditDipa = () => {
        editAnggota(params.id, token, {
            nama,
            nrp,
            pangkat,
            jabatan,
            bagian,
            aktif: true,
            pangkat_id: (daftarPangkat?.find(item => item.sub_pangkat === pangkat)).id
        })
            .then(response => {
                getProfile(params.id, token)
                    .then(res => {
                        dispatch({
                            type: 'SAVE_USER', data: {
                                id: res.data.data.id,
                                nama: res.data.data.nama,
                                username: res.data.data.username,
                                nrp: res.data.data.nrp,
                                alamat: res.data.data.alamat,
                                pangkat: res.data.data.pangkat,
                                bagian: res.data.data.bagian,
                                foto: res.data.data.foto,
                                jabatan: res.data.data.jabatan,
                                role: res.data.data.role,
                                aktif: res.data.data.active,
                            }
                        })
                        getAdminProfile()
                        alert('Sukses Mengedit Profil')
                        navigation.goBack()
                    })
            })
            .catch(err => {
                console.log('err =', err.response.data)
                alert(err.response.data.message)
            })
    }

    const handleChangeProfileImage = async () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true
        }

        launchImageLibrary(options, async (res) => {
            if (res.didCancel) {
                console.log('User Canceled')
            } else {
                const response = await axios({
                    method: 'POST',
                    url: `${baseUrl}/upload-profile`,
                    data: {
                        userId: params?.id,
                        file: {
                            base64: res.assets[0].base64,
                            type: res.assets[0].type
                        }
                    }
                })
                setImage(response.data.data)
                getAdminProfile()
            }
        });
    }

    const handleGetPangkat = () => {
        getPangkat(token)
            .then(res => {
                setDaftarPangkat(res.data.data)
            })
            .catch(err => {
                console.log('err =', err.response.data)
                alert(err.response.data.message)
            })
    }

    useEffect(() => {
        handleGetPangkat()
    }, [])

    return (
        <ScrollView style={{ backgroundColor: COLORS.WHITE }} showsVerticalScrollIndicator={false}>
            <Layout title='Edit DIPA' contentStyle={{ paddingTop: 40 }}>
                {/* Image */}
                <View style={styles.photoContainer}>
                    <Image source={image && image !== 'null' ? { uri: image } : pp} style={styles.photo} />
                </View>
                {/* Upload Button */}
                <CustomButton title='Choose File' buttonStyle={styles.chooseBtn} style={styles.chooseBtnTxt} onPress={handleChangeProfileImage} />
                {/* Menus */}
                <View style={{ width: '80%' }}>
                    <View style={styles.menu}>
                        <Text style={styles.menuTxt}>Nama</Text>
                        <Input value={nama} onChangeText={text => setNama(text)} />
                    </View>
                    <View style={styles.menu}>
                        <Text style={styles.menuTxt}>NRP</Text>
                        <Input value={nrp} onChangeText={text => setNrp(text)} />
                    </View>
                    <View style={[styles.menu, { zIndex: 2 }]}>
                        <Text style={styles.menuTxt}>Pangkat</Text>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={pangkat}
                                style={{ color: 'black' }}
                                onValueChange={itemValue => setPangkat(itemValue)}
                            >
                                {daftarPangkat.map((item, index) => (
                                    <Picker.Item
                                        key={index}
                                        label={item.sub_pangkat}
                                        value={item.sub_pangkat}
                                        style={{ fontSize: 17 }}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={[styles.menu, { zIndex: 1 }]}>
                        <View style={styles.menu}>
                            <Text style={styles.menuTxt}>Bagian</Text>
                            <Input
                                placeholder={'Bagian'}
                                placeholderTextColor='grey'
                                value={bagian}
                                onChangeText={text => setBagian(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.menu}>
                        <Text style={styles.menuTxt}>Jabatan</Text>
                        <Input value={jabatan} onChangeText={text => setJabatan(text)} />
                    </View>
                </View>
                {/* Button */}
                <View style={styles.footer}>
                    <CustomButton title='Submit' buttonStyle={styles.submitBtn} onPress={() => handleEditDipa()} />
                </View>
            </Layout>
        </ScrollView>
    )
}

export default EditProfilAdmin

const styles = StyleSheet.create({
    photoContainer: {
        backgroundColor: COLORS.WHITE,
        elevation: 10,
        borderColor: COLORS.GRAY,
        borderRadius: 8,
        overflow: 'hidden',
        width: '70%',
        height: Dimensions.get('screen').height * 0.3,
        marginBottom: 15
    },
    photo: {
        width: '100%',
        height: '100%',
    },
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
    footer: {
        flexDirection: 'row',
        marginTop: 20
    },
    submitBtn: {
        width: '80%',
    },
    chooseBtn: {
        width: '45%',
        backgroundColor: COLORS.WHITE,
        borderWidth: 1,
        marginBottom: 15,
        borderColor: COLORS.GRAY,
    },
    chooseBtnTxt: {
        color: COLORS.BLACK,
    },
})