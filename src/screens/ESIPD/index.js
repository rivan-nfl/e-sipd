import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../utils/colors'

import Layout from '../../components/Layout'
import Input from '../../components/Input'
import CustomButton from '../../components/Button';

const ESIPD = ({ route }) => {
    const { params } = route;

    // Nama
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Letnan', value: 'letnan'},
      {label: 'Kapten', value: 'kapten'},
      {label: 'Kolonel', value: 'kolonel'},
      {label: 'Jenderal', value: 'jenderal'}
    ]);
    
    // Perjalanan Dinas
    const [openPerjalanan, setOpenPerjalanan] = useState(false);
    const [valuePerjalanan, setValuePerjalanan] = useState(null);
    const [itemsPerjalanan, setItemsPerjalanan] = useState([
      {label: 'Letnan', value: 'letnan'},
      {label: 'Kapten', value: 'kapten'},
      {label: 'Kolonel', value: 'kolonel'},
      {label: 'Jenderal', value: 'jenderal'}
    ]);

    // Provinsi
    const [openProvinsi, setOpenProvinsi] = useState(false);
    const [valueProvinsi, setValueProvinsi] = useState(null);
    const [itemsProvinsi, setItemsProvinsi] = useState([
      {label: 'Letnan', value: 'letnan'},
      {label: 'Kapten', value: 'kapten'},
      {label: 'Kolonel', value: 'kolonel'},
      {label: 'Jenderal', value: 'jenderal'}
    ]);

    // Kota
    const [openKota, setOpenKota] = useState(false);
    const [valueKota, setValueKota] = useState(null);
    const [itemsKota, setItemsKota] = useState([
      {label: 'Letnan', value: 'letnan'},
      {label: 'Kapten', value: 'kapten'},
      {label: 'Kolonel', value: 'kolonel'},
      {label: 'Jenderal', value: 'jenderal'}
    ]);

    // Transportasi
    const [openTransportasi, setOpenTransportasi] = useState(false);
    const [valueTransportasi, setValueTransportasi] = useState(null);
    const [itemsTransportasi, setItemsTransportasi] = useState([
      {label: 'Letnan', value: 'letnan'},
      {label: 'Kapten', value: 'kapten'},
      {label: 'Kolonel', value: 'kolonel'},
      {label: 'Jenderal', value: 'jenderal'}
    ]);

    // Lokasi Asal
    const [openLokasiAsal, setOpenLokasiAsal] = useState(false);
    const [valueLokasiAsal, setValueLokasiAsal] = useState(null);
    const [itemsLokasiAsal, setItemsLokasiAsal] = useState([
      {label: 'Letnan', value: 'letnan'},
      {label: 'Kapten', value: 'kapten'},
      {label: 'Kolonel', value: 'kolonel'},
      {label: 'Jenderal', value: 'jenderal'}
    ]);

    // Lokasi Tujuan
    const [openLokasiTujuan, setOpenLokasiTujuan] = useState(false);
    const [valueLokasiTujuan, setValueLokasiTujuan] = useState(null);
    const [itemsLokasiTujuan, setItemsLokasiTujuan] = useState([
      {label: 'Letnan', value: 'letnan'},
      {label: 'Kapten', value: 'kapten'},
    //   {label: 'Kolonel', value: 'kolonel'},
    //   {label: 'Jenderal', value: 'jenderal'}
    ]);

    return (
        <ScrollView style={{ backgroundColor: COLORS.WHITE }} showsVerticalScrollIndicator={false}>
        <Layout title='E - SIPD' contentStyle={{}}>
            <View style={{ width: '90%' }}>
                <View style={[styles.menu, {zIndex: 2}]}>
                    <Text style={styles.menuTxt}>Nama Anggota</Text>
                    <DropDownPicker
                        placeholder='Pilih Anggota'
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
                    <Text style={styles.menuTxt}>Nama</Text>
                    <Input placeholder={'Nama'} />
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Pangkat</Text>
                    <Input placeholder={'Pangkat'} />
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Jabatan</Text>
                    <Input placeholder={'Jabatan'} />
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Nomor Sprint</Text>
                    <Text style={styles.text}>111 / XI / 2022</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Nomor SPPD</Text>
                    <Text style={styles.text}>111 / XI / 2022</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Maksud Perjalanan Dinas</Text>
                    <Input placeholder={'...'} multiline maxLength={1000} />
                </View>
                <View style={[styles.menu, {zIndex: 3}]}>
                    <Text style={styles.menuTxt}>Jenis Perjalanan Dinas</Text>
                    <DropDownPicker
                        placeholder='Pilih Jenis Perjalanan Dinas'
                        placeholderStyle={{ color: COLORS.GRAY, fontSize: 17 }}
                        style={{ borderColor: COLORS.GRAY }}
                        labelStyle={{ fontSize: 17 }}
                        open={openPerjalanan}
                        value={valuePerjalanan}
                        items={itemsPerjalanan}
                        setOpen={setOpenPerjalanan}
                        setValue={setValuePerjalanan}
                        setItems={setItemsPerjalanan}
                    />
                </View>
                <View style={[styles.menu, {zIndex: 2}]}>
                    <Text style={styles.menuTxt}>Daerah Tujuan</Text>
                    <DropDownPicker
                        placeholder='Pilih Provinsi'
                        placeholderStyle={{ color: COLORS.GRAY, fontSize: 17 }}
                        style={{ borderColor: COLORS.GRAY }}
                        labelStyle={{ fontSize: 17 }}
                        open={openProvinsi}
                        value={valueProvinsi}
                        items={itemsProvinsi}
                        setOpen={setOpenProvinsi}
                        setValue={setValueProvinsi}
                        setItems={setItemsProvinsi}
                    />
                </View>
                <View style={[styles.menu, {zIndex: 1}]}>
                    <DropDownPicker
                        placeholder='Pilih Kota'
                        placeholderStyle={{ color: COLORS.GRAY, fontSize: 17 }}
                        style={{ borderColor: COLORS.GRAY }}
                        labelStyle={{ fontSize: 17 }}
                        open={openKota}
                        value={valueKota}
                        items={itemsKota}
                        setOpen={setOpenKota}
                        setValue={setValueKota}
                        setItems={setItemsKota}
                    />
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Tanggal Berangkat</Text>
                    <Text style={styles.text}>1 / 1 / 2022</Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Tanggal Kembali</Text>
                    <Text style={styles.text}>1 / 1 / 2022</Text>
                </View>
                <View style={{ borderWidth: 1, width: '100%', borderColor: COLORS.GRAY, marginVertical: 10 }} />
                <View style={[styles.menu, {zIndex: 3}]}>
                    <Text style={styles.menuTxt}>Transportasi</Text>
                    <DropDownPicker
                        placeholder='Pilih Transportasi'
                        placeholderStyle={{ color: COLORS.GRAY, fontSize: 17 }}
                        style={{ borderColor: COLORS.GRAY }}
                        labelStyle={{ fontSize: 17 }}
                        open={openTransportasi}
                        value={valueTransportasi}
                        items={itemsTransportasi}
                        setOpen={setOpenTransportasi}
                        setValue={setValueTransportasi}
                        setItems={setItemsTransportasi}
                    />
                </View>
                <View style={[styles.menu, {zIndex: 2}]}>
                    <Text style={styles.menuTxt}>Lokasi Asal</Text>
                    <DropDownPicker
                        placeholder='Pilih Lokasi Asal'
                        placeholderStyle={{ color: COLORS.GRAY, fontSize: 17 }}
                        style={{ borderColor: COLORS.GRAY }}
                        labelStyle={{ fontSize: 17 }}
                        open={openLokasiAsal}
                        value={valueLokasiAsal}
                        items={itemsLokasiAsal}
                        setOpen={setOpenLokasiAsal}
                        setValue={setValueLokasiAsal}
                        setItems={setItemsLokasiAsal}
                    />
                </View>
                <View style={[styles.menu, {zIndex: 1}]}>
                    <Text style={styles.menuTxt}>Lokasi Tujuan</Text>
                    <DropDownPicker
                        placeholder='Pilih Lokasi Tujuan'
                        placeholderStyle={{ color: COLORS.GRAY, fontSize: 17 }}
                        style={{ borderColor: COLORS.GRAY }}
                        labelStyle={{ fontSize: 17 }}
                        open={openLokasiTujuan}
                        value={valueLokasiTujuan}
                        items={itemsLokasiTujuan}
                        setOpen={setOpenLokasiTujuan}
                        setValue={setValueLokasiTujuan}
                        setItems={setItemsLokasiTujuan}
                    />
                </View>
                <View style={styles.menu}>
                    <Text style={styles.menuTxt}>Jarak</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Input placeholder={'Jarak'} keyboardType='number-pad' style={{ flex: 1 }} />
                        <Text style={[styles.menuTxt, { marginLeft: 10 }]}>KM</Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <CustomButton title='Submit' buttonStyle={styles.submitBtn} onPress={() => alert('Submit')} />
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