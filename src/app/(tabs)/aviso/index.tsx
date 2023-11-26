import { useState, useEffect } from "react";
import { FlatList } from 'react-native-gesture-handler';

import {
    Center,
    VStack,
    View,
    Text,
    Divider
} from "@gluestack-ui/themed";

import AvisoCard from "@/components/Aviso";

import { AvisoType } from "@/api/types/AvisoTypes";
import { getAvisos } from "@/api/DioceseSantosAPI";
import {ActivityIndicator} from "react-native";

export default function AvisosScreen() {
    const [avisos, setAvisos] = useState<AvisoType[]>([]);
    const [error, setError] = useState<any>();

    useEffect(() => {
        const load = async () => {
            getAvisos()
                .then(response => setAvisos(response))
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
                    avisos.length == 0 &&
                    <Center h={"$full"}>
                        <ActivityIndicator size={"large"}/>
                    </Center>
                }
                {
                    avisos &&
                    <FlatList
                        data={avisos}
                        ItemSeparatorComponent={
                            () => <Divider />
                        }
                        renderItem={({ item }) =>
                            <AvisoCard
                                key={item.titulo}
                                aviso={item}
                            />
                        }
                        keyExtractor={
                            (item: AvisoType) => item.titulo
                        }
                    />
                }
            </Center>
        </View>
    );
}
