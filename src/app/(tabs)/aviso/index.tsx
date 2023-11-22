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

export default function AvisosScreen() {
    const [avisos, setAvisos] = useState<AvisoType[]>([]);

    useEffect(() => {
        const load = async () => {
            setAvisos(await getAvisos());
        }
        load();
    }, []);

    return (
        <View>
            <Center justifyContent="center">
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
