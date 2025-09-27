import { Text, View, StyleSheet, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { countdownStorageKey, PersistedCountdownState } from './index'
import { getFromStorage } from '../../utils/storage'
import { theme } from '../../theme'

const fullDateFormat = `LLL d yyyy, h:mm aaa`

export default function HistoryScreen() {
  const [countdownState, setCountdownState] = useState<PersistedCountdownState>(
    {
      currentNotificationId: undefined,
      completedAtTimestamps: [],
    }
  )

  useEffect(() => {
    const fetchCountdownState = async () => {
      const state = await getFromStorage(countdownStorageKey)
      setCountdownState(state)
    }
    fetchCountdownState()
  }, [])
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      data={countdownState?.completedAtTimestamps}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>
            {format(item, fullDateFormat)}
          </Text>
        </View>
      )}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No History Found</Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 12,
    marginHorizontal: 8,
  },
  emptyText: {
    fontSize: 24,
  },
  listItem: {
    padding: 12,
    marginHorizontal: 8,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.cerulean,
    borderRadius: 8,
    marginBottom: 8,
  },
  listItemText: {
    fontSize: 24,
  },
  list: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainer: {
    marginTop: 8,
  },
})
