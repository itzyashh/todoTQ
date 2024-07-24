import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createTodo, getTodos } from '@/api/todos'

const Page = () => {

  const client = useQueryClient()

  const {data, isLoading, error} = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  console.log('data', data)
  console.log('isLoading', isLoading)
  console.log('error', error)

  const {mutate, isPending, error: mutationErr} = useMutation({
    mutationFn: () => createTodo('New wTodo'),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['todos'] })
    }
  })


  console.log('isPending', isPending)
  console.log('mutationErr', mutationErr)
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View>
            <Text>{item.task}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
      <Button
        title="Create Todo"
        onPress={() => {
          mutate()
        }}
        />
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})