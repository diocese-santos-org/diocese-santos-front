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

export default function EventosScreen() {
    const [eventos, setEventos] = useState<EventoType[]>([]);

    useEffect(() => {
        const load = async () => {
            setEventos(await getEventos());
        }
        load();
    }, []);

    return (
        <View>
            <Center justifyContent="center">
                {
                    eventos &&
                    <FlatList
                        data={eventos}
                        ItemSeparatorComponent={
                            () => <Divider />
                        }
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
