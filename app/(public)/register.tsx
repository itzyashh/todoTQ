import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'

import Spinner from 'react-native-loading-spinner-overlay'
import { useAuth } from '@/provider/AuthProvider'

const Page = () => {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const { onRegister } = useAuth()

  const onSubmit = async () => {
    setLoading(true)
    await onRegister!(email, password).finally(() => setLoading(false))
  }

  if (loading) {
    return <Spinner visible={loading} color='#fb5b5a' />
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Register' }} />
      <Text style={styles.logo}>Register</Text>
      <View style={styles.inputContainer}>
        <TextInput
         autoCapitalize='none'
         value={email} onChangeText={setEmail}
         style={styles.input} placeholder='Email' />
        <TextInput secureTextEntry value={password} onChangeText={setPassword}
         style={styles.input} placeholder='Password' />
      </View>
      <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={onSubmit}>
        <Text>Register</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text>Already have an account? <Link asChild href='/login'>
          <Text style={styles.register}>Login</Text></Link></Text></View>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40
  },
  inputContainer: {
    width: '80%',
    gap: 20
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#d3d3d3'
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fb5b5a',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  registerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  register: {
    color: '#fb5b5a'
  }
})