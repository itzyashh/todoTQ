import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import { login } from '@/api/auth'

const Page = () => {

  const [email, setEmail] = React.useState('yashjadhav@email.com')
  const [password, setPassword] = React.useState('12345')
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const onSubmit = async () => {
    setLoading(true)
    await login(email, password)
  }


  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Login' }} />
      <Text style={styles.logo}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
         autoCapitalize='none'
         value={email} onChangeText={setEmail}
         style={styles.input} placeholder='Email' />
        <TextInput
         secureTextEntry value={password} onChangeText={setPassword}
         style={styles.input} placeholder='Password' />
      </View>
      <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={onSubmit}>
        <Text>Login</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text>Don't have an account? <Link asChild href='/register'>
            <Text style={styles.register}>Register</Text></Link></Text></View>
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