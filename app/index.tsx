import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Text,
  LayoutAnimation,
} from 'react-native'
import { useEffect, useState } from 'react'
import { theme } from '../theme'
import { ShoppingListItem } from '../components/ShoppingListItem'
import { getFromStorage, saveToStorage } from '../utils/storage'
import * as Haptics from 'expo-haptics'

type ShoppingListItemType = {
  id: string
  name: string
  isCompleted?: boolean
  completedAtTimestamp?: number
  lastUpdatedTimestamp: number
}

// const initialItems: ShoppingListItemType[] = [
//   {
//     id: '1',
//     name: 'Coffee',
//     isCompleted: false,
//     lastUpdatedTimestamp: Date.now(),
//   },
//   {
//     id: '2',
//     name: 'Tea',
//     isCompleted: false,
//     lastUpdatedTimestamp: Date.now(),
//   },
//   {
//     id: '3',
//     name: 'Milk',
//     isCompleted: false,
//     lastUpdatedTimestamp: Date.now(),
//   },
//   {
//     id: '4',
//     name: 'Bread',
//     isCompleted: false,
//     lastUpdatedTimestamp: Date.now(),
//   },
//   {
//     id: '5',
//     name: 'Eggs',
//     isCompleted: false,
//     lastUpdatedTimestamp: Date.now(),
//   },
//   {
//     id: '6',
//     name: 'Cheese',
//     isCompleted: false,
//     lastUpdatedTimestamp: Date.now(),
//   },
//   {
//     id: '7',
//     name: 'Butter',
//     isCompleted: false,
//     lastUpdatedTimestamp: Date.now(),
//   },
//   {
//     id: '8',
//     name: 'Sugar',
//     isCompleted: false,
//     lastUpdatedTimestamp: Date.now(),
//   },
//   {
//     id: '9',
//     name: 'Salt',
//     isCompleted: false,
//     lastUpdatedTimestamp: Date.now(),
//   },
//   {
//     id: '10',
//     name: 'Pepper',
//     isCompleted: false,
//     lastUpdatedTimestamp: Date.now(),
//   },
//   {
//     id: '11',
//     name: 'Yogurt',
//     isCompleted: false,
//     lastUpdatedTimestamp: Date.now(),
//   },
//   {
//     id: '12',
//     name: 'Cereal',
//     isCompleted: false,
//     lastUpdatedTimestamp: Date.now(),
//   },
//   {
//     id: '13',
//     name: 'Chicken',
//     isCompleted: false,
//     lastUpdatedTimestamp: Date.now(),
//   },
//   {
//     id: '14',
//     name: 'Beef',
//     isCompleted: false,
//     lastUpdatedTimestamp: Date.now(),
//   },
//   {
//     id: '15',
//     name: 'Pork',
//     isCompleted: false,
//     lastUpdatedTimestamp: Date.now(),
//   },
//   {
//     id: '16',
//     name: 'Fish',
//     isCompleted: false,
//     lastUpdatedTimestamp: Date.now(),
//   },
// ]

// const testData = Array.from({ length: 1000 }, (_, index) => ({
//   id: index.toString(),
//   name: `Item ${index + 1}`,
//   isCompleted: false,
//   lastUpdatedTimestamp: Date.now(),
// }))

export default function App() {
  const [value, setValue] = useState('')
  const [shoppingListItems, setShoppingListItems] = useState<
    ShoppingListItemType[]
  >([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFromStorage('shoppingListItems')
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      setShoppingListItems(data || [])
    }
    fetchData()
  }, [])

  const handleSubmit = () => {
    if (value.trim() === '') return
    const newShoppingListItems = [
      {
        id: (shoppingListItems.length + 1).toString(),
        name: value,
        lastUpdatedTimestamp: Date.now(),
      },
      ...shoppingListItems,
    ]
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setShoppingListItems(newShoppingListItems)
    saveToStorage('shoppingListItems', newShoppingListItems)
    setValue('')
  }

  const handleDelete = (id: string) => {
    const newShoppingListItems = shoppingListItems.filter(
      (item) => item.id !== id
    )
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setShoppingListItems(newShoppingListItems)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    saveToStorage('shoppingListItems', newShoppingListItems)
  }

  const handleToggleComplete = (id: string) => {
    const newShoppingListItems = shoppingListItems.map((item) => {
      if (item.id === id) {
        if (item.completedAtTimestamp) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        }
        return {
          ...item,
          isCompleted: !item.isCompleted,
          completedAtTimestamp: !item.isCompleted ? Date.now() : undefined,
          lastUpdatedTimestamp: Date.now(),
        }
      }

      return item
    })
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setShoppingListItems(newShoppingListItems)
    saveToStorage('shoppingListItems', newShoppingListItems)
  }

  const orderShoppingList = (shoppingList: ShoppingListItemType[]) => {
    return shoppingList.sort((item1, item2) => {
      if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
        return item2.completedAtTimestamp - item1.completedAtTimestamp
      }

      if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
        return 1
      }

      if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
        return -1
      }

      if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
        return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp
      }

      return 0
    })
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      data={orderShoppingList(shoppingListItems)}
      renderItem={({ item }) => (
        <ShoppingListItem
          name={item.name}
          onDelete={() => handleDelete(item.id)}
          onToggleComplete={() => handleToggleComplete(item.id)}
          isCompleted={item.isCompleted}
          completedAt={item.completedAtTimestamp}
        />
      )}
      ListHeaderComponent={
        <TextInput
          style={styles.textInput}
          placeholder='E.g. Coffee'
          value={value}
          onChangeText={setValue}
          returnKeyType='done'
          onSubmitEditing={handleSubmit}
        />
      }
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items found</Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingVertical: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  textInput: {
    borderWidth: 2,
    borderColor: theme.colors.lightGray,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 15,
    backgroundColor: theme.colors.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 18,
  },
  emptyText: {
    fontSize: 24,
  },
})
