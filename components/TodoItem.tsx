import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Todo } from '@/api/todos'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';


type TodoItemProps = {
    data: Todo
    index: number
}

const TodoItem : React.FC<TodoItemProps> = ({data, index}) => {
  return (
    <View style={styles.container}>
        <View style={styles.groupIcons}>

        {
            index % 2 === 0           
            ? <Feather name="check-circle" size={24} color="#46b31e"  /> : <Feather name="circle" size={24} color="black" />
        }

      <Text style={styles.title}>{data.task}</Text>
        </View>
        <View style={[styles.groupIcons,{gap:25}]}>
      <MaterialIcons name="photo-camera" size={27} color="black" />
      <Ionicons name="trash-bin-outline" size={27} color="#e67272" />
      </View>
    </View>
  )
}

export default TodoItem

const styles = StyleSheet.create({
    container: {
        padding: 30,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
    },
    title: {
        fontSize: 18,
        color: '#000000',
    },
    groupIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
})