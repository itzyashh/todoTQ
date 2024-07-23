import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'

const Page = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Register' }} />
      <Text style={styles.logo}>Register</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder='Email' />
        <TextInput style={styles.input} placeholder='Password' />
      </View>
      <TouchableOpacity activeOpacity={0.7} style={styles.button}>
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