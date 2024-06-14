import { TextStyle } from "react-native"

export const textStyles: { [key: string]: TextStyle } = {
    title1Mobile: {
        fontSize: 32,
        fontFamily: "Marcellus",
        fontWeight: "400",
        letterSpacing: -0.2,
        lineHeight: 38.4, // 32 * 1.2
    },
    title1Web: {
        fontSize: 48,
        fontFamily: "Marcellus",
        fontWeight: "400",
        letterSpacing: -0.2,
        lineHeight: 57.6, // 48 * 1.2
    },
    title2Mobile: {
        fontSize: 24,
        fontFamily: "Marcellus",
        fontWeight: "400",
        letterSpacing: -0.2,
        lineHeight: 28.8, // 24 * 1.2
    },
    title2Web: {
        fontSize: 28,
        fontFamily: "Marcellus",
        fontWeight: "400",
        letterSpacing: -0.2,
        lineHeight: 33.6, // 28 * 1.2
    },
    subTitle1Mobile: {
        fontSize: 20,
        fontFamily: "Manrope",
        fontWeight: "500",
        letterSpacing: 0,
        lineHeight: 32, // 20 * 1.6
    },
    subTitle1Web: {
        fontSize: 24,
        fontFamily: "Manrope",
        fontWeight: "500",
        letterSpacing: 0,
        lineHeight: 38.4, // 24 * 1.6
    },
    subTitle2Mobile: {
        fontSize: 18,
        fontFamily: "Manrope",
        fontWeight: "400",
        letterSpacing: 0,
        lineHeight: 21.6, // 18 * 1.2
    },
    subTitle2Web: {
        fontSize: 20,
        fontFamily: "Manrope",
        fontWeight: "400",
        letterSpacing: 0,
        lineHeight: 24, // 20 * 1.2
    },
    body1Mobile: {
        fontSize: 16,
        fontFamily: "Manrope",
        fontWeight: "300",
        letterSpacing: 0.4,
        lineHeight: 24, // 16 * 1.5
    },
    body1Web: {
        fontSize: 18,
        fontFamily: "Manrope",
        fontWeight: "300",
        letterSpacing: 0.4,
        lineHeight: 27, // 18 * 1.5
    },
    body2Mobile: {
        fontSize: 14,
        fontFamily: "Manrope",
        fontWeight: "300",
        letterSpacing: 0.2,
        lineHeight: 21, // 14 * 1.5
    },
    body2Web: {
        fontSize: 16,
        fontFamily: "Manrope",
        fontWeight: "300",
        letterSpacing: 0.2,
        lineHeight: 24, // 16 * 1.5
    },
    ctaMobile: {
        fontSize: 16,
        fontFamily: "Manrope",
        fontWeight: "500",
        letterSpacing: 0,
        lineHeight: 25.6, // 16 * 1.6
    },
    ctaWeb: {
        fontSize: 18,
        fontFamily: "Manrope",
        fontWeight: "500",
        letterSpacing: 0,
        lineHeight: 28.8, // 18 * 1.6
    },
    labelMobile: {
        fontSize: 12,
        // fontFamily: "SF UI Display",
        fontFamily: "Manrope",
        fontWeight: "300",
        letterSpacing: 0.2,
        lineHeight: 19.2, // 12 * 1.6
    },
    labelWeb: {
        fontSize: 14,
        // fontFamily: "SF UI Display",
        fontFamily: "Manrope",
        fontWeight: "300",
        letterSpacing: 0.2,
        lineHeight: 22.4, // 14 * 1.6
    },
    tagMobile: {
        fontSize: 10,
        fontFamily: "Manrope",
        fontWeight: "500",
        letterSpacing: 0.2,
        lineHeight: 16, // 10 * 1.6
    },
    tagWeb: {
        fontSize: 12,
        fontFamily: "Manrope",
        fontWeight: "500",
        letterSpacing: 0.2,
        lineHeight: 19.2, // 12 * 1.6
    }
};

export const colors = {
    "manifest---old": "support only solid color",
    "brown-gradient":["#A4634D","#AC7E6E"],
    "manifest-gradient-2":["#CFA3FA", "#F9D09C", "#FFBB83"],
    "manifest-gradient": ["#9E79C3", "#EFC999", "#FFBB83"],
    "white": "#ffffff",
    "primary": "#837492",
    "secondary": "#625771",
    "link": "#805da2",
    "title": "#212121",
    "body": "#424242",
    "inactive": "#9e9e9e",
    "cta-gradient": "support only solid color",
    "error": "#f75555"
}

export const theme = {
    colors,
    textStyles,
    shadow: {
        shadowColor: "#673B12",
        shadowOffset: { width: 4, height: 16 },
        shadowOpacity: 0.1,
        shadowRadius: 32
    }
}
