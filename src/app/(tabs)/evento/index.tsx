import { useState, useEffect } from "react";
import { FlatList } from 'react-native-gesture-handler';

import {
    Center,
    View,
    Text,
    Divider
} from "@gluestack-ui/themed";

import EventoCard from "@/components/Evento";

import { EventoType } from "@/api/types/EventoTypes";
import { getEventos } from "@/api/DioceseSantosAPI";
import {ActivityIndicator} from "react-native";

export default function EventosScreen() {
    const [eventos, setEventos] = useState<EventoType[]>([]);
    const [error, setError] = useState<any>();

    useEffect(() => {
        const load = async () => {
            getEventos()
                .then(response => setEventos(response))
                .catch(error => setError(error));
        }
        load();
    }, []);

    return (
        <View>
            <Center justifyContent="center">
                {
                    error &&
                    <Text>{error.message}</Text>
                }
                {
                    eventos.length == 0 &&
                    <Center h={"$full"}>
                        <ActivityIndicator size={"large"}/>
                    </Center>
                }
                {
                    eventos &&
                    <FlatList
                        data={eventos}
                        ItemSeparatorComponent={() => <Divider />}
                        renderItem={({ item }) =>
                            <EventoCard
                                key={item.titulo}
                                evento={item}
                            />
                        }
                        keyExtractor={
                            (item: EventoType) => item.titulo
                        }
                    />
                }
            </Center>
        </View>
    );
}
