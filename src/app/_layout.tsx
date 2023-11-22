import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';

import { SplashScreen, Stack } from 'expo-router';
import { Tabs } from 'expo-router/tabs';

import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from "@gluestack-ui/config";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <GluestackUIProvider config={config}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />

                <Tabs.Screen name="(tabs)" options={{ title: 'Diocese de Santos' }} />
            </Stack>
        </GluestackUIProvider>
    );
}