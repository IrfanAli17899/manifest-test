import React from 'react'
import Navigation from './src/navigation'
import { AuthProvider } from './src/context'
import { useLoadResources } from './src/hooks';
import FlashMessage from 'react-native-flash-message';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function App() {

    const isLoadingComplete = useLoadResources();

    if (!isLoadingComplete) {
        return null;
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
            <AuthProvider>
                <FlashMessage
                    position="bottom"
                    floating
                    duration={5000}
                    hideOnPress
                    style={styles.flashMessage}
                    titleStyle={{ color: "white" }}
                />
                <Navigation />
                <StatusBar style='dark' translucent />
            </AuthProvider>
        </KeyboardAvoidingView>
    )
}

export default App


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flashMessage: {
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 10,
        elevation: 5
    }
});