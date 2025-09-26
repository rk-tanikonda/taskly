import { StyleSheet, TextInput, View, FlatList, Text } from 'react-native'
import { useState } from 'react'
import { theme } from '../theme'
import { ShoppingListItem } from '../components/ShoppingListItem'

type ShoppingListItemType = {
  id: string
  name: string
  isCompleted?: boolean
  completedAt?: number
}

const initialItems: ShoppingListItemType[] = [
  { id: '1', name: 'Coffee', isCompleted: false },
  { id: '2', name: 'Tea', isCompleted: false },
  { id: '3', name: 'Milk', isCompleted: false },
  { id: '4', name: 'Bread', isCompleted: false },
  { id: '5', name: 'Eggs', isCompleted: false },
  { id: '6', name: 'Cheese', isCompleted: false },
  { id: '7', name: 'Butter', isCompleted: false },
  { id: '8', name: 'Sugar', isCompleted: false },
  { id: '9', name: 'Salt', isCompleted: false },
  { id: '10', name: 'Pepper', isCompleted: false },
  { id: '11', name: 'Cereal', isCompleted: false },
  { id: '12', name: 'Yogurt', isCompleted: false },
  { id: '13', name: 'Chicken', isCompleted: false },
  { id: '14', name: 'Beef', isCompleted: false },
  { id: '15', name: 'Pork', isCompleted: false },
  { id: '16', name: 'Fish', isCompleted: false },
  { id: '17', name: 'Shrimp', isCompleted: false },
  { id: '18', name: 'Tofu', isCompleted: false },
  { id: '19', name: 'Vegetables', isCompleted: false },
  { id: '20', name: 'Fruits', isCompleted: false },
  { id: '21', name: 'Nuts', isCompleted: false },
  { id: '22', name: 'Seeds', isCompleted: false },
  { id: '23', name: 'Honey', isCompleted: false },
  { id: '24', name: 'Jam', isCompleted: false },
  { id: '25', name: 'Jelly', isCompleted: false },
  { id: '26', name: 'Condiments', isCompleted: false },
  { id: '27', name: 'Sauces', isCompleted: false },
  { id: '28', name: 'Spices', isCompleted: false },
  { id: '29', name: 'Herbs', isCompleted: false },
  { id: '30', name: 'Dairy', isCompleted: false },
  { id: '31', name: 'Meat', isCompleted: false },
  { id: '32', name: 'Poultry', isCompleted: false },
  { id: '33', name: 'Seafood', isCompleted: false },
  { id: '34', name: 'Beverages', isCompleted: false },
]

// const testData = Array.from({ length: 1000 }, (_, index) => ({
//   id: index.toString(),
//   name: `Item ${index + 1}`,
//   isCompleted: false,
// }))

export default function App() {
  const [value, setValue] = useState('')
  const [shoppingListItems, setShoppingListItems] =
    useState<ShoppingListItemType[]>(initialItems)

  const handleSubmit = () => {
    if (value.trim() === '') return
    setShoppingListItems([
      { id: (shoppingListItems.length + 1).toString(), name: value },
      ...shoppingListItems,
    ])
    setValue('')
  }

  const handleDelete = (id: string) => {
    setShoppingListItems(shoppingListItems.filter((item) => item.id !== id))
  }

  const handleToggleComplete = (id: string) => {
    setShoppingListItems(
      shoppingListItems.map((item) =>
        item.id === id
          ? {
              ...item,
              isCompleted: !item.isCompleted,
              completedAt: !item.isCompleted ? Date.now() : undefined,
            }
          : item
      )
    )
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      data={shoppingListItems}
      renderItem={({ item }) => (
        <ShoppingListItem
          name={item.name}
          onDelete={() => handleDelete(item.id)}
          onToggleComplete={() => handleToggleComplete(item.id)}
          isCompleted={item.isCompleted}
          completedAt={item.completedAt}
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
