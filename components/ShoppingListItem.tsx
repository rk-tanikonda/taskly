import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import Entypo from '@expo/vector-icons/Entypo'
import * as Haptics from 'expo-haptics'
import { theme } from '../theme'

type ShoppingListItemProps = {
  name: string
  isCompleted?: boolean
  onDelete: () => void
  onToggleComplete: () => void
  completedAt?: number
}

export const ShoppingListItem = ({
  name,
  isCompleted,
  onDelete,
  onToggleComplete,
  completedAt,
}: ShoppingListItemProps) => {
  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    Alert.alert('Delete', `Are you sure you want to delete this ${name}?`, [
      { text: 'Delete', style: 'destructive', onPress: onDelete },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ])
  }

  const completedAtText = completedAt
    ? new Date(completedAt).toLocaleString()
    : ''

  return (
    <Pressable
      style={[
        styles.itemContainer,
        isCompleted && styles.completedItemContainer,
      ]}
      onPress={onToggleComplete}
    >
      <View style={styles.itemTextContainer}>
        <Entypo
          name={isCompleted ? 'check' : 'circle'}
          size={24}
          color={isCompleted ? theme.colors.cerulean : theme.colors.gray}
        />
        <Text
          style={[styles.itemText, isCompleted && styles.completedButtonText]}
          numberOfLines={1}
        >
          {name}
        </Text>
      </View>
      {completedAt && (
        <Text style={styles.completedAtText}>{completedAtText}</Text>
      )}
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.5}>
        <AntDesign
          name='close-circle'
          size={24}
          color={isCompleted ? theme.colors.gray : theme.colors.red}
        />
      </TouchableOpacity>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.cerulean,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  itemTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
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
  completedAtText: {
    textAlign: 'center',
    fontSize: 10,
    color: theme.colors.gray,
    flex: 1,
  },
})
