import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import { registerForPushNotificationsAsync } from '../../utils/registerForPushNotificationsAsync'
import { theme } from '../../theme'

export default function CounterScreen() {
  const scheduleNotification = async () => {
    const result = await registerForPushNotificationsAsync()
    console.log('Permission: ', result)
    if (result === 'granted') {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Hello!',
          body: 'Welcome to the app! This is your greeting notification.',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
        },
      })
    } else {
      if (Device.isDevice) {
        Alert.alert(
          'unable to schedule notification',
          'Enable the notifications permission for Expo Go in settings'
        )
      }
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={scheduleNotification}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Schedule notification</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
  },
  button: {
    padding: 12,
    backgroundColor: theme.colors.black,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 16,
  },
})
