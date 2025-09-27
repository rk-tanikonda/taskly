import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import { intervalToDuration, isBefore } from 'date-fns'
import * as Haptics from 'expo-haptics'
import ConfettiCannon from 'react-native-confetti-cannon'
import { registerForPushNotificationsAsync } from '../../utils/registerForPushNotificationsAsync'
import { theme } from '../../theme'
import { TimeSegment } from '../../components/TimeSegment'
import { getFromStorage, saveToStorage } from '../../utils/storage'

// 2 weeks from now
const frequency = 14 * 24 * 60 * 60 * 1000
export const countdownStorageKey = 'taskly-countdown'

export type PersistedCountdownState = {
  currentNotificationId: string | undefined
  completedAtTimestamps: number[]
}

type CountdownStatus = {
  isOverdue: boolean
  distance: ReturnType<typeof intervalToDuration>
}

export default function CounterScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  })
  const [countdownState, setCountdownState] = useState<PersistedCountdownState>(
    {
      currentNotificationId: undefined,
      completedAtTimestamps: [],
    }
  )
  const lastCompletedAtTimestamp = countdownState?.completedAtTimestamps[0]
  const confettiRef = useRef(null)
  const { width } = useWindowDimensions()

  useEffect(() => {
    const fetchCountdownState = async () => {
      const state = await getFromStorage(countdownStorageKey)
      setCountdownState(state)
    }
    fetchCountdownState()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = lastCompletedAtTimestamp
        ? lastCompletedAtTimestamp + frequency
        : Date.now()
      const isOverdue = isBefore(timestamp, Date.now())

      if (lastCompletedAtTimestamp) {
        setIsLoading(false)
      }

      const distance = intervalToDuration(
        isOverdue
          ? { end: Date.now(), start: timestamp }
          : { start: Date.now(), end: timestamp }
      )

      setStatus({ isOverdue, distance })
    }, 1000)
    return () => clearInterval(interval)
  }, [lastCompletedAtTimestamp])

  const scheduleNotification = async () => {
    ;(confettiRef.current as any)?.start?.()
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    let pushNotificationId
    const result = await registerForPushNotificationsAsync()
    console.log('Permission: ', result)
    if (result === 'granted') {
      pushNotificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Time to wash the car!',
          body: 'wash the car!',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: frequency / 1000,
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

    if (countdownState?.currentNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        countdownState?.currentNotificationId
      )
    }

    const newCountdownState: PersistedCountdownState = {
      currentNotificationId: pushNotificationId,
      completedAtTimestamps: countdownState
        ? [Date.now(), ...countdownState.completedAtTimestamps]
        : [Date.now()],
    }
    setCountdownState(newCountdownState)
    saveToStorage(countdownStorageKey, newCountdownState)
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' style={styles.loadingIndicator} />
      </View>
    )
  }

  return (
    <View
      style={[
        styles.container,
        status.isOverdue ? styles.containerLate : undefined,
      ]}
    >
      {!status.isOverdue ? (
        <Text style={[styles.heading]}>Car washed due in</Text>
      ) : (
        <Text style={[styles.heading, styles.whiteText]}>
          Car washed overdue by
        </Text>
      )}
      <View style={styles.row}>
        <TimeSegment
          number={status.distance.days || 0}
          unit='Days'
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          number={status.distance.hours || 0}
          unit='Hours'
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          number={status.distance.minutes || 0}
          unit='Minutes'
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          number={status.distance.seconds || 0}
          unit='Seconds'
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
      </View>
      <TouchableOpacity
        onPress={scheduleNotification}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>I've washed the car!</Text>
      </TouchableOpacity>
      <ConfettiCannon
        ref={confettiRef}
        count={50}
        origin={{ x: width / 2, y: -20 }}
        autoStart={false}
        fadeOut
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  containerLate: {
    backgroundColor: theme.colors.red,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: theme.colors.black,
  },
  whiteText: {
    color: theme.colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
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
  loadingIndicator: {
    color: theme.colors.cerulean,
    backgroundColor: theme.colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
