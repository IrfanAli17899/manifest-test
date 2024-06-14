import { Text as RNText, TextProps as RNTextProps, Platform } from 'react-native'
import React, { forwardRef, Ref } from 'react'
import { theme } from '@src/theme';

export type TextType =
    "title1" |
    "title2" |
    "subTitle1" |
    "subTitle2" |
    "body1" |
    "body2" |
    "cta" |
    "label" |
    "tag"

export type TextProps = { type?: TextType } & RNTextProps

const Text = (props: TextProps, ref: Ref<RNText>) => {
    const { type = "body1", style, ...rest } = props;


    const textStyle = theme.textStyles[`${type}${Platform.OS === "web" ? "Web" : "Mobile"}` as keyof typeof theme.textStyles]
    return (
        <RNText
            ref={ref}
            style={[textStyle, style]}
            {...rest}
        />
    )
}

export default forwardRef(Text)