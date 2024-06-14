import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from '../text'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { theme } from '@src/theme'
import { PublicParamList } from '@src/types'

type AuthLinkProps = {
    link: keyof PublicParamList;
    linkText: string;
    info: string

}

const AuthLink = ({ info, link, linkText }: AuthLinkProps) => {
    const { navigate } = useNavigation<NavigationProp<PublicParamList>>();
    const isWebPlatform = Platform.OS === "web";

    return (
        <View style={[styles.linkContainer, isWebPlatform && styles.webLinkContainer]}>
            <Text>{info}</Text>
            <TouchableOpacity onPress={() => navigate(link)}>
                <Text type='cta' style={styles.link}>{linkText}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AuthLink
const styles = StyleSheet.create({
    linkContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        marginVertical: 16,
        gap: 4
    },
    webLinkContainer: {
        justifyContent: "center"
    },
    link: {
        color: theme.colors.link
    },
})