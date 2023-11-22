import { useState, useEffect } from "react";
import { FlatList } from 'react-native-gesture-handler';

import {
    Center,
    View,
    Text,
    Divider
} from "@gluestack-ui/themed";

import ParoquiaCard from "@/components/Paroquia";

import { ParoquiaType } from "@/api/types/ParoquiaTypes";
import { getParoquias } from "@/api/DioceseSantosAPI";

export default function ParoquiasScreen() {
    const [paroquias, setParoquias] = useState<ParoquiaType[]>([]);

    useEffect(() => {
        const load = async () => {
            setParoquias(await getParoquias());
        }
        load();
    }, []);

    return (
        <View>
            <Center justifyContent="center">
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
