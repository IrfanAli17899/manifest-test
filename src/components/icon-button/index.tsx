import { Image, ImageSourcePropType, ImageStyle, Pressable, PressableProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import { theme } from '@src/theme'

type IconButtonProps = {
    icon: ImageSourcePropType;
    iconStyle?: StyleProp<ImageStyle>;
    style?: StyleProp<ViewStyle>
} & Omit<PressableProps, "style">

const IconButton = (props: IconButtonProps) => {
    const { style, icon, iconStyle, ...rest } = props
    return (
        <Pressable {...rest}>
            <View style={[styles.container, style]}>
                <Image source={icon} style={[styles.icon, iconStyle]} />
            </View>
        </Pressable>
    )
}

export default IconButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        elevation: 10,
        ...theme.shadow,
        height: 48,
        width: 48,
    },
    icon: {
        height: 24,
        width: 24
    },
})