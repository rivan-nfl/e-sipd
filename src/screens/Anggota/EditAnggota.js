import React, { useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';

import { editAnggota, getProfile } from '../../service/userService';
import { COLORS } from '../../utils/colors';
import Layout from '../../components/Layout';
import CustomButton from '../../components/Button';
import Input from '../../components/Input';

const EditAnggota = ({ route, navigation }) => {
    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)

    const { params } = route;

    // Picker
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
      {label: 'Letnan', value: 'Letnan'},
      {label: 'Kapten', value: 'Kapten'},
      {label: 'Kolonel', value: 'Kolonel'},
      {label: 'Jenderal', value: 'Jenderal'}
    ]);

    // Data
    const [nama, setNama] = useState(params.nama)
    const [nrp, setNrp] = useState(params.nrp)
    const [pangkat, setPangkat] = useState(params.pangkat)
    const [jabatan, setJabatan] = useState(params.jabatan)

    const handleEditAnggota = () => {
      editAnggota(params.id, token, {
        nama,
        nrp,
        pangkat,
        jabatan,
        // bagian,
        // image
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

    return (
      <ScrollView style={{ backgroundColor: COLORS.WHITE }} showsVerticalScrollIndicator={false}>
      <Layout title='Edit Anggota'>
          {/* Image */}
            <View style={styles.photoContainer}>
                <Image source={{uri: params.foto}} style={styles.photo} />
            </View>
            {/* Upload Button */}
            <CustomButton title='Choose File' buttonStyle={styles.chooseBtn} style={styles.chooseBtnTxt} onPress={() => alert('Upload File')} />
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
              <View style={styles.menu}>
                <Text style={styles.menuTxt}>Pangkat</Text>
                <DropDownPicker
                  placeholder='Pilih Pangkat'
                  placeholderStyle={{ color: COLORS.GRAY, fontSize: 17 }}
                  style={{ borderColor: COLORS.GRAY }}
                  labelStyle={{ fontSize: 17 }}
                  open={open}
                  value={pangkat}
                  items={items}
                  setOpen={setOpen}
                  setValue={setPangkat}
                  setItems={setItems}
                />
              </View>
              <View style={styles.menu}>
                <Text style={styles.menuTxt}>Jabatan</Text>
                <Input value={jabatan} onChangeText={text => setJabatan(text)} />
              </View>
            </View>
            {/* Button */}
            <View style={styles.footer}>
                <CustomButton title='Submit' buttonStyle={styles.submitBtn} onPress={() => handleEditAnggota()} />
            </View>
      </Layout>
      </ScrollView>
    )
}

export default EditAnggota

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
    menu: {
      marginBottom: 10
    },
    menuTxt: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.BLACK,
      marginBottom: 5
    },
    footer: {
      flexDirection: 'row',
      marginTop: 20
    },
    submitBtn: {
      width: '80%',
    },
})