import {
    Box,
    Heading,
    Text,
    VStack
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
                <VStack>
                    <Text>
                        {
                            distancia
                                ? distancia.toFixed(0) + ' metros'
                                : 'Distância da Paróquia'
                        }
                    </Text>
                    <Heading size="sm">
                        {paroquia?.nome || 'Nome da Paróquia'}
                    </Heading>
                </VStack>

            </Link>
        </Box>
    );
}
