import { useState, useEffect } from "react";
import { Text } from "react-native";
import { FlatList } from 'react-native-gesture-handler';

import {
    Center,
    View,
    Divider
} from "@gluestack-ui/themed";

import ParoquiaCard from "@/components/Paroquia";

import { ParoquiaType } from "@/api/types/ParoquiaTypes";
import { getParoquias } from "@/api/DioceseSantosAPI";

export default function ParoquiasScreen() {
    const [paroquias, setParoquias] = useState<ParoquiaType[]>([]);
    const [error, setError] = useState<any>();

    useEffect(() => {
        const load = async () => {
            getParoquias()
                .then(response => setParoquias(response))
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
                    paroquias &&
                    <FlatList
                        data={paroquias}
                        ItemSeparatorComponent={
                            () => <Divider />
                        }
                        renderItem={({ item }) =>
                            <ParoquiaCard
                                key={item.paroquia.id}
                                paroquia={item.paroquia}
                                distancia={item.distancia}
                            />
                        }
                        keyExtractor={
                            (item: ParoquiaType) => item.paroquia.nome
                        }
                    />
                }

            </Center>
        </View>
    );
}
