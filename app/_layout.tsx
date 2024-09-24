import { AuthProvider, useAuth } from "@/provider/AuthProvider"
import { QueryClient } from "@tanstack/react-query"
import { Slot, useRouter } from "expo-router"
import { useEffect } from "react"
import { gestureHandlerRootHOC } from "react-native-gesture-handler"

import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createTodoMutation, updateTodoMutation } from "./(auth)/todos"
import { createTodo, Todo } from "@/api/todos"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      // cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  throttleTime: 1000,
});

export const logPersistedData = async () => {
  try {
    const value = await AsyncStorage.getItem('REACT_QUERY_OFFLINE_CACHE');
    if (value !== null) {
      const parsedValue = JSON.parse(value);
      console.log('REACT_QUERY_OFFLINE_CACHE:', parsedValue);
    } else {
      console.log('No data found for REACT_QUERY_OFFLINE_CACHE');
    }
  } catch (error) {
    console.error('Error retrieving REACT_QUERY_OFFLINE_CACHE:', error);
  }
};

// keeping logging for every 5 seconds
// setInterval(logPersistedData, 5000);


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

queryClient.setMutationDefaults(['createTodo'], {
  mutationFn: async (task: string, img?: string) => {
    queryClient.cancelQueries({ queryKey: ['todos'] })
    console.log('createTodo', task, img)
    return await createTodo(task, img).then(() => console.log('createTodo done')).catch(console.error)
  }

})

queryClient.setMutationDefaults(['updateTodo'], {
  mutationFn: async (todo: Todo) => {
    return await updateTodoMutation(todo)
  }
})
console.log('queryClient', queryClient.getMutationCache())



const RootLayout = () => {

  return (
    <AuthProvider> 
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        <InternalLayout />
      </PersistQueryClientProvider>
    </AuthProvider>
  )
}

export default gestureHandlerRootHOC(RootLayout)