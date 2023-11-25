import { useState, useEffect, useRef } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import FontAwesome from '@expo/vector-icons/FontAwesome5';

import {
    View,
    Text,
    Divider,
    Center, Button, ButtonText
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
import { Pressable } from 'react-native';
import {Link} from "expo-router";

export default function MapaScreen() {
    const mapRef = useRef<MapView>(null);
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [region, setRegion] = useState<Region>({
        latitude: location?.coords.latitude || -23.9562553,
        longitude: location?.coords.longitude || -46.3170556,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [paroquias, setParoquias] = useState<ParoquiaType[]>([])
    const [selectedRoute, setSelectedRoute] = useState<Number | null>(null)

    function requestLocationPermissions() {
        requestForegroundPermissionsAsync()
            .catch(error =>
                setErrorMsg('Habilite a permissão de localização! \n\nEncontre os locais mais próximos de você!')
            );

        getCurrentPositionAsync({})
            .then(response => setLocation(response))
            .catch(error =>
                setErrorMsg('Habilite a permissão de localização! \n\nEncontre os locais mais próximos de você!')
            );
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
            .catch(error =>
                setErrorMsg('Habilite a permissão de localização! \n\nEncontre os locais mais próximos de você!')
            );
    }, []);

    useEffect(() => {
        (async () => {
            getParoquias()
                .then(response => setParoquias(response))
                .catch(error => console.log(error));
        })();
    }, [])

    const Paroquia = ({ paroquia }: { paroquia: ParoquiaType }) =>
        <View
            style={{
                width: 250,
                paddingVertical: 20,
                marginHorizontal: 10,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                backgroundColor: '#FFFFFF',
                borderRadius: 40,

            }}
        >
            <Pressable
                onPress={
                    () => {
                        setSelectedRoute(paroquia.paroquia.id);
                        mapRef.current?.animateToRegion({
                        latitude: paroquia.paroquia.endereco.latitude,
                        longitude: paroquia.paroquia.endereco.longitude,
                        latitudeDelta: 0.0043,
                        longitudeDelta: 0.0034
                    }, 1000)
                    }
                }
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10
                }}
            >
                <FontAwesome
                    name='church'
                    color={'#000'}
                    size={20}
                />
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#000',
                    paddingHorizontal: 20,
                    textTransform: 'capitalize',
                    textAlign: 'center'
                }}>
                    {paroquia.paroquia.nome}
                </Text>
            </Pressable>
            {
                selectedRoute === paroquia.paroquia.id &&
                <Link href={getMapsUrl(paroquia.paroquia.nome)} asChild>
                    <Button size="lg" variant="solid">
                        <ButtonText>Ver Rotas</ButtonText>
                    </Button>
                </Link>
            }
        </View>

    const getMapsUrl = (name: string) => `https://www.google.com/maps/dir/${location?.coords.latitude},${location?.coords.longitude}/${encodeURI(name)}

    return (
        <View>
            {
                errorMsg &&
                <Center h='$full'>
                    <FontAwesome name='globe' color={'#000'} size={100} />
                    <Text mt={20} fontSize={20} fontWeight='bold'>{errorMsg}</Text>
                </Center>
            }
            {
                location &&
                <MapView
                        ref={mapRef}
                        showsUserLocation={true}
                        onRegionChangeComplete={
                            (region: Region) => setRegion(region)
                        }
                        onMarkerPress={
                            (event) => console.log(event.nativeEvent)
                        }
                        style={{ height: '100%', width: '100%' }}
                        region={region}
                    >
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
            {
                location &&
                <View style={{ position: 'absolute', maxHeight: 200, width: '100%', bottom: 0, left: 0, paddingBottom: 40 }}>
                    <FlatList
                        horizontal
                        data={paroquias}
                        renderItem={({ item }) => <Paroquia paroquia={item} />}
                    />
                </View>
            }
        </View>
    );
}
