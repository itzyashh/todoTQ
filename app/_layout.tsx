import { Slot, useRouter } from "expo-router"
import { Provider } from "react-redux"
import store from "../redux/store"


const RootLayout = () => {
    const router = useRouter()
    const InternalLayout = () => {

        const token = store.getState().user.token
        console.log('token', token)
        if (token){
            router.replace('/(private)/todos')
        } 

        return (
            <Slot />
        )
    }

    return (
        <Provider store={store}>
            <InternalLayout />
        </Provider>
    )

}

export default RootLayout