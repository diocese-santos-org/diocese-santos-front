import { useState, useEffect } from 'react';

import {
    View,
    Text
} from "@gluestack-ui/themed";

import MapView, { Marker, Region } from 'react-native-maps';
import {
    LocationObject,
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    watchPositionAsync,
    LocationAccuracy
} from 'expo-location';

export default function MapaScreen() {
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [region, setRegion] = useState<Region>({
        latitude: location?.coords.latitude || -23.9562553,
        longitude: location?.coords.longitude || -46.3170556,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    async function requestLocationPermissions() {
        try {
            const { status } = await requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            setLocation(await getCurrentPositionAsync({}));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        try {
            requestLocationPermissions();

            watchPositionAsync({
                accuracy: LocationAccuracy.High,
                timeInterval: 1000,
                distanceInterval: 1,
            }, (location) => {
                setLocation(location);
                setRegion({
                    ...region,
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                })
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <View>
            {
                errorMsg &&
                <Text>{errorMsg}</Text>
            }
            {
                location &&
                <MapView
                    style={{ height: '100%', width: '100%' }}
                    region={region}
                    onRegionChangeComplete={(region: Region) => setRegion(region)}
                >
                    <Marker coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }} />
                </MapView>
            }
        </View>
    );
}
