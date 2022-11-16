import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Container from '../../../components/Container'
import Input from '../../../components/Input'
import CustomButton from '../../../components/Button'

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    navigation.navigate('Main')
  }

  return (
    <Container style={styles.container}>
      <View style={styles.logo} />
      <View style={styles.loginCard}>
        <Input placeholder='Username' onChangeText={text => setUsername(text)} />
        <Input placeholder='Password' secureTextEntry={true} style={styles.inputPassword} onChangeText={text => setPassword(text)} />
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