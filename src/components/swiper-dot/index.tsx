import { theme } from '@src/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

interface SwiperDotProps {
  index: number;
  currentPage: Animated.SharedValue<number>;
}

const SwiperDot: React.FC<SwiperDotProps> = ({ index, currentPage }) => {
  const isCurrentPage = useDerivedValue(() => currentPage.value === index ? 1 : 0);

  const dotWidth = useDerivedValue(() => {
    return isCurrentPage.value ? withTiming(40, { duration: 300 }) : withTiming(10, { duration: 300 });
  });

  const dotStyle = useAnimatedStyle(() => {
    return {
      width: dotWidth.value,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 5,
      backgroundColor: 'gray',
      overflow: 'hidden',
    };
  });


  return (
    <Animated.View style={[styles.dot, dotStyle]}>
      <LinearGradient
        colors={theme.colors['manifest-gradient-2']}
        locations={[0, 0.34, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[StyleSheet.absoluteFill]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  dot: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SwiperDot;