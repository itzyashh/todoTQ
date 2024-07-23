import { onLogout } from "@/redux/reducers/User"
import { Stack } from "expo-router"
import { Button } from "react-native"
import { useDispatch } from "react-redux"

const InsideLayout = () => {
    const dispatch = useDispatch()
    return <Stack>
        <Stack.Screen name="todos" options={{
            headerTitle: 'Todos',
            headerRight: () => <Button title="Logout" onPress={() => dispatch(onLogout())} />
        }} />
    </Stack>
}

export default InsideLayout