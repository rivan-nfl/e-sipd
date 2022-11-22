import React, { useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { COLORS } from '../../utils/colors';

import Layout from '../../components/Layout';
import CustomButton from '../../components/Button';
import Input from '../../components/Input';

const EditAnggota = ({ route, navigation }) => {
    const { params } = route;

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Letnan', value: 'letnan'},
      {label: 'Kapten', value: 'kapten'},
      {label: 'Kolonel', value: 'kolonel'},
      {label: 'Jenderal', value: 'jenderal'}
    ]);

    return (
      <ScrollView style={{ backgroundColor: COLORS.WHITE }} showsVerticalScrollIndicator={false}>
      <Layout>
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
                <Input placeholder={params.nama} />
              </View>
              <View style={styles.menu}>
                <Text style={styles.menuTxt}>NRP</Text>
                <Input placeholder={params.nrp} />
              </View>
              <View style={styles.menu}>
                <Text style={styles.menuTxt}>Pangkat</Text>
                {/* <Input placeholder={params.pangkat} /> */}
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
                <Input placeholder={params.jabatan} />
              </View>
            </View>
            {/* Button */}
            <View style={styles.footer}>
                <CustomButton title='Submit' buttonStyle={styles.submitBtn} onPress={() => alert('Submit')} />
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