import {
    Box,
    View,
    Heading,
    Text,
    Divider
} from "@gluestack-ui/themed";

import { EventoType } from "@/api/types/EventoTypes";

export default function EventoCard({ evento }: EventoType) {
    const toDate = (date: string) => date?.split('T')[0].split('-').reverse().join('/') || 'Sem Data';

    return (
        <Box bg="#D1D1D1" m="$4" style={{ borderRadius: 20 }}>
            <View m="$4">
                <Heading>{evento?.titulo || 'Nome do  Evento'}</Heading>
                <Text>
                    {toDate(evento?.data)}
                    {' ás '}
                    {evento?.horario}
                </Text>

                <Divider my="$4" />

                <Text>{evento?.descricao}</Text>

                <Divider my="$4" />

                <Text style={{
                    textAlign: 'center'
                }}>{evento?.local}</Text>
            </View>

        </Box>
    );
}
