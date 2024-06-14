import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@src/components'
import { useAuth } from '@src/hooks'

const HomeScreen = () => {
  const { signOut } = useAuth()
  return (
    <View style={styles.container}>
      <Button onPress={signOut}>Logout</Button>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  }
})