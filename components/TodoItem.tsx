import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback } from 'react'
import { Todo } from '@/api/todos'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';


type TodoItemProps = {
    data: Todo
    index: number
    onEdit: (todo: Todo) => void
    onDelete: (id: string) => void
}

const TodoItem : React.FC<TodoItemProps> = ({data, index, onEdit, onDelete}) => {
    const [task, setTask] = React.useState(data.task)   

    const onToggle = () => {
        data.status = data.status === 1 ? 0 : 1
        onEdit(data)
    } 

    const onTextChange = (text: string) => {
        setTask(text)
        data.task = text
        onEdit(data)
    }


  return (
    <View style={styles.container}>
        <View style={styles.groupIcons}>

        {
            data.status === 1       
            ? <Feather
            onPress={onToggle}
            name="check-circle" size={24} color="#46b31e"  /> : <Feather onPress={onToggle}
             name="circle" size={24} color="black" />
        }

      <TextInput style={styles.title} value={task} onChangeText={onTextChange} />
        </View>
        <View style={[styles.groupIcons,{gap:25}]}>
      <MaterialIcons name="photo-camera" size={27} color="black" />
      <Ionicons
       onPress={() => onDelete(data._id)}
       name="trash-bin-outline" size={27} color="#e67272" />
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