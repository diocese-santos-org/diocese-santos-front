import { useState, useEffect } from "react";

import {
    View,
    Center,
    Text,
    Heading
} from "@gluestack-ui/themed";

import { useLocalSearchParams } from 'expo-router';

import { getParoquia } from '@/api/dioceseSantosApi';
import { ParoquiaType } from '@/api/types/ParoquiaTypes';

export default function ParoquiasScreen() {
    const { id } = useLocalSearchParams();

    const [paroquia, setParoquia] = useState<ParoquiaType | null>(null);

    useEffect(() => {
        const load = async () => {
            setParoquia((await getParoquia(id)));
        }
        load();
        console.log(paroquia);
    }, [])

    const isNull = (value: any) => value === 'NULL' ? null : value;

    return (
        <View>
            <Center justifyContent="center">
                <Heading size='md'>{paroquia?.paroquia.nome || 'Nome da Paróquia'}</Heading>
                <Text pt="$4">{paroquia?.paroquia.endereco.enderecoCompleto}</Text>
                <Text pt="$4">{paroquia?.paroquia.telefone}</Text>
                <Text pt="$4">{paroquia?.paroquia.missas.sabado}</Text>
                <Text pt="$4">{paroquia?.paroquia.email}</Text>
                <Text pt="$4">{paroquia?.paroquia.secretaria}</Text>
                <Text pt="$4">{isNull(paroquia?.paroquia?.urlSite)}</Text>
                <Text pt="$4">{paroquia?.paroquia.redesSociais.facebook}</Text>
                <Text pt="$4">{paroquia?.paroquia.redesSociais.instagram}</Text>
                <Text pt="$4">{paroquia?.paroquia.redesSociais.youtube}</Text>
                {
                    paroquia?.paroquia?.cleros &&
                    paroquia?.paroquia?.cleros?.map(
                        clero => <Text pt="$4">{clero?.nome}</Text>
                    )
                }
                <Text pt="$4">{paroquia?.distancia
                    ? paroquia?.distancia.toFixed(0) + ' metros'
                    : 'Distância da Paróquia'}</Text>
            </Center>
        </View>
    );
}
