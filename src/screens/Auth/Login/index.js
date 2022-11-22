import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import Container from '../../../components/Container'
import Input from '../../../components/Input'
import CustomButton from '../../../components/Button'

const Login = ({ navigation }) => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('password')

  const handleLogin = () => {
    axios({
      method: 'POST',
      url: 'http://10.0.2.2:4000/auth/login',
      data: {
        username,
        password
      }
    })
    .then(res => {
      dispatch({type: 'LOGIN', token: res.data.token})
      dispatch({type: 'SAVE_USER', data: {
        id: res.data.data.id,
        nama: res.data.data.nama,
        username: res.data.data.username,
        alamat: res.data.data.alamat,
        role: res.data.data.role
      }})
      navigation.navigate('Main')
    })
    .catch(err => {
      console.log('err =', err.response.data)
      alert(err.response.data.message)
    })
  }

  return (
    <Container style={styles.container}>
      <View style={styles.logo} />
      <View style={styles.loginCard}>
        <Input placeholder='Username' onChangeText={text => setUsername(text)} value={username} />
        <Input placeholder='Password' secureTextEntry={true} style={styles.inputPassword} onChangeText={text => setPassword(text)} value={password} />
        <CustomButton onPress={handleLogin} />
      </View>
      <Text style={styles.bottomText}>E - SIPD</Text>
    </Container>
  )
}

export default Login

const styles = StyleSheet.create({
  container: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 25
  },
  logo: { 
    backgroundColor: 'red', 
    width: '40%', 
    aspectRatio: 1 
  },
  loginCard: {
    marginVertical: 50, 
    width: '100%'
  },
  inputPassword: {
    marginVertical: 30
  },
  bottomText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black'
  }
})