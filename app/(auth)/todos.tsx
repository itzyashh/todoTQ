import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createTodo, deleteTodo, getTodos, Todo, updateTodo } from '@/api/todos'
import TodoItem from '@/components/TodoItem'
import { AntDesign } from '@expo/vector-icons'
import BottomSheet from '@/components/BottomSheet'
import Spinner from 'react-native-loading-spinner-overlay'

const Page = () => {

  const client = useQueryClient()
  const [bottomSheetVisible, setBottomSheetVisible] = React.useState(false)
  const {data, isLoading, error} = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  const {mutate, isPending, error: mutationErr} = useMutation({
    mutationFn: (task: string) => createTodo(task),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['todos'] })
    }
  })

  const { mutate: updateMutation} = useMutation({
    mutationFn: async (updatedTodo: Todo) => updateTodo(updatedTodo),
    onSuccess: (updatedTodo) => {
      client.setQueryData(['todos'], (prev: Todo[]) => prev.map((todo) => todo._id === updatedTodo._id ? updatedTodo : todo))
    }
  })

  const { mutate: deleteMutation} = useMutation({
    mutationFn: async (id: string) => deleteTodo(id),
    onError: (err) => console.log('err', err),
    onSuccess: (id) => {
      client.setQueryData(['todos'], (prev: Todo[] = []) => prev.filter((todo) => todo._id !== id))
    }
  })

  const onAdd = () => {
    setBottomSheetVisible(true)
  }

  if (isLoading) {
    return <Spinner visible={true} color='#fb5b5a' />
      }

  console.log('isPending', isPending)
  console.log('mutationErr', mutationErr)
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        contentContainerStyle={{marginTop: 20}}
        renderItem={({item, index}) => <TodoItem
         onDelete={(id: string) => deleteMutation(id)}
         data={item} index={index} onEdit={(updatedTodo: Todo) => updateMutation(updatedTodo)} />}
        keyExtractor={(item) => item._id}
      />
      
      <Pressable
       onPress={onAdd}
       style={styles.addBtn}>
        <AntDesign name="plus" size={28} color="#ffffff" />
      </Pressable>
    <BottomSheet visible={bottomSheetVisible} onDismiss={() => setBottomSheetVisible(false)} onSave={(task) => {
      mutate(task)
      setBottomSheetVisible(false)
    } } />
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    bottom: 50,
    right: 45,
    width: 65,
    height: 65,
    borderRadius: 65/2,
    backgroundColor: '#fb5b5a',
    justifyContent: 'center',
    alignItems: 'center',
  }
})