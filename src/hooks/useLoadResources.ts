
import { useEffect, useState } from 'react';
import { loadAsync as loadFontAsync } from 'expo-font';

const useLoadResources = () => {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    const fonts = {
        "Marcellus": require("../../assets/fonts/Marcellus-Regular.ttf"),
        "Manrope": require("../../assets/fonts/Manrope-VariableFont_wght.ttf"),
        "Urbanist": require("../../assets/fonts/Urbanist-VariableFont_wght.ttf"),
    };

    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                await loadFontAsync(fonts);
            } catch (e) {
                console.warn(e);
            } finally {
                setLoadingComplete(true);
            }
        }
        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
};

export default useLoadResources;