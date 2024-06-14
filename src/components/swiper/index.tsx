import { theme } from '@src/theme';
import SwiperDot from '../swiper-dot';
import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Platform, Image } from 'react-native';
import Animated, {
    useAnimatedRef,
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import IconButton from '../icon-button';

const { width } = Dimensions.get('window');

export interface SwiperProps {
    children: React.ReactNode
    currentPage?: Animated.SharedValue<number>
}

const Swiper = ({ children, currentPage: currentPageProp }: SwiperProps) => {
    const pageCount = React.Children.count(children)
    const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
    const currentPage = currentPageProp ?? useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            currentPage.value = event.contentOffset.x / width;
        },
    });

    const scrollByPage = (increment: number) => {
        const nextValue = Math.min(Math.max(currentPage.value + increment, 0), pageCount - 1);
        scrollViewRef.current?.scrollTo({ x: nextValue * width, animated: true });
    };

    const prevButtonStyle = useAnimatedStyle(() => {
        return {
            opacity: currentPage.value === 0 ? withTiming(0) : withTiming(1),
        };
    });

    const nextButtonStyle = useAnimatedStyle(() => {
        return {
            opacity: currentPage.value === pageCount - 1 ? withTiming(0) : withTiming(1),
        };
    });

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={scrollHandler}
            >
                {children}
            </Animated.ScrollView>
            {Platform.OS === 'web' && (
                <>
                    <Animated.View style={prevButtonStyle}>
                        <IconButton
                            onPress={() => scrollByPage(-1)}
                            iconStyle={styles.buttonIcon}
                            icon={require("@assets/images/icons/arrow-left-icon.png")}
                            style={[styles.buttonCon, { left: "20%" }]}
                        />
                    </Animated.View>
                    <Animated.View style={nextButtonStyle}>
                        <IconButton
                            onPress={() => scrollByPage(1)}
                            iconStyle={styles.buttonIcon}
                            icon={require("@assets/images/icons/arrow-right-icon.png")}
                            style={[styles.buttonCon, { right: "20%" }]}
                        />
                    </Animated.View>
                </>
            )}
            <View style={styles.dotsContainer}>
                {[...Array(pageCount)].map((_, index) => (
                    <SwiperDot key={index} index={index} currentPage={currentPage} />
                ))}
            </View>
        </View>
    );
};

export default Swiper


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    buttonCon: {
        position: "absolute",
        bottom: 140
    },
    buttonIcon: {
        height: 9,
        width: 12
    },
    dotsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 70,
        left: 0,
        right: 0,
        justifyContent: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'gray',
        marginHorizontal: 5,
    },
});