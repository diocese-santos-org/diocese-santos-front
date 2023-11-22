import {
    View,
    Box,
    Heading,
    Text
} from "@gluestack-ui/themed";

import { ParoquiaType } from "@/api/types/ParoquiaTypes";

export default function ParoquiaCard({ paroquia, distancia }: ParoquiaType) {
    return (
        <Box bg="#D1D1D1" p="$4" m="$4" style={{ borderRadius: 20 }}>
            <Heading size='md'>{paroquia?.nome || 'Nome da Paróquia'}</Heading>
            <Text pt="$3" style={{ textAlign: 'right' }}>{
                distancia
                    ? distancia.toFixed(0) + ' metros'
                    : 'Distância da Paróquia'
            }</Text>
        </Box>
    );
}
