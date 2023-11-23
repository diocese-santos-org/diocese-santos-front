import { useState, useEffect } from "react";

import {
    View,
    Center,
    Text,
    Heading
} from "@gluestack-ui/themed";

import { useLocalSearchParams } from 'expo-router';

import { getParoquia } from '@/api/DioceseSantosAPI';
import { Paroquia } from '@/api/types/ParoquiaTypes';

export default function ParoquiasScreen() {
    const { id } = useLocalSearchParams();

    const [paroquia, setParoquia] = useState<Paroquia | null>(null);

    useEffect(() => {
        const load = async () => {
            getParoquia(id)
                .then(response => setParoquia(response))
                .catch(error => console.log(
                    `getParoquia(${id})[error]: ` +
                    error
                ));
        }
        load();
        console.log(paroquia);
    }, [])

    const isNull = (value: any) => value === 'NULL' ? null : value;

    return (
        <View>
            <Center justifyContent="center">
                <Heading size='md'>{paroquia?.nome}</Heading>

                <Text pt="$4">{paroquia?.endereco.enderecoCompleto}</Text>
                <Text pt="$4">{isNull(paroquia?.urlSite)}</Text>
                <Text pt="$4">{paroquia?.telefone}</Text>

                {
                    paroquia?.cleros &&
                    paroquia?.cleros?.map(
                        clero => <Text pt="$4">{clero?.nome}</Text>
                    )
                }

                <Text pt="$4">{paroquia?.missas.segunda}</Text>
                <Text pt="$4">{paroquia?.missas.terca}</Text>
                <Text pt="$4">{paroquia?.missas.quarta}</Text>
                <Text pt="$4">{paroquia?.missas.quinta}</Text>
                <Text pt="$4">{paroquia?.missas.sexta}</Text>
                <Text pt="$4">{paroquia?.missas.sabado}</Text>
                <Text pt="$4">{paroquia?.missas.domingo}</Text>

                <Text pt="$4">{paroquia?.email}</Text>
                <Text pt="$4">{paroquia?.secretaria}</Text>

                <Text pt="$4">{isNull(paroquia?.redesSociais.facebook)}</Text>
                <Text pt="$4">{isNull(paroquia?.redesSociais.instagram)}</Text>
                <Text pt="$4">{isNull(paroquia?.redesSociais.youtube)}</Text>

                {/* <Text pt="$4">{distancia
                    ? distancia.toFixed(0) + ' metros'
                    : 'Distância da Paróquia'}</Text> */}
            </Center>
        </View>
    );
}
