import { Image, ImageSourcePropType, NativeSyntheticEvent, StyleSheet, TextInput, TextInputFocusEventData, TextInputProps, View } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import React, { forwardRef, Ref, useState } from 'react'
import { theme } from '@src/theme'
import Text from '../text';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedText = Animated.createAnimatedComponent(Text);

export type InputProps = {
  icon?: ImageSourcePropType
  onChange?: TextInputProps["onChangeText"];
} & Omit<TextInputProps, "onChange">

const Input = (props: InputProps, ref: Ref<TextInput>) => {
  const { icon, placeholder, onFocus, onBlur, value, onChange,...rest } = props;

  const [localValue, setLocalValue] = useState("");

  const inputValue = value ?? localValue
  const inputOnChange = onChange ?? setLocalValue

  const placeholderPosition = useSharedValue(0);
  const gradientOpacity = useSharedValue(0);
  const gradientScale = useSharedValue(0);

  const handleFocus = (v: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onFocus?.(v)
    placeholderPosition.value = withTiming(-25, { duration: 200 });
    gradientOpacity.value = withTiming(1, { duration: 500 });
    gradientScale.value = withTiming(1, { duration: 500 });
  };

  const handleBlur = (v: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur?.(v)
    if (!value) {
      placeholderPosition.value = withTiming(0, { duration: 200 });
      gradientOpacity.value = withTiming(0, { duration: 500 });
      gradientScale.value = withTiming(0.9, { duration: 500 });
    }
  };


  const animatedPlaceholderStyle = useAnimatedStyle(() => {
    return {
      left: placeholderPosition.value < 0 ? 35 : 40,
      transform: [{ translateY: placeholderPosition.value }, { scale: placeholderPosition.value < 0 ? 0.75 : 1 }],
    };
  });

  const animatedGradientStyle = useAnimatedStyle(() => {
    return {
      opacity: gradientOpacity.value,
      transform: [{ scaleX: gradientScale.value }],
    };
  });

  return (
    <View style={styles.container}>
      {icon && (
        <Image source={icon} style={styles.icon} />
      )}
      {placeholder && (
        <AnimatedText style={[styles.placeholder, animatedPlaceholderStyle]} type="label">
          {placeholder}
        </AnimatedText>
      )}
      <TextInput
        ref={ref}
        value={inputValue}
        onChangeText={inputOnChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input}
        {...rest}
      />
      <Animated.View style={[styles.gradientBorderContainer, animatedGradientStyle]}>
        <LinearGradient
          colors={['#FFBB83', '#F9D09C', '#CFA3FA'].reverse()}
          style={styles.gradientBorder}
          locations={[0, 0.34, 100]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
      </Animated.View>
    </View>
  )
}

export default forwardRef(Input)

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.inactive
  },
  icon: {
    width: 24,
    height: 24
  },
  input: {
    ...theme.textStyles.body1,
    flex: 1,
    paddingHorizontal: 16
  },
  placeholder: {
    position: "absolute",
  },
  gradientBorderContainer: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 1.5,
  },
  gradientBorder: {
    flex: 1,
  },
})