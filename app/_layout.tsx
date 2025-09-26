import { Tabs } from 'expo-router'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import AntDesign from '@expo/vector-icons/AntDesign'
import { theme } from '../theme'

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colors.cerulean }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Shopping list',
          tabBarIcon: ({ color, size }) => {
            return <Feather name='list' size={size} color={color} />
          },
        }}
      />
      <Tabs.Screen
        name='counter'
        options={{
          title: 'Counter',
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name='clock-circle' size={size} color={color} />
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name='idea'
        options={{
          title: 'My idea',
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome5 name='lightbulb' size={size} color={color} />
          },
        }}
      />
    </Tabs>
  )
}
