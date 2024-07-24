import { AuthProvider, useAuth } from "@/provider/AuthProvider"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { Slot, useRouter } from "expo-router"
import { useEffect } from "react"
import { gestureHandlerRootHOC } from "react-native-gesture-handler"

const queryClient = new QueryClient()
const RootLayout = () => {
    const InternalLayout = () => {

        const { token, initialized } = useAuth()
        console.log('token at root', token)
        const router = useRouter()
    
        useEffect(() => {
            if (!initialized) {
                return
            }
            if (token) {
                router.replace("/(auth)/todos")
            } else {
                router.replace("/(public)/login")
            }
        }, [token, initialized])
        return <Slot />
    }

    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
            <InternalLayout />
            </QueryClientProvider>
        </AuthProvider>
    )

}

export default gestureHandlerRootHOC(RootLayout)