import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { theme } from '../theme'

type ShoppingListItemProps = {
  name: string
  isCompleted?: boolean
}

export const ShoppingListItem = ({
  name,
  isCompleted,
}: ShoppingListItemProps) => {
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
    <View
      style={[
        styles.itemContainer,
        isCompleted && styles.completedItemContainer,
      ]}
    >
      <Text
        style={[styles.itemText, isCompleted && styles.completedButtonText]}
      >
        {name}
      </Text>
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.5}>
        <AntDesign
          name='close-circle'
          size={24}
          color={isCompleted ? theme.colors.gray : theme.colors.red}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 18,
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
  completedItemContainer: {
    backgroundColor: theme.colors.lightGray,
    borderBottomColor: theme.colors.lightGray,
  },
  completedButtonText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: theme.colors.gray,
  },
})
