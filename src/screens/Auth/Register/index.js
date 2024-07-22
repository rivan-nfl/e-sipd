import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';

import photoProfile from '../../../assets/images/pp.png'
import { COLORS } from '../../../utils/colors'

import Container from '../../../components/Container'
import CustomButton from '../../../components/Button'
import Header from '../../../components/Header'
import Input from '../../../components/Input'

import { getPangkat } from '../../../service/e-sipdService';
import { register } from '../../../service/authService';
import { baseUrl } from '../../../service/apiConfig';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';

const Register = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const { params } = route
  const [role, setRole] = useState(params)

  const [nama, setNama] = useState('')
  const [nrp, setNrp] = useState('')
  const [alamat, setAlamat] = useState('')
  const [jabatan, setJabatan] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [image, setImage] = useState({})

  // Pangkat
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    // {
    //   "id": 3,
    //   "pangkat": "Perwira Tinggi",
    //   "sub_pangkat": "Letjen",
    //   "tingkat": "A"
    // }
  ]);

  // Bagian
  const [valueBagian, setValueBagian] = useState(null);
  const [itemsBagian, setItemsBagian] = useState([
    { label: 'Bagian 1', value: '1' },
    { label: 'Bagian 2', value: '2' },
    { label: 'Bagian 3', value: '3' },
  ]);

  const getAllAnggota = () => {
    if (role == 'dipa') {
      axios({
        method: 'GET',
        url: `${baseUrl}/users`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          role: 'dipa'
        },
      })
        .then(res => {
          dispatch({ type: 'SAVE_DIPA', data: res.data.data })
        })
        .catch(err => {
          console.log('err =', err.response.data)
          alert(err.response.data.message)
        })
    } else {
      // Get All anggota
      axios({
        method: 'GET',
        url: `${baseUrl}/users`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          role: 'anggota'
        },
      })
        .then(response => {
          dispatch({ type: 'SAVE_ANGGOTA', data: response.data.data })
        })
        .catch(err => {
          console.log('err =', err.response.data)
          alert(err.response.data.message)
        })
    }
  }

  // Functions
  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Password tidak sama !')
    } else {
      register({
        nama,
        nrp,
        alamat,
        pangkat: value,
        jabatan,
        bagian: valueBagian,
        image: "",
        username,
        password,
        role,
        pangkat_id: (items?.find(item => item.sub_pangkat === value)).id
      })
        .then(res => {
          if (image?.uri) {
            axios({
              method: 'POST',
              url: `${baseUrl}/upload-profile`,
              data: {
                userId: res.data.data.id,
                file: {
                  base64: image.base64,
                  type: image.type
                }
              }
            })
              .then(resPhoto => {
                getAllAnggota()
                Alert.alert(
                  "Sukses",
                  `Berhasil Membuat ${role == 'dipa' ? 'Dipa' : 'Anggota'}`,
                  [
                    { text: "Kembali ke Beranda", onPress: () => navigation.navigate("Main") }
                  ]
                );
              })
          } else {
            getAllAnggota()
            Alert.alert(
              "Sukses",
              `Berhasil Membuat ${role == 'dipa' ? 'Dipa' : 'Anggota'}`,
              [
                { text: "Kembali ke Beranda", onPress: () => navigation.navigate("Main") }
              ]
            );
          }
        })
        .catch(err => {
          console.log(err.response.data.message)
          alert(err.response.data.message)
        })
    }
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
        setImage(res.assets[0])
      }
    });
  }

  // Loads
  useEffect(() => {
    getPangkat(token)
      .then(res => setItems(res.data.data))
      .catch(err => {
        console.log(err)
        alert(err.message)
      })
  }, [])

  return (
    <ScrollView style={{ backgroundColor: COLORS.WHITE }} showsVerticalScrollIndicator={false}>
      <Header title='Register' />
      <Container style={styles.container}>
        {/* Image */}
        <View style={styles.photoContainer}>
          <Image source={image?.uri ? { uri: image?.uri } : photoProfile} style={styles.photo} />
        </View>
        {/* Upload Button */}
        <CustomButton title='Choose File' buttonStyle={styles.chooseBtn} style={styles.chooseBtnTxt} onPress={handleChangeProfileImage} />
        <View style={{ width: '100%' }}>
          <View style={styles.menu}>
            <Text style={styles.menuTxt}>Nama</Text>
            <Input
              placeholder={'Nama'}
              placeholderTextColor='grey'
              value={nama}
              onChangeText={text => setNama(text)}
            />
          </View>
          <View style={styles.menu}>
            <Text style={styles.menuTxt}>NRP</Text>
            <Input
              placeholder={'NRP'}
              placeholderTextColor='grey'
              value={nrp}
              onChangeText={text => setNrp(text)}
            />
          </View>
          <View style={styles.menu}>
            <Text style={styles.menuTxt}>Alamat</Text>
            <Input
              placeholder={'Alamat'}
              placeholderTextColor='grey'
              value={alamat}
              onChangeText={text => setAlamat(text)}
            />
          </View>
          <View style={styles.menu}>
            <Text style={styles.menuTxt}>Pangkat</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={value}
                style={{ color: 'black' }}
                onValueChange={itemValue => setValue(itemValue)}
              >
                {items.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.sub_pangkat}
                    value={item.sub_pangkat}
                    style={{ fontSize: 16 }}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.menu}>
            <Text style={styles.menuTxt}>Jabatan</Text>
            <Input
              placeholder={'Jabatan'}
              placeholderTextColor='grey'
              value={jabatan}
              onChangeText={text => setJabatan(text)}
            />
          </View>
          <View style={styles.menu}>
            <Text style={styles.menuTxt}>Bagian</Text>
            <Input
              placeholder={'Bagian'}
              placeholderTextColor='grey'
              value={valueBagian}
              onChangeText={text => setValueBagian(text)}
            />
            {/* <View style={styles.picker}>
            <Picker
              selectedValue={valueBagian}
              onValueChange={itemValue => setValueBagian(itemValue)}
            >
              { itemsBagian.map((item, index) => (
                <Picker.Item 
                    key={index} 
                    label={item.label}
                    value={item.label}
                    style={{ fontSize: 16 }} 
                />
              ))}
            </Picker>
            </View> */}
          </View>
          <View style={styles.menu}>
            <Text style={styles.menuTxt}>Username</Text>
            <Input
              placeholder={'Username'}
              placeholderTextColor='grey'
              value={username}
              onChangeText={text => setUsername(text)}
            />
          </View>
          <View style={styles.menu}>
            <Text style={styles.menuTxt}>Password</Text>
            <Input
              placeholder={'Password'}
              secureTextEntry
              placeholderTextColor='grey'
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View style={styles.menu}>
            <Text style={styles.menuTxt}>Confirm Password</Text>
            <Input
              placeholder={'Confirm Password'}
              secureTextEntry
              placeholderTextColor='grey'
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
            />
          </View>
          <View style={styles.footer}>
            <CustomButton title='Submit' buttonStyle={styles.submitBtn} onPress={handleRegister} />
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
    width: '100%',
  },
})