import { Ionicons } from "@expo/vector-icons"
import { Stack } from "expo-router"
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from "@/provider/AuthProvider";

const InsideLayout = () => {
    const { onLogout } = useAuth()
    return <Stack>
        <Stack.Screen name="todos" options={{
            headerTitle: 'My Todos',
            headerRight: () => <MaterialIcons onPress={onLogout} name="logout" size={24} color="black" />
        }} />
    </Stack>
}

export default InsideLayout