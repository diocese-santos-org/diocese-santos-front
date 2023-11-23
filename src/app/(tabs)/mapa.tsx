import { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome5';

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

import { getParoquias } from '@/api/DioceseSantosAPI';
import { ParoquiaType } from '@/api/types/ParoquiaTypes';

export default function MapaScreen() {
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [region, setRegion] = useState<Region>({
        latitude: location?.coords.latitude || -23.9562553,
        longitude: location?.coords.longitude || -46.3170556,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [paroquias, setParoquias] = useState<ParoquiaType[]>([])

    function requestLocationPermissions() {
        requestForegroundPermissionsAsync()
            // .then(response => console.log(
            //     'requestForegroundPermissionsAsync: ' +
            //     JSON.stringify(response)
            // ))
            .catch(error => console.log(
                'requestForegroundPermissionsAsync[error]: ' +
                error
            ));

        getCurrentPositionAsync({})
            .then(response => setLocation(response))
            .catch(error => console.log(
                'getCurrentPositionAsync[error]: ' +
                error
            ));
    }

    useEffect(() => {
        requestLocationPermissions();

        watchPositionAsync({
            accuracy: LocationAccuracy.High,
            timeInterval: 1000,
            distanceInterval: 1,
        }, (location) => {
            setLocation(location);
        })
            .catch(error => console.log(
                'watchPositionAsync[error]: ' +
                error
            ));
    }, []);

    useEffect(() => {
        (async () => {
            getParoquias()
                .then(response => setParoquias(response))
                .catch(error => console.log(error));
        })();
    }, [])


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
                        }} title='Você'>
                        </Marker>

                        {
                            paroquias &&
                            paroquias.map(
                                (paroquia) =>
                                    <Marker key={paroquia.paroquia.id} title={paroquia.paroquia.nome} coordinate={{
                                        latitude: paroquia.paroquia.endereco.latitude,
                                        longitude: paroquia.paroquia.endereco.longitude,
                                    }}>
                                        <FontAwesome name='church' color={'#000'} size={25} />
                                    </Marker>
                            )
                        }
                </MapView>
            }
        </View>
    );
}
