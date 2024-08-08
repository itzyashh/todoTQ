import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createTodo, deleteTodo, getTodos, Todo, updateTodo } from '@/api/todos'
import TodoItem from '@/components/TodoItem'
import { AntDesign } from '@expo/vector-icons'
import BottomSheet from '@/components/BottomSheet'
import Spinner from 'react-native-loading-spinner-overlay'
import OfflineSimulator from '@/components/OfflineSimulator'

  export const createTodoMutation = async (task: string, img?: string) => createTodo(task)
  export const updateTodoMutation = async (todo: Todo) => updateTodo(todo)
  export const deleteTodoMutation = async (id: string) => deleteTodo(id)

const Page = () => {
  const client = useQueryClient()
  const [bottomSheetVisible, setBottomSheetVisible] = React.useState(false)
  const {data, isLoading} = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })



  const {mutate} = useMutation({
    mutationKey: ['createTodo'],
    mutationFn: createTodoMutation,
    onMutate: async (task) => {
      await client.cancelQueries({queryKey: ['todos']})
      client.setQueryData(['todos'], (prev: Todo[] = []) => [...prev, {
        task,
         _id: Math.random().toString(),
         isSynced: false,
        }])
    },
    onError: (err) => console.log('err', err),

    onSettled: () => {
      client.invalidateQueries({ queryKey: ['todos'] })
    }
  })

  const { mutate: updateMutation} = useMutation({
    mutationKey: ['updateTodo'],
    mutationFn: updateTodoMutation,
    onSuccess: (updatedTodo) => {
      client.setQueryData(['todos'], (prev: Todo[]) => prev.map((todo) => todo._id === updatedTodo._id ? updatedTodo : todo))
    }
  })

  const { mutate: deleteMutation} = useMutation({
    mutationFn: deleteTodoMutation,
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



  return (
    <View style={{flex: 1}}>
      <OfflineSimulator />
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