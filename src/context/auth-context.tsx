import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Splash from "../components/splash";
import {
    User,
    signInWithEmailAndPassword as authSignInWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signOut as authSignOut,
    signInWithCredential,
    GoogleAuthProvider,
    updateProfile,
    OAuthCredential,
} from 'firebase/auth'
import { WEB_CLIENT_ID } from "@src/config";
import { Platform } from "react-native";
import { fbAuth } from "@src/services";

GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID
});

const googleProvider = new GoogleAuthProvider();

type SignupProps = {
    email: string,
    password: string,
    name: string
}

type SignInProps = {
    email: string,
    password: string,
}

type AuthContextProps = {
    isAuthenticated: boolean;
    signOut: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    user: User | null;
    signInWithEmailAndPassword: (props: SignInProps) => Promise<void>
    signUpWithEmailAndPassword: (props: SignupProps) => Promise<void>
}

const AuthContext = createContext<AuthContextProps | null>(null)

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const signInWithGoogle = useCallback(async () => {
        try {
            let credentials: OAuthCredential | null;
            if (Platform.OS === "web") {
                const result = await signInWithPopup(fbAuth, googleProvider);
                credentials = GoogleAuthProvider.credentialFromResult(result)
            } else {
                await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
                const { idToken } = await GoogleSignin.signIn();
                credentials = GoogleAuthProvider.credential(idToken);
            }
            credentials && await signInWithCredential(fbAuth, credentials)
        } catch (error) {
            console.log("🚀 ~ signInWithGoogle ~ error:", error)
            throw error
        }
    }, [])

    const signInWithEmailAndPassword = useCallback(async (props: SignInProps) => {
        try {
            await authSignInWithEmailAndPassword(fbAuth, props.email, props.password)
        } catch (error) {
            throw error
        }
    }, [])

    const signUpWithEmailAndPassword = useCallback(async (props: SignupProps) => {
        try {
            const { user: _user } = await createUserWithEmailAndPassword(fbAuth, props.email, props.password)
            await updateProfile(_user, { displayName: props.name })
        } catch (error) {
            throw error
        }
    }, [])

    const signOut = useCallback(async () => {
        const googleUser = GoogleSignin.getCurrentUser()
        if (googleUser) {
            GoogleSignin.signOut()
        }
        authSignOut(fbAuth);
    }, [])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(fbAuth, (user) => {
            setIsAuthenticated(!!user)
            setUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])


    const value: AuthContextProps = useMemo(() => ({
        isAuthenticated,
        signOut,
        user,
        signInWithGoogle,
        signInWithEmailAndPassword,
        signUpWithEmailAndPassword
    }), [isAuthenticated, user])

    return (
        <AuthContext.Provider value={value}>
            {loading ? <Splash /> : children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }