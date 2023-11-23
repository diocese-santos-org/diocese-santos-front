import {
    View,
    Box,
    Heading,
    Text
} from "@gluestack-ui/themed";

import { Link } from "expo-router";

import { ParoquiaType } from "@/api/types/ParoquiaTypes";

export default function ParoquiaCard({ paroquia, distancia }: ParoquiaType) {
    return (
        <Box bg="#D1D1D1" p="$4" m="$4" style={{ borderRadius: 20 }} key={paroquia.id}>
            <Link
                href={{
                    pathname: "/(tabs)/paroquia/[id]",
                    params: {
                        id: paroquia?.id || '1'
                    }
                }}
            >
                <Heading size='md'>
                    {paroquia?.nome || 'Nome da Paróquia'}
                </Heading>
                <Text pt="$3" style={{ textAlign: 'right' }}>{
                    distancia
                        ? distancia.toFixed(0) + ' metros'
                        : 'Distância da Paróquia'
                }</Text>
            </Link>
        </Box>
    );
}
