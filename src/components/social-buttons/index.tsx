import React from 'react'
import { StyleSheet, View } from 'react-native'
import Button from '../button'
import { useAsyncMutation, useAuth } from '@src/hooks'
import { showMessage } from 'react-native-flash-message'

function SocialButtons() {
    const { signInWithGoogle } = useAuth()
    const [_signInWithGoogle, { loading: googleSignInLoading }] = useAsyncMutation(signInWithGoogle, {
        onError: (error) => {
            showMessage({ message: error.message, type: "danger" })
        },
    })

    return (
        <View style={styles.container}>
            <Button
                variant='outline'
                onPress={_signInWithGoogle}
                loading={googleSignInLoading}
                icon={require("@assets/images/icons/google-icon.png")}
            >
                Continue with Google
            </Button>
            <Button variant='outline' icon={require("@assets/images/icons/instagram-icon.png")}>Continue with Instagram</Button>
        </View>
    )
}

export default SocialButtons

const styles = StyleSheet.create({
    container: {
        gap: 16
    }
})