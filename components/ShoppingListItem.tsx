import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { theme } from '../theme'

type ShoppingListItemProps = {
  name: string
}

export const ShoppingListItem = ({ name }: ShoppingListItemProps) => {
  const handleDelete = () => {
    Alert.alert('Delete', `Are you sure you want to delete this ${name}?`, [
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => console.log('Deleted'),
      },
      { text: 'Cancel', style: 'cancel' },
    ])
  }

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{name}</Text>
      <TouchableOpacity
        onPress={handleDelete}
        activeOpacity={0.5}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
