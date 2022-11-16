import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../utils/colors';

import Layout from '../../components/Layout';
import CustomButton from '../../components/Button';
import Input from '../../components/Input';

const EditAnggota = ({ route }) => {
    const { params } = route;

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
      {label: 'Bagian 4', value: '4'}
    ]);

    return (
      <ScrollView style={{ backgroundColor: COLORS.WHITE }} showsVerticalScrollIndicator={false}>
      <Layout title='Edit DIPA' contentStyle={{ paddingTop: 40 }}>
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
              <View style={[styles.menu, {zIndex: 2}]}>
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
              <View style={[styles.menu, {zIndex: 1}]}>
                <Text style={styles.menuTxt}>Bagian</Text>
                <DropDownPicker
                  placeholder='Pilih Bagian'
                  placeholderStyle={{ color: COLORS.GRAY, fontSize: 17 }}
                  style={{ borderColor: COLORS.GRAY, zIndex: 100 }}
                  labelStyle={{ fontSize: 17 }}
                  open={openBagian}
                  value={valueBagian}
                  items={itemsBagian}
                  setOpen={setOpenBagian}
                  setValue={setValueBagian}
                  setItems={setItemsBagian}
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