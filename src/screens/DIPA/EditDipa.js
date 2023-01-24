import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-picker/picker';

import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { editAnggota, getProfile } from '../../service/userService';

import { COLORS } from '../../utils/colors';
import Layout from '../../components/Layout';
import CustomButton from '../../components/Button';
import Input from '../../components/Input';
import { getPangkat } from '../../service/e-sipdService';

const EditDipa = ({ route, navigation }) => {
    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)

    const { params } = route;

    // Pangkat
    const [pangkat, setPangkat] = useState(params.pangkat)
    const [daftarPangkat, setDaftarPangkat] = useState([
      {label: 'Letnan', value: 'Letnan'},
      {label: 'Kapten', value: 'Kapten'},
      {label: 'Kolonel', value: 'Kolonel'},
      {label: 'Jenderal', value: 'Jenderal'}
    ]);

    // Bagian
    const [bagian, setBagian] = useState(params.bagian)
    const [itemsBagian, setItemsBagian] = useState([
      {label: 'Manajemen', value: 'Manajemen'},
      {label: 'Pengurus', value: 'Pengurus'},
      {label: 'Bagian 1', value: '1'},
      {label: 'Bagian 2', value: '2'},
    ]);

    // Data
    const [nama, setNama] = useState(params.nama)
    const [nrp, setNrp] = useState(params.nrp)
    const [jabatan, setJabatan] = useState(params.jabatan)

    const handleEditDipa = () => {
      editAnggota(params.id, token, {
        nama,
        nrp,
        pangkat,
        jabatan,
        bagian,
      })
      .then(response => {
        getProfile(params.id, token)
        .then(res => {
          dispatch({type: 'SAVE_CURRENT_USER', data: {
            id: res.data.data.id,
            nama: res.data.data.nama,
            username: res.data.data.username,
            nrp: res.data.data.nrp,
            alamat: res.data.data.alamat,
            pangkat: res.data.data.pangkat,
            bagian: res.data.data.bagian,
            foto: res.data.data.foto,
            jabatan: res.data.data.jabatan,
            role: res.data.data.role
          }})
          alert('Sukses Mengedit Anggota')
          navigation.goBack()
        })
      })
      .catch(err => {
        console.log('err =', err.response.data)
        alert(err.response.data.message)
      })
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
              <View style={[styles.menu, {zIndex: 2}]}>
                <Text style={styles.menuTxt}>Pangkat</Text>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={pangkat}
                    onValueChange={itemValue => setPangkat(itemValue)}
                  >
                    { daftarPangkat.map((item, index) => (
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
              <View style={[styles.menu, {zIndex: 1}]}>
                <Text style={styles.menuTxt}>Bagian</Text>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={bagian}
                    onValueChange={itemValue => setBagian(itemValue)}
                  >
                    { itemsBagian.map((item, index) => (
                      <Picker.Item
                          key={index}
                          label={item.label} 
                          value={item.value} 
                          style={{ fontSize: 17 }} 
                      />
                    ))}
                  </Picker>
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

export default EditDipa

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
    footer: {
      flexDirection: 'row',
      marginTop: 20
    },
    submitBtn: {
      width: '80%',
    },
})