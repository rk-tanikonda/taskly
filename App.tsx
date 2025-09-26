import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { theme } from './theme'

export default function App() {
  const handleDelete = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this item?', [
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => console.log('Deleted'),
      },
      { text: 'Cancel', style: 'cancel' },
    ])
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Coffee</Text>
        <TouchableOpacity
          onPress={handleDelete}
          activeOpacity={0.5}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: theme.colors.black,
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  itemContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.cerulean,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
