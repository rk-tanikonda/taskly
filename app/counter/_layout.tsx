import { Link, Stack } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Pressable } from 'react-native'

export default function CounterLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Counter',
          headerRight: () => {
            return (
              <Link href='/counter/history' asChild>
                <Pressable hitSlop={20}>
                  <MaterialCommunityIcons
                    name='history'
                    size={24}
                    color='black'
                  />
                </Pressable>
              </Link>
            )
          },
        }}
      />
    </Stack>
  )
}
