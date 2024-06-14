import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { AuthScreen, HomeScreen, IntroScreen, SignInScreen, SignupScreen } from './screens'
import { PrivateParamList, PublicParamList, RootStackParamList } from './types'
import { useAuth } from './hooks'

const MainStack = createNativeStackNavigator<RootStackParamList>()
const PublicStack = createNativeStackNavigator<PublicParamList>()
const PrivateStack = createNativeStackNavigator<PrivateParamList>()

const PublicNavigator = () => (
  <PublicStack.Navigator screenOptions={{ headerShown: false }}>
    <PublicStack.Screen name="Intro" component={IntroScreen} />
    <PublicStack.Screen name="Auth" component={AuthScreen} />
    <PublicStack.Screen name="SignIn" component={SignInScreen} />
    <PublicStack.Screen name="SignUp" component={SignupScreen} />
  </PublicStack.Navigator>
)

const PrivateNavigator = () => (
  <PrivateStack.Navigator screenOptions={{ headerShown: false }}>
    <PrivateStack.Screen name="Home" component={HomeScreen} />
  </PrivateStack.Navigator>
)

function Navigation() {
  const { isAuthenticated } = useAuth()
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <MainStack.Screen name="Private" component={PrivateNavigator} />
        ) : (
          <MainStack.Screen name="Public" component={PublicNavigator} />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation