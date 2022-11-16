import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

import photoProfile from '../../../assets/images/pp.jpg'
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../utils/colors'

import Container from '../../../components/Container'
import CustomButton from '../../../components/Button'
import Header from '../../../components/Header'
import Input from '../../../components/Input'

const Register = () => {
  // const [role, setRole] = useState('anggota')
  const [role, setRole] = useState('dipa')

  // Pangkat
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Letnan', value: 'letnan'},
    {label: 'Kapten', value: 'kapten'},
    {label: 'Kolonel', value: 'kolonel'},
    {label: 'Jenderal', value: 'jenderal'}
  ]);

  // Bagian
  const [openBagian, setOpenBagian] = useState(false);
  const [valueBagian, setValueBagian] = useState(null);
  const [itemsBagian, setItemsBagian] = useState([
    {label: 'Bagian 1', value: '1'},
    {label: 'Bagian 2', value: '2'},
    {label: 'Bagian 3', value: '3'},
  ]);

  return (
    <ScrollView style={{ backgroundColor: COLORS.WHITE }} showsVerticalScrollIndicator={false}>
    <Header title='Register' />
    <Container style={styles.container}>
      { role == 'anggota' && <>
        {/* Image */}
        <View style={styles.photoContainer}>
            <Image source={photoProfile} style={styles.photo} />
        </View>
        {/* Upload Button */}
        <CustomButton title='Choose File' buttonStyle={styles.chooseBtn} style={styles.chooseBtnTxt} onPress={() => alert('Upload File')} />
      </>}
      <View style={{ width: '100%' }}>
        <View style={styles.menu}>
          <Text style={styles.menuTxt}>Nama</Text>
          <Input placeholder={'Nama'} />
        </View>
        <View style={styles.menu}>
          <Text style={styles.menuTxt}>NRP</Text>
          <Input placeholder={'NRP'} />
        </View>
        <View style={styles.menu}>
          <Text style={styles.menuTxt}>Pangkat</Text>
          <DropDownPicker
            placeholder='Pilih Pangkat'
            placeholderStyle={{ color: COLORS.GRAY, fontSize: 17 }}
            style={{ borderColor: COLORS.GRAY }}
            labelStyle={{ fontSize: 17 }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
        <View style={styles.menu}>
          <Text style={styles.menuTxt}>Jabatan</Text>
          <Input placeholder={'Jabatan'} />
        </View>
        { role == 'dipa' && (
          <View style={styles.menu}>
            <Text style={styles.menuTxt}>Bagian</Text>
            <DropDownPicker
              placeholder='Pilih Bagian'
              placeholderStyle={{ color: COLORS.GRAY, fontSize: 17 }}
              style={{ borderColor: COLORS.GRAY }}
              labelStyle={{ fontSize: 17 }}
              open={openBagian}
              value={valueBagian}
              items={itemsBagian}
              setOpen={setOpenBagian}
              setValue={setValueBagian}
              setItems={setItemsBagian}
            />
          </View>
        )}
        <View style={styles.menu}>
          <Text style={styles.menuTxt}>Username</Text>
          <Input placeholder={'Username'} />
        </View>
        <View style={styles.menu}>
          <Text style={styles.menuTxt}>Password</Text>
          <Input placeholder={'Password'} secureTextEntry />
        </View>
        <View style={styles.menu}>
          <Text style={styles.menuTxt}>Confirm Password</Text>
          <Input placeholder={'Confirm Password'} secureTextEntry />
        </View>
        <View style={styles.footer}>
            <CustomButton title='Submit' buttonStyle={styles.submitBtn} onPress={() => alert('Submit')} />
        </View>
      </View>
    </Container>
    </ScrollView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: { 
    alignItems: 'center', 
    paddingHorizontal: 25,
    paddingVertical: 40
  },
  photoContainer: {
    backgroundColor: COLORS.WHITE,
    elevation: 10,
    borderColor: COLORS.GRAY,
    borderRadius: 8,
    overflow: 'hidden',
    width: '70%',
    height: Dimensions.get('screen').height * 0.25,
    marginBottom: 14
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
    width: '100%',
  },
})