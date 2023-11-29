import { Tabs } from 'expo-router/tabs';

import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from "@gluestack-ui/config";

import FontAwesome from '@expo/vector-icons/FontAwesome5';

export default function TabsLayout() {

    return <GluestackUIProvider config={config}>
        <Tabs>
            <Tabs.Screen
                name="mapa"
                options={{
                    title: 'Mapa',
                    tabBarIcon: ({ color, size }) =>
                        <FontAwesome name='map' color={'#000'} size={size} />,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="paroquia/index"
                options={{
                    title: 'Paróquias',
                    tabBarIcon: ({ color, size }) =>
                        <FontAwesome name='church' color={'#000'} size={size} />,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="evento/index"
                options={{
                    title: 'Eventos',
                    tabBarIcon: ({ color, size }) =>
                        <FontAwesome name='calendar' color={'#000'} size={size} />,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="aviso/index"
                options={{
                    title: 'Avisos',
                    tabBarIcon: ({ color, size }) =>
                        <FontAwesome name='book-open' color={'#000'} size={size} />,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="paroquia/[id]"
                options={{
                    href: null,
                    headerShown: false,
                    unmountOnBlur: true
                }}
            />
        </Tabs>
    </GluestackUIProvider>;
}
