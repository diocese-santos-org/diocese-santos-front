import {
    Box,
    View,
    Heading,
    Text
} from "@gluestack-ui/themed";

import { EventoType } from "@/api/types/EventoTypes";

export default function EventoCard({ evento }: EventoType) {
    const toDate = (date: string) => date?.split('-').reverse().join('/') || 'Sem Data';

    return (
        <Box bg="#D1D1D1" p="$1" m="$4" style={{ borderRadius: 20 }}>
            <View p="$4" m="$4">
                <Heading>{evento?.titulo || 'Nome do  Evento'}</Heading>
                <Text pt="$3">{evento?.descricao}</Text>
                <Text pt="$6" style={{
                    textAlign: 'center'
                }}>{evento?.local}</Text>
                <Text style={{
                    position: "absolute",
                    textAlign: "center",
                    top: 0,
                    right: 0
                }}>
                    {toDate(evento?.data)}
                    {' ás '}
                    {evento?.horario}
                </Text>
            </View>
        </Box>
    );
}
