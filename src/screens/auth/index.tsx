import { Platform, StyleSheet, View } from 'react-native'
import React from 'react'
import { AuthLink, Button, SocialButtons, Text } from '@src/components'
import { PublicScreenProps } from '@src/types'
import { PublicLayout } from '@src/layouts'

const AuthScreen = ({ navigation: { navigate } }: PublicScreenProps<"Auth">) => {
  const isWebPlatform = Platform.OS === "web";

  return (
    <PublicLayout
      title="Let's Get Started!"
      description="Let's dive into your account"
      hideBackButton
    >
      <View style={styles.container}>
        <View>
          <View style={styles.socialButtonsCon}>
            <SocialButtons />
          </View>
          <Button onPress={() => navigate("SignUp")}>Continue with Manifest</Button>
          <AuthLink
            info='Already have an account?'
            link='SignIn'
            linkText='Sign in'
          />
        </View>
        <View style={[styles.linksCon, isWebPlatform && styles.webLinksCon]}>
          <Text type='body2'>Privacy Policy</Text>
          <Text type='body2'>.</Text>
          <Text type='body2'>Terms of Service</Text>
        </View>
      </View>
    </PublicLayout>

  )
}

export default AuthScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1
  },
  socialButtonsCon: {
    marginBottom: 48
  },
  linksCon: {
    flexDirection: "row",
    gap: 12
  },
  webLinksCon: {
    justifyContent: "center"
  }
})
