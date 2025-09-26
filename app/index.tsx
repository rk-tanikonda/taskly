import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  FlatList,
  Text,
} from 'react-native'
import { useState } from 'react'
import { theme } from '../theme'
import { ShoppingListItem } from '../components/ShoppingListItem'

type ShoppingListItemType = {
  id: string
  name: string
}

const initialItems: ShoppingListItemType[] = [
  { id: '1', name: 'Coffee' },
  { id: '2', name: 'Tea' },
  { id: '3', name: 'Milk' },
  { id: '4', name: 'Bread' },
  { id: '5', name: 'Eggs' },
  { id: '6', name: 'Cheese' },
  { id: '7', name: 'Butter' },
  { id: '8', name: 'Sugar' },
  { id: '9', name: 'Salt' },
  { id: '10', name: 'Pepper' },
  { id: '11', name: 'Cereal' },
  { id: '12', name: 'Yogurt' },
  { id: '13', name: 'Chicken' },
  { id: '14', name: 'Beef' },
  { id: '15', name: 'Pork' },
  { id: '16', name: 'Fish' },
  { id: '17', name: 'Shrimp' },
  { id: '18', name: 'Tofu' },
  { id: '19', name: 'Vegetables' },
  { id: '20', name: 'Fruits' },
  { id: '21', name: 'Nuts' },
  { id: '22', name: 'Seeds' },
  { id: '23', name: 'Honey' },
  { id: '24', name: 'Jam' },
  { id: '25', name: 'Jelly' },
  { id: '26', name: 'Condiments' },
  { id: '27', name: 'Sauces' },
  { id: '28', name: 'Spices' },
  { id: '29', name: 'Herbs' },
  { id: '30', name: 'Dairy' },
  { id: '31', name: 'Meat' },
  { id: '32', name: 'Poultry' },
  { id: '33', name: 'Seafood' },
  { id: '34', name: 'Beverages' },
]

// const testData = Array.from({ length: 1000 }, (_, index) => ({
//   id: index.toString(),
//   name: `Item ${index + 1}`,
// }))

export default function App() {
  const [value, setValue] = useState('')
  const [shoppingListItems, setShoppingListItems] = useState<
    ShoppingListItemType[]
  >([])

  const handleSubmit = () => {
    if (value.trim() === '') return
    setShoppingListItems([
      { id: (shoppingListItems.length + 1).toString(), name: value },
      ...shoppingListItems,
    ])
    setValue('')
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      data={shoppingListItems}
      renderItem={({ item }) => <ShoppingListItem name={item.name} />}
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
    paddingTop: 12,
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
