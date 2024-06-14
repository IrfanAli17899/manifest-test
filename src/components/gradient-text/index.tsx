import React from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import Text, { TextProps } from "../text";
import { theme } from "@src/theme";

const GradientText = (props: TextProps) => {
    return (
        <MaskedView maskElement={<Text {...props} />}>
            <LinearGradient
                colors={theme.colors["manifest-gradient-2"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text {...props} style={[props.style, { opacity: 0 }]} />
            </LinearGradient>
        </MaskedView>
    );
};

export default GradientText;